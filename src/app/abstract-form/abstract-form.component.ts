import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-abstract-form',
  templateUrl: './abstract-form.component.html',
  styleUrls: ['./abstract-form.component.scss']
})
export class AbstractFormComponent implements OnInit {
  genForm: FormGroup;
  @Input('btnSubmitValue') btnSubmitValue = "Submit";
  @Input('fields') fields;
  @Input('mode') mode; //0 insert, 1 edit, 2 view
  @Input('data') data;
  @Input('resetable') resetable = true;
  @Output('onSubmit') onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.genForm = this.stateService.toFormGroup(this.fields);
    if (this.data) {
      //this.stateService.resetForm(this.genForm, this.data);
      setTimeout(() => { this.stateService.resetForm(this.genForm, this.data); }, 0);
    }
    if (this.mode == 2) {
      this.genForm.disable();
    }
    this.genForm.valueChanges.subscribe(val => {
      this.onChange.emit(val)
    })
  }

  formSubmit() {
    if (this.genForm.valid)
      this.onSubmit.emit(this.genForm);
  }

}
