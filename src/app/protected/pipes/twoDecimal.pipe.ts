

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalRound'
})
export class TwoDecimalPipe implements PipeTransform {
  transform(value: number): number {
    return parseFloat(value.toFixed(2));
  }
}
