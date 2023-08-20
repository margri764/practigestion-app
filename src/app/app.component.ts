import { Component, OnInit } from '@angular/core';
import { AuthService } from './protected/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'practigestion-app';


  constructor(
              private authService : AuthService,
              private router : Router
  ){


  }


  ngOnInit(): void {


     if(!this.authService.getToken() &&  !this.authService.getCookieToken()) {
        this.router.navigateByUrl('/login')
    }
  }


}
