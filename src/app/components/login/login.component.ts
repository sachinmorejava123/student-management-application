import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';
import { Student } from 'src/app/models/Student';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  student: Student;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private location: Location,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required],
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onFormSubmit() {
    this.student = this.loginForm.value;
    this.studentService.loginStudent(this.student)
    .subscribe(res => {
      if(res){
        this.openSnackBar('Congratulations', 'Login successfully done');
        this.router.navigate(['studentprofile']);


      }else{
        this.openSnackBar('Sorry', 'Please check email or password');
      }
    })
  }

  public onCancel = () => {
    this.location.back();
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 4000,
      verticalPosition: "top"
    });
  }
}
