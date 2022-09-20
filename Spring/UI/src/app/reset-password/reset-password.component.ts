import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Users } from '../user';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  _userService: UsersService;
  user: Users = {
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    address: "",
    cardNumber: 0
  };

  router: ActivatedRoute;
  buttonRouter: Router;

  oldPass: string = "";
  newPass: string = "";
  confirmNewPass: string = "";

  constructor(http: HttpClient, userService: UsersService, router: ActivatedRoute, buttonRouter: Router) {
    this._userService = userService;
    this.router = router;
    this.buttonRouter = buttonRouter;
  }

  ngOnInit(): void {
    let id = parseInt(this.router.snapshot.paramMap.get('id')!, 10);

    this.getCurrentUser(id);
  }

  getCurrentUser(id: number): void {
    this._userService.GetUserbyId()
      .subscribe(data => {
        this.user = data;
      })
  }

  changePassword() {
    //TODO update method based off of session storage id
    //nested if statement
    if (this.oldPass == this.user.password) {
      if (this.newPass == this.confirmNewPass) {
        let newUser: Users = {
          userId: this.user.userId,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          password: this.newPass,
          username: this.user.username,
          address: this.user.address,
          cardNumber: this.user.cardNumber
        }
        //put new user information
        this._userService.UpdateUser(newUser).subscribe((data: any) => {
          alert("Password successfully changed!")
        })
      } else {
        alert("Password not chagned because new passwords did not match.")
      }
    } else {
      alert("Password was not changed because old password did not match")
    }
  }

}
