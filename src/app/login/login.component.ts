import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { UserInfoApiResponseI } from '../Modals/UserInfoI';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginform: FormGroup;
  subscription: Subscription;

  constructor(private service: LoginService) {}
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginform = new FormGroup({
      userName: new FormControl('surya'),
      password: new FormControl('test123'),
    });
  }

  login() {
    console.log(this.loginform.value);
    this.service.login(this.loginform.value).subscribe(
      (success: UserInfoApiResponseI) => {
        console.log(success);
        this.service.saveUserInfo(success?.data?.user);
        sessionStorage.setItem('token', success?.data?.token);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
