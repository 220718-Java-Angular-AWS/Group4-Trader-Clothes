import { Component, OnInit } from '@angular/core';
import { CreateUsers } from '../createUser';
import { UsersService } from '../users.service';
import { Route, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  // imagePath: string = "src\assets\img\profile.jpg"
  service: UsersService;
  router: Router;
  constructor(userService: UsersService, router: Router) {
    this.service = userService;
    this.router = router;
  }

  ngOnInit(): void {
  }

  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  email: string = "";
  password: string = "";
  address: string = "";
  cardNumber: string = "";



  onSignUp(): void {
    // needs to get the information from template and 
    // try to create a new user in the database 

    // for navigation help: https://stackoverflow.com/questions/47010159/how-to-redirect-to-a-new-page-in-angular-4-through-button-click
    const navigationDestination: string[] = ['/login'];

    // create new User Object
    let newUser: CreateUsers =
    {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.userName,
      email: this.email,
      password: this.password,
      address: this.address,
      cardNumber: this.cardNumber
    };



    if (this.firstName === "" || this.lastName === "" || this.email === "" || this.password === "" || this.address === "" || this.userName === "" || this.cardNumber === "") {
      alert("Bad Input please try again")

    }
    else {

      let observable: Observable<HttpResponse<Object>> = this.service.CreateUser(newUser);
      observable.subscribe(
        (response: HttpResponse<Object>) => {
          console.log("Observable has emitted a value...");
          if (response.status != 200) {

            alert("Bad Sign Up Attempt");

          }
          else
          {
            this.router.navigate(navigationDestination, { replaceUrl: true });
          }
        
        });
      // // then need to post new User 
      // this.service.CreateUser(newUser)
      //   .subscribe(data => {
      //     console.log("Post Request for creating new employee");
      //     console.log("New User:" + newUser.address)

      //     // 
      //     this.router.navigate(navigationDestination, { replaceUrl: true });
      //   });
    }




  } // end of onsubmit

  // checkSignUp(): boolean
  // {
  //   let signUpVal : boolean = true;

  //   // check first name & last name one method
    
  //   // check username 

  //   // check email

  //   // check card number 




  //   // check password




  //   return signUpVal;
  // }


}
