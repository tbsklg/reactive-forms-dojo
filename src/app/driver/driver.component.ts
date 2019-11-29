import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  public name: FormControl;
  public vorname: FormControl;
  public driverForm: FormGroup;
  public address: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.name = new FormControl(null, [Validators.required, Validators.maxLength(10), this.startsWithP, this.hasNumberOfPs(3)]);
    this.vorname = new FormControl(null, Validators.required);
    this.address = this.formBuilder.group({street: ['Sesamstrasse'], city: ['Bamberg']})
    this.driverForm = new FormGroup({'name': this.name, 'vorname': this.vorname, 'address': this.address});
    this.initForm();
  }

  hasNumberOfPs(numberOfPs: number) {
    return (control: AbstractControl) => {
      const value: string = control.value;
      if(value && value.split('P').length >= numberOfPs) {
        return {hasNumberOfPs: {errorCode: 711, description: 'Has >= ' + numberOfPs + ' Ps' }}
      }
      else {
        return null;
      }
    }
  }

  private startsWithP(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if(value && value.substring(0,1) !== 'P'){
      return {startsWithP: {errorCode: 4711, description: 'starts with p'}};
    }
    return null;
  }

  private initForm(){
    this.driverForm.reset({'name': 'Müller', 'vorname': 'Peter', 'address': {'street': 'Sesamstrasse', 'city': 'Bamberg'}});
  }

  public onSubmit(){
    if(this.driverForm.valid){
      console.log('submit', this.driverForm.value );
    } else {
      console.log('fehler');
      console.log(this.driverForm.controls.name.errors)
    }
  }

  public resetForm(){
    this.initForm();
  }
}
