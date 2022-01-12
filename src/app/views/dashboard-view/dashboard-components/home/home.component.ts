import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerDashBoardTto } from 'src/app/core/entities/CustomerDashBoardDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Card View Demo';

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  dashBoardDto: CustomerDashBoardTto | undefined;

  constructor(private customerService: CustomerService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if(!this.customerService.dashBoardDto){
      this.customerService.getCustomerDashBoardDto(this.authService.userId!).subscribe((result: CustomerDashBoardTto)=>{
        console.log("-----dash dto-------");
        
        console.log(result.restaurant);

        console.log("---end--dash dto-------");
        this.dashBoardDto = result;
        this.customerService.dashBoardDto = result;
    });
    }else{
      this.dashBoardDto = this.customerService.dashBoardDto;
    }

  }

}
