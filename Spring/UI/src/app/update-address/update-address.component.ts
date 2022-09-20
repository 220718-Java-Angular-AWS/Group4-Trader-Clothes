import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  user: any;
  editMode: boolean=false;
  constructor(public _userService: UsersService) { }

  addressInput: FormControl = new FormControl(null); 

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

  updateAddress(){
    let data = {
      ...this.user,
      address: this.addressInput.value
    }
    this._userService.UpdateUser(data)
    .subscribe(data => 
      {
        this.editMode=false;
        this.getCurrentUser();
      })
  }

}
