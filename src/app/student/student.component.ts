import { Component, Input, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Observable,
  Subscription,
  catchError,
  forkJoin,
  switchMap,
  throwError,
} from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { StudentService } from '../services/student.service';
import { CustomerService } from '../services/customer.service';
import { TeachersComponent } from './teachers/teachers.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, TeachersComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnDestroy {
  studentForm: FormGroup;
  @Input() parentItem = '';
  studentList = [];
  subscription: Subscription;
  message: string;

  constructor(
    private service: StudentService,
    private customerService: CustomerService
  ) {}
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getStudentInfo().subscribe((tableData) =>
      this.handleGetAllStudentsSuccessResp(tableData)
    );
    this.createForm();
  }

  createForm() {
    this.studentForm = new FormGroup({
      studentName: new FormControl(''),
      studentId: new FormControl(''),
      studentPhoneNumber: new FormControl(''),
      course: new FormControl(''),
      year: new FormControl(''),
      country: new FormControl(''),
    });
    // forkJoin([
    //   this.service.getStudent()
    // ]).subscribe(getStudentResponse => {
    //   console.log(getStudentResponse);

    // })
  }

  addNewStudent() {
    this.service
      .createStudent(this.studentForm.getRawValue())
      .pipe(
        catchError((error) =>
          throwError(() => ({ errorObj: error, errorFrom: 'Create call Failed' }))
        ),
        switchMap(() => {
          return this.getStudentInfo().pipe(
            catchError((error) =>
              throwError(() => ({ errorObj: error, errorFrom: 'Get ALL Students Failed' }))
            )
          );
        })
      )
      .subscribe(
        (tableData) => {
          this.handleGetAllStudentsSuccessResp(tableData);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getStudentInfo(): Observable<any> {
    // on spinner here
    return this.service.getStudent();
  }

  deleteStudent() {
    this.service
      .deleteStudent(this.studentForm.getRawValue().studentId)
      .pipe(
        catchError(() =>
          throwError(() => ({ errorFrom: 'Create call Failed' }))
        ),
        switchMap(() => {
          return this.getStudentInfo().pipe(
            catchError(() =>
              throwError(() => ({ errorFrom: 'Get ALL Students Failed' }))
            )
          );
        })
      )
      .subscribe(
        (tableData) => {
          this.handleGetAllStudentsSuccessResp(tableData);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleGetAllStudentsSuccessResp(tableData) {
    console.log(tableData);

    this.studentList = tableData.data;
  }

  changeMessage() {
    this.customerService.changeMessage('Hello this is the new Message');
  }
}
