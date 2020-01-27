import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private httpClient: HttpClient) { }

  getFormAttr(filejson: string): Observable<any> {
    return this.httpClient.get("assets/form-attr/" + filejson);
  }
  fillValidator(arrayValidator, callback) {
    let collValidator: Validators[] = [];
    arrayValidator.forEach(el => {
      switch (el) {
        case "required":
          collValidator.push(Validators.required);
          break;
        case "number":
          collValidator.push(Validators.pattern('^[0-9]+$'));
          break;
        case "email":
          collValidator.push(Validators.email);
          break;
        default:
          break;
      }
    });
    callback(collValidator);
  }

  toFormGroup(fields) {
    let group: any = {};
    fields.forEach(question => {
      if (question.validator.length)
        this.fillValidator(question.validator, res => {
          if (res.length) {
            group[question.key] = new FormControl(question.value || '', res);
          }
        })
      else
        group[question.key] = new FormControl(question.value || '');

      if (question.disable)
        group[question.key].disable();
    });
    return new FormGroup(group);
  }

  resetForm(form: FormGroup, data?: any) {
    if (data) {
      Object.keys(form.controls).forEach(key => {
        form.get(key).setValue(data[key]);
      });
    } else {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.get(key).setErrors(null);
      });
    }
  }
}
