import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService, EventPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  eventForm:FormGroup;
  eventDetails: EventPayload

constructor(private auth: AuthenticationService, private router: Router) {}

ngOnInit(): void {
  this.eventForm=new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'cost':new FormControl('',[Validators.required,Validators.pattern("^\\d{1,3}(,?\\d{3})*")]),
    'description': new FormControl(''),
    'type': new FormControl('',[Validators.required]),
    'city': new FormControl('',[Validators.required]),
    'date': new FormControl('',[Validators.required]),
  });
}

setValues(){
  const temp={
    name:this.eventForm.get('name').value,
    cost:this.eventForm.get('cost').value,
    description:this.eventForm.get('description').value,
    type:this.eventForm.get('type').value,
    city:this.eventForm.get('city').value,
    date:this.eventForm.get('date').value,
    email:this.auth.getUserDetails().email
  }
this.eventDetails=temp;
}

submit() {
  this.setValues();
  this.auth.event(this.eventDetails).subscribe(
    () => {
      console.log("work complete");
      this.router.navigateByUrl("/eventlist");
    },
    err => {
      console.error(err);
    }
  );
}

}
