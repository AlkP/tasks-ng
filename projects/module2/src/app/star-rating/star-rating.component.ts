import { Component, Input } from '@angular/core';

export enum StarsIcon {
  FILLED = 'star',
  HALF = 'star_half',
  BORDERED = 'star_border',
}

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.sass'],
})
export class StarRatingComponent {
  @Input()
  public set feedbackRate(rate: number) {
    const integerPart = Math.floor(rate);
    const doublePart = rate % 1;
    for (let i = 0; i < this.starsCount; i++) {
      if (i > integerPart) {
        this.stars.push({icon: StarsIcon.BORDERED, active: false});
        continue;
      }
      if (i < integerPart) {
        this.stars.push({icon: StarsIcon.FILLED, active: true});
        continue;
      }
      if (0 < doublePart && doublePart < 0.25) {
        this.stars.push({icon: StarsIcon.BORDERED, active: false});
        continue;
      }
      if (doublePart > 0.25 && doublePart < 0.75) {
        this.stars.push({icon: StarsIcon.HALF, active: true});
        continue;
      }
      if (doublePart >= 0.75) {
        this.stars.push({icon: StarsIcon.FILLED, active: true});
      }
    }
  };

  public stars = [];
  public starsCount = 5;
}
