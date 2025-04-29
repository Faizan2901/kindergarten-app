import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../../dto/student.interface';

@Pipe({
  name: 'filterstudents'
})
export class FilterstudentsPipe implements PipeTransform {

  transform(students: Student[], searchTerm: string): Student[] {
    if(!searchTerm){
      return students;
    }

    const text=searchTerm.toLowerCase();

    return students.filter(student=>{
      return student.firstName.toLowerCase().includes(text) ||
             student.fatherName.toLowerCase().includes(text) ||
             student.motherName.toLowerCase().includes(text) ||
             student.playCenterId.toLowerCase().includes(text)  ;
    })
  }

}
