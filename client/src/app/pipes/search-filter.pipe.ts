import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilter implements PipeTransform {
  transform(items: any[], keyword: string, properties: string[]): any[] {
    if (!items) return [];
    if (!keyword) return items;
    return items.filter((item) => {
      let itemFound: Boolean;
      for (let i = 0; i < properties.length; i++) {
        if (
          //   item[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !==
          //   -1
          item[properties[i]].toLowerCase().match(keyword.toLowerCase())
        ) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }
}
