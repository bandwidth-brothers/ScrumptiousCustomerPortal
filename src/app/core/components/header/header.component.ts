import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/entities/order';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() order!: Order | undefined;
  @Input() drawer!: any;
  @Input() drawer2!: any;

  constructor() { }

  ngOnInit(): void {
  }



}
