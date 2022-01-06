import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-left-drawer-sidenav',
  templateUrl: './left-drawer-sidenav.component.html',
  styleUrls: ['./left-drawer-sidenav.component.css']
})
export class LeftDrawerSidenavComponent implements OnInit {
  @Output() drawerChange: EventEmitter<any> = new EventEmitter();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @ViewChild('drawer') public drawer!: TemplateRef<any>;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.drawerChange.emit(this.drawer)
  }


  logout() {
    console.log("LOGOUT")
    this.authService.logout();
  }
}
