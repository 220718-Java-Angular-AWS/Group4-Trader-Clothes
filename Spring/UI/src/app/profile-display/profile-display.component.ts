import { Component, OnInit } from '@angular/core';
import { Users } from '../user';
import { UsersService } from '../users.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {
  currentUser: Users = {
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    address: "",
    cardNumber: 0
  };

  _userService: UsersService;
  router: Router;

  constructor(userservice: UsersService, router: Router) {
    this._userService = userservice;
    this.router = router;
  }

  ngOnInit(): void {
    //let currentUserId: number = Number(localStorage.getItem("currentUserId"));
    this._userService.GetUserbyId()
      .subscribe((data: Users) => { this.currentUser = data })

  }

  onLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true })

  }




}
