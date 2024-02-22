import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudent(): Observable<any> {
    return this.http
      .get<any>('api/student')
      .pipe(map((apiResponse) => this.addActiveStatus(apiResponse)));
  }

  createStudent(studentObj: any) {
    return this.http.post('api/student', studentObj);
  }

  deleteStudent(studentId: any) {
    return this.http.delete(`api/student/${studentId}`);
  }

  addActiveStatus(response) {
    let studentList = response.data;
    let updatedList = studentList.map((student) => ({
      ...student,
      activeStatus: student.year > 2019,
    }));
    return { ...response, data: updatedList };
  }
}
