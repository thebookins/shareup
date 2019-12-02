import { Component, OnInit } from '@angular/core';
import { Status } from '../status';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  status: Status

  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.statusService.getStatus()
      .subscribe((data: Status) => this.status = { ...data });
  }
}
