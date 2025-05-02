import { Pipe, PipeTransform } from '@angular/core';
import { Attendance } from '../../../dto/attendance.interface';

@Pipe({
  name: 'filterAttendances'
})
export class FilterAttendancesPipe implements PipeTransform {

  transform(attendances: Attendance[], searchTerm: string): Attendance[] {
    if(!searchTerm){
      return attendances;
    }

    const text=searchTerm.toLowerCase();
    return attendances.filter(attendance=>{
      return attendance.firstName.toLowerCase().includes(text) ||
             attendance.playCenterId.toLowerCase().includes(text);

    })

  }

}
