import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  UserDetails,
  EventPayload
} from "../authentication.service";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"]
})
export class EventListComponent implements OnInit {
  event: EventPayload;
  eventsPresent=false;
  displayedColumns: string[] = ['Name', 'Type', 'Description', 'Ticket Cost', 'Location', 'Date'];

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    console.log(this.auth.getUserDetails().email);
    this.auth.list(this.auth.getUserDetails().email).subscribe(
      eventData => {
        this.event = eventData;
        console.log("event deets",this.event);
        if(Object.keys(this.event).length>0){
          this.eventsPresent=true;
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
