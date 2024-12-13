import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';
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
  constructor(private readonly router: Router, private authService: AuthService,
    private readonly utilsService: UtilsService) {
    this.form = new FormGroup(
      {
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      }
    );
   }

  ngOnInit(): void {
    localStorage.removeItem('token');
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
          this.utilsService.showDanger(err?.error?.description);
        }
      }
    );
  }

  toggleShowPass(){
    this.showPass = !this.showPass;
  }
}
