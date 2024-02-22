import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable, Subject, catchError, filter, map, of, switchMap, takeUntil, throwError } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AboutUsFormComponent } from './about-us-form/about-us-form.component';
// import {formBuilder} from '@angular'

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, AboutUsFormComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit, OnDestroy {
  unsub = new Subject<boolean>();
  userInfoProp$: Observable<any>;
  someStr: string;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    // this.userInfoProp$ = 
    this.loginService.userInfo$.pipe(
      takeUntil(this.unsub),
      filter((userInfo) => !!userInfo),
      map((userInfo) => userInfo['userName']),
      catchError((error) => throwError({error: error, errorMsg: 'Failed form 1st api'})),
      switchMap(() =>  of({data: []}).pipe(catchError((error) => throwError({error: error, errorMsg: 'Failded from 2nd API'}))))
    ).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
      )
  }

  ngOnDestroy(): void {
    this.unsub.next(true);
    this.unsub.complete();
  }

  newFun() {
    this.someStr = new Date().toISOString();
  }

  someFunction() {
    console.log('function called');
    
    return 'Boby';
  }
}
