import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(images: any): string {
    if (!images) {
      return ``;
    } else {
      return images[0]?.url
    }
  }
}
