import { Component, Input } from '@angular/core';
import { StudentComponent } from '../student.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [StudentComponent, FormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
 item: string = 'wdef3fcerr';
ngOnInit(): void {    
  console.log(this.item);
}
}
