import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0
  iconList!: string[]

  constructor() { }

  ngOnInit(): void {
    if (this.rating >= 0 && this.rating < .4) {
      this.iconList = [
        "star_border",
        "star_border",
        "star_border",
        "star_border",
        "star_border"
      ]
    } else if (this.rating >= .4 && this.rating < .9) {
      this.iconList = [
        "star_half",
        "star_border",
        "star_border",
        "star_border",
        "star_border"
      ]
    } else if (this.rating >= .9 && this.rating < 1.4) {
      this.iconList = [
        "star",
        "star_border",
        "star_border",
        "star_border",
        "star_border"
      ]
    } else if (this.rating >= 1.4 && this.rating < 1.9) {
      this.iconList = [
        "star",
        "star_half",
        "star_border",
        "star_border",
        "star_border"
      ]
    } else if (this.rating >= 1.9 && this.rating < 2.4) {
      this.iconList = [
        "star",
        "star",
        "star_border",
        "star_border",
        "star_border"
      ]
    } else if (this.rating >= 2.4 && this.rating < 2.9) {
      this.iconList = [
        "star",
        "star",
        "star_half",
        "star_border",
        "star_border"
      ]
    } else if (this.rating >= 2.9 && this.rating < 3.4) {
      this.iconList = [
        "star",
        "star",
        "star",
        "star_border",
        "star_border"
      ]
    } else if (this.rating >= 3.4 && this.rating < 3.9) {
      this.iconList = [
        "star",
        "star",
        "star",
        "star_half",
        "star_border"
      ]
    }
    else if (this.rating >= 3.9 && this.rating < 4.4) {
      this.iconList = [
        "star",
        "star",
        "star",
        "star",
        "star_border"
      ]
    }
    else if (this.rating >= 4.4 && this.rating < 4.9) {
      this.iconList = [
        "star",
        "star",
        "star",
        "star",
        "star_half"
      ]
    }
    else if (this.rating >= 4.9 && this.rating <= 5) {
      this.iconList = [
        "star",
        "star",
        "star",
        "star",
        "star"
      ]
    }

  }

}
