import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('fabioiantas@outlook.com', Validators.required),
    password: new FormControl('secret', Validators.required)
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {}

  login() {
    this.authenticationService.login(this.loginForm.value).subscribe(data => {
      this.router.navigate(['/auditoria-entidade']);
    });
  }
}
