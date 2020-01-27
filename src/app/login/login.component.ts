import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fields = [];
  dataView: any;
  constructor(private stateService:StateService) { }

  ngOnInit() {
    this.fetchField(cb => {
      this.fields = cb
    })
  }
  fetchField(callback) {
    this.stateService.getFormAttr("login.json").subscribe(fr=>{
      callback(fr);
    })
  }

  onSubmit($event) {
    if ($event.valid) {
      console.log($event)
    }
  }
}
