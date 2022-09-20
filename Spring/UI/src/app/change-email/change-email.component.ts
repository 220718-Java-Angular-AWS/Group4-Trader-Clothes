import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  user: any;
  editMode: boolean=false;
  constructor(public _userService: UsersService) { }

  emailInput: FormControl = new FormControl(null); 

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

  updateEmail(){
    let data = {
      ...this.user,
      email: this.emailInput.value
    }
    this._userService.UpdateUser(data)
    .subscribe(data => 
      {
        this.editMode=false;
        this.getCurrentUser();
      })
  }


}
