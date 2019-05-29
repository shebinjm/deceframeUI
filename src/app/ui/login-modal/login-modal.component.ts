import { Component} from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  // loginFormModalEmail = new FormControl('Your email', Validators.email);
  // loginFormModalPassword = new FormControl('', Validators.required);
  loginFormModalEmail = 'Your email';
  loginFormModalPassword = '';
  invalidLogin = false

  constructor( private activemodalService:NgbActiveModal,
    private loginService:AuthenticationService,
    private router: Router,){}

  onSave() {
    this.activemodalService.close();
  }


  checkLogin() {
    if (this.loginService.authenticate(this.loginFormModalEmail, this.loginFormModalPassword)
    ) {
    console.log(this.loginFormModalEmail +" " +this.loginFormModalPassword)
     this.onSave();
   //  this.router.navigate(['/'])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

  performLogout() {
    this.loginService.logOut();
    this.router.navigate(['login']);
  }
}
