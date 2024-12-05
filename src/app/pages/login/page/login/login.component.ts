import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showPass: boolean = false;

  submit: any;
  constructor(private readonly router: Router, private authService: AuthService) {
    this.form = new FormGroup(
      {
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      }
    );
   }

  ngOnInit(): void {
  }

  validateUser() {
    this.submit = true;
    if (this.form.invalid) return ;
    const params = {...this.form.value};
    this.authService.authLogin(params).subscribe(
      {
        next: (user: any) => {
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('/inventory-management/articles');
        },
        error: (err: any) => {
          alert(err.error.description);
        }
      }
    );
  }

  toggleShowPass(){
    this.showPass = !this.showPass;
  }
}
