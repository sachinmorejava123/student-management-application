import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ModelService, Gender } from 'src/app/services/model.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  student: Student;
  cities: City[];
  genders: Gender[];
  inputReadonly= true;
  editProfileForm : FormGroup;

  constructor(
    private studentService: StudentService,
    private modelSerice: ModelService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit() {
    this.cities = this.modelSerice.getCities();
    this.genders = this.modelSerice.getGenders();
    this.student = this.studentService.student;
    this.editProfileForm = this.formBuilder.group({
      'firstName': this.student.firstName,
      'lastName': this.student.lastName,
      'city': this.student.city,
      'mobileNumber': this.student.mobileNumber,
      'dob': this.student.dob,
      'gender': this.student.gender,
      'homeZipCode': this.student.homeZipCode
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editProfileForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  onFormSubmit() {
    this.student =this.editProfileForm.value;
    this.studentService.editProfile(this.student)
    .subscribe(
      res => this.openSnackBar('Congratulations', 'Your profile updated successfully'),
      err => this.openSnackBar('Sorry', 'Your profile updated failed'),
    )
    this.editProfileForm.reset();
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 3000,
      verticalPosition: "top"
    });
  }
}
