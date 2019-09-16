import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  student: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.student = this.studentService.student;
    console.log(this.student);
  }

}
