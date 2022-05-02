import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/shared/services/reservation.service';


@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent implements OnInit {

  userName: string = '';

 
  constructor(private actRoute: ActivatedRoute, private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe((param:any) => {
      this.userName = param.userName as string;
    });
  }



  
    
  

}
