import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { error } from 'util';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  student: Student;

  constructor(private http: HttpClient) { }

  registerStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(environment.studentURL, student, httpOptions);
  }

  loginStudent(student: Student) {
    return this.http.get<any>(`${environment.studentURL}/?email=${student.email}&password=${student.password}`,{observe: 'response'})
    .pipe(
       map(res => this.student =res.body[0])
    )
  }

  editProfile(student: Student) {
    return this.http.patch<any>(`${environment.studentURL}/${this.student.id}`, student)
    .pipe(
      map(res => this.student = res)
    )
  }
}
