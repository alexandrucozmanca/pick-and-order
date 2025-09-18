# @alexandru.cozmanca/pick-and-order

A **generic Angular component** that lets users pick items from a source list and order them in a target list.  
Built with Angular CDK Drag & Drop. Supports **custom filtering** of the source list via a user-supplied function.

---

## Features

- **Pick & order** items between source and target lists  
- **Drag & drop** reordering with Angular CDK  
- **Custom filtering** – pass in your own filtering function to control what shows up in the source list  
- **i18n ready** – integrates with `@ngx-translate/core`  
- ⚡ Works with Angular 14+ (tested on Angular 19)

---

## Installation

```bash
npm install @alexandru.cozmanca/pick-and-order
```

You’ll also need the **peer dependencies**:

```bash
npm install @angular/cdk @ngx-translate/core @ngx-translate/http-loader
```

---

## Usage

### Import the component

For **standalone components**:

```ts
import { PickAndOrderComponent } from '@alexandru.cozmanca/pick-and-order';

@Component({
  standalone: true,
  selector: 'app-my-feature',
  imports: [PickAndOrderComponent],
  template: `
    <ac-pick-and-order
      [sourceItems]="allItems"
      [targetItems]="selectedItems"
      [filterFn]="myFilterFn"
      (targetItemsChange)="onSelectionChange($event)">
    </ac-pick-and-order>
  `,
})
export class MyFeatureComponent {
  allItems = ['Apple', 'Banana', 'Orange', 'Grape'];
  selectedItems = ['Banana'];

  // Example filter: show only items starting with A
  myFilterFn = (item: string) => item.startsWith('A');

  onSelectionChange(updated: string[]) {
    console.log('Updated target items:', updated);
  }
}
```

---

## API

### Inputs

| Input            | Type                    | Description                                                                 |
|------------------|-------------------------|-----------------------------------------------------------------------------|
| `sourceItems`    | `T[]`                   | The full list of available items                                            |
| `targetItems`    | `T[]`                   | Items currently picked (ordered list)                                       |
| `filterFn`       | `(item: T) => boolean`  | Optional. Custom filter function applied to the source list                 |

### Outputs

| Output              | Type   | Description                                    |
|---------------------|--------|------------------------------------------------|
| `targetItemsChange` | `T[]`  | Emits the updated list whenever target changes |

---

## Internationalization

This library uses [`@ngx-translate/core`](https://github.com/ngx-translate/core).  
Provide your translations normally and the component will use them for UI labels.

---

## 🛠 Development

Clone the repo, then build the library:

```bash
npm install
ng build pick-and-order
```

Test locally in another Angular app:

```bash
cd dist/pick-and-order
npm pack
# install the generated .tgz in your consuming app
```

---

## License

MIT © [Alexandru Cozmanca](https://github.com/alexandrucozmanca)
