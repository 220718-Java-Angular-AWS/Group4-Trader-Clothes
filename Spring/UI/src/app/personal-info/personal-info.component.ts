import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../user';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  _userService: UsersService;
  user: Users = {userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    address: "",
    cardNumber: 0} ;

    router: ActivatedRoute;
    // buttonRouter: string[] = ['/PersonalInfoComponent'];
    buttonRouter: Router;



  constructor(private http: HttpClient, userService: UsersService, router: ActivatedRoute, buttonRouter: Router ) {
    this._userService = userService;
    this.router = router;
    this.buttonRouter = buttonRouter;
   }

  ngOnInit(): void {
    //let id = parseInt(this.router.snapshot.paramMap.get('id')!, 10);

    //get id from local storage and change id to match it
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

  // reset password navigator
  resetPass(): void {
    const navigationDestination: string[] = ['/reset-password'];
    this.buttonRouter.navigate(navigationDestination, {replaceUrl:true});
  }

  // updateAdd navigator
  updateAdd(): void {
    const navigationDestination: string[] = ['/update-address'];
    this.buttonRouter.navigate(navigationDestination, {replaceUrl:true});
  }

  //changeEmail
  changeEmail(): void {
    const navigationDestination: string[] = ['/change-email'];
    this.buttonRouter.navigate(navigationDestination, {replaceUrl:true});
  }

  //view payInfo
  payInfo(): void {
    const navigationDestination: string[] = ['/payment-info'];
    this.buttonRouter.navigate(navigationDestination, {replaceUrl:true});
  }

  //return to home page
  home(): void {
    const navigationDestination: string[] = ['/home'];
    this.buttonRouter.navigate(navigationDestination, {replaceUrl:true});
  }
  //past purchases
  pastPurchases(): void {
    const navigationDestination: string[] = ['/past-purchases'];
    this.buttonRouter.navigate(navigationDestination, {replaceUrl:true});
  }
}