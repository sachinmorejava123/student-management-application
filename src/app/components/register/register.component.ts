import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators, FormsModule, NgForm, FormControl} from '@angular/forms';
import { from } from 'rxjs';
import { Location } from '@angular/common';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { HttpResponse } from '@angular/common/http';
import { ModelService, City, Gender } from 'src/app/services/model.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  hide = true;
  student: Student;
  cities:City[];
  genders: Gender[];
  registerForm: FormGroup;
  inputReadonly= true;
  responce: HttpResponse<Student>;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private modelService: ModelService,
    private matSnackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit() {

    this.cities = this.modelService.getCities();
    this.genders=this.modelService.getGenders();
    this.registerForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'city': [null, Validators.required],
      'mobileNumber': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required],
      'dob': [null, Validators.required],
      'gender': [null, Validators.required],
      'homeZipCode': [null, Validators.required]
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  onFormSubmit(){
   this.student = this.registerForm.value;
   this.studentService.registerStudent(this.student)
   .subscribe(
     resp => this.openSnackBar('Congratulations..', 'Registration successfully done'),
     err => this.openSnackBar('Sorry', 'Registration failed..Please Try again !')
   )
   this.registerForm.reset();
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 4000,
      verticalPosition: "top"
    });
  }
}
