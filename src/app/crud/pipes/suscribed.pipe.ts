import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'suscribed'
})

export class SuscribedPipe implements PipeTransform {

  transform(value: boolean): string {
    return (value) ? '✔' : ''
  }

}
