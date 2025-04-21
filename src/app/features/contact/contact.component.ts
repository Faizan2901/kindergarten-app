import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contact=
  {
    name:'',
    email:'',
    message:''
  }

  onSubmit() {
    // Handle the form submission, send it to a server, etc.
    if(!this.contact.name.trim() || !this.contact.email.trim() || !this.contact.message.trim()) 
    {
      alert("Please fill proper information.."); return;
    }
    else 
    {
      console.log(this.contact); alert('Form submitted!');
    }
  }
  
}
