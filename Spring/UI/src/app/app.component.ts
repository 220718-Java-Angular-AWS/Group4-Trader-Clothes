import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';
  router: Router
  constructor(router : Router)
  {
    this.router = router;
  }

  ngOnInit(): void {
   
    this.router.navigate(['/welcome-component']); // original 
    
    
    // this.router.navigate(['/personal-info']);// for testing 
  }
}
