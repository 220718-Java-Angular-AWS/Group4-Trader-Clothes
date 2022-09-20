import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit {

  user: any;
  editMode: boolean=false;
  constructor(public _userService: UsersService) { }

  cardNumberInput: FormControl = new FormControl(null); 

  ngOnInit(): void {
    this.getCurrentUser();
  }
  

  getCurrentUser(): void{
    this._userService.GetUserbyId()
    .subscribe(data => 
      {
        console.warn(data)
        this.user = data;
      })
  }

  updateCardNumber(){
    let data = {
      ...this.user,
      cardNumber: this.cardNumberInput.value
    }
    this._userService.UpdateUser(data)
    .subscribe(data => 
      {
        this.editMode=false;
        this.getCurrentUser();
      })
  }

}
