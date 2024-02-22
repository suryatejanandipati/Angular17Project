import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from './services/customer.service';
import { StudentComponent } from './student/student.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginService } from './services/login.service';
import { Subject, Subscription, filter, tap } from 'rxjs';
import { StorageService } from './services/storage.service';
import { UserInfoI, UserLogoutApiResponseI } from './Modals/UserInfoI';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentComponent, CustomerComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  username: string;
  unsub = new Subject();
  subscription: Subscription;
  aboutUsLabel= 'about-us'

  constructor(
    private service: CustomerService,
    private loginService: LoginService,
    private storageService: StorageService
  ) {}
  ngOnDestroy(): void {
    this.unsub.next(true);
    this.unsub.complete();
    // this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    // console.log(this.loginService.getUserData());
    this.loginService.userInfo$
      .pipe(
        tap((data: UserInfoI) => {
          console.log(data);
        }),
        filter((data: UserInfoI) => {
          if (!data) {
            this.username = '';
          }
          return !!data;
        })
      )
      .subscribe((data: UserInfoI) => {
        console.log(data);

        this.username = data.userName;
      });
  }

  updateUserInfo() {
    this.loginService.saveUserInfo({
      userName: 'Surya Nandipati',
      role: 'admin',
    });
  }

  getLabel() {
    console.log('triggered...')
    return 'About-Us'
  }

  logout() {
    this.loginService.logout().subscribe(
      (success: UserLogoutApiResponseI) => {
        console.log(success);
        this.loginService.saveUserInfo(null);
        this.storageService.clearToken();
      },
      (err: UserLogoutApiResponseI) => {
        console.log(err);
      }
    );
  }

  someFunction() {
    console.log('function called...');
    
    return 'Boby';
  }
}
