import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }
  user: any;
  id: any;

  ngOnInit(): void {
    this.route.params.subscribe(event => {
      this.id = event.id;
    });
    this.loadUser(this.id);
  }

  loadAllUsers() {
    this.httpService.getAll(`${environment.BASE_PAI_URL}${environment.USERS_GET_ALL_URL}`).subscribe((res) => {
      this.user = res;
    });
  }

  loadUser(id: any) {
    this.httpService.getById(`${environment.BASE_PAI_URL}${environment.USERS_GET_URL}` + id).subscribe((res) => {
      this.user = res;
      console.log(id);
    });
  }
}
