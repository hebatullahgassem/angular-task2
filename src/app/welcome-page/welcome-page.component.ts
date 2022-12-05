import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from '../services/login.service';
import { Data } from '../model/app.model';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  isSignedNda: boolean = false;

  disabledCard = true;

  employee!: Data;
  
  hide = true;

  constructor(
    private router: Router, 
    private loginService: LoginService,
    private localStorageService: LocalStorageService
    ) { }

  ngOnInit(): void {
    if(this.isSignedNda === true){
    this.isSignedNda = this.localStorageService.getNda();
    }
    //this.isSignedNda = this.localStorageService.getNda();

    this.loginService.acceptTerms.subscribe((res: boolean) => (this.disabledCard = res));

    this.loginService.hideDiv.subscribe((res: boolean) => (this.hide = res));
    
    this.employee = this.localStorageService.getAccess();
  }

  onSign(){
    this.router.navigate(['/terms-NDA-page']);
  }

  onDashboard(){
    this.router.navigate(['/dashboard-page']);
  }
}
