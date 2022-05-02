import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Reservation } from 'src/app/shared/models/Reservation';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  
  user?: User;
  minDate = new Date(Date.now());
  maxDate = new Date(Date.now() + 12096e5);
  disableMinute = true;
  ora = new Date().getHours();
  defaultTime = [this.ora, 0, 0];




  resForm = this.createForm({
    id: '',
    userName: '',
    date: 0
  
  });

  constructor(private fb: FormBuilder, private router: Router,private reservationService: ReservationService, private userService: UserService) { }


  


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.resForm.get('userName')?.setValue(this.user?.username);
    }, error => {
      console.error(error);
    });
  }

  createForm(model: Reservation) {
    let formGroup = this.fb.group(model);
    formGroup.get('date')?.addValidators([Validators.required]);
    return formGroup;
  }

  addRes() {
    if (this.resForm.valid) {
      if (this.resForm.get('date')) {


        this.reservationService.create(this.resForm.value).then(_ => {
          this.router.navigateByUrl('/reservation/successful/' + this.resForm.get('userName')?.value);
         
        }).catch(error => {
          console.error(error);
        });
      }

    }
  }
}
