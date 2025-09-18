import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import SharedModule from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

type NameField<T> = T extends string ? never : Extract<keyof T, string>;

@Component({
  selector: 'pick-and-order',
  standalone: true,
  imports: [CommonModule, DragDropModule, SharedModule, FormsModule],
  templateUrl: './pick-and-order.component.html',
  styleUrls: ['./pick-and-order.component.scss'],
})
export class PickAndOrderComponent<T = unknown> {
  /** Left column source list */
  @Input() itemNameField?: string;
  @Input() uniqueArray = true;
  @Input() filtered = true;

  /** Right column selected (ordered) list; duplicates allowed */
  @Input() selected: T[] | undefined | null = [];

  /** additional filtering options */
  @Input() filteringFn?: (items: T[], selectedItems: T[] | null | undefined) => T[];

  /** Emits whenever selected list changes (add/remove/reorder) */
  @Output() selectionChange = new EventEmitter<any[] | null>();

  /** Filter text for available list */
  filterTerm = '';

  private _items: T[] | undefined | null = [];

  get filteredItems(): T[] {
    let src = this._items!;
    const selectedItems: T[] | null | undefined = this.selected;

    // Apply external filter first
    if (this.filteringFn) {
      src = this.filteringFn(src, selectedItems);
    }

    // Apply text search if enabled
    if (this.filtered) {
      const q = this._norm(this.filterTerm);
      if (q) {
        src = src.filter(it => this._norm(this.getItemName(it)).includes(q));
      }
    }

    return src;
  }

  @Input()
  set items(value: T[] | undefined | null) {
    if (!value) {
      this._items = [];
      return;
    }

    this._items = [...value].sort((a, b) => this.getItemName(a).localeCompare(this.getItemName(b), undefined, { sensitivity: 'base' }));
  }
  get items(): T[] | undefined | null {
    return this._items;
  }

  addItem(item: T): void {
    this.selected ??= [];
    if (!this.uniqueArray) {
      this.selected = [...this.selected, item];
    } else {
      if (!this.selected.includes(item)) {
        this.selected.push(item);
      }
    }

    this.emitChange();
  }

  removeAt(index: number): void {
    // create a new array instance to keep change detection snappy
    const next = this.selected!.slice();
    next.splice(index, 1);
    this.selected = next;
    this.emitChange();
  }

  drop(event: CdkDragDrop<T[]>): void {
    const next = this.selected!.slice();
    moveItemInArray(next, event.previousIndex, event.currentIndex);
    this.selected = next;
    this.emitChange();
  }

  trackByIndex = (_: number, __: unknown): number => _;

  getItemName(item: T): string {
    if (item == null) return '';

    if (typeof item === 'string') {
      return item;
    }

    const key = this.itemNameField as NameField<T> | undefined;
    if (!key) return '';

    const value = (item as Record<string, unknown>)[key];
    return typeof value === 'string' ? value : '';
  }

  private emitChange(): void {
    // emit a cloned array so parents receive an immutable snapshot
    this.selectionChange.emit(this.selected);
  }

  private _norm(v: string): string {
    return (v || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
