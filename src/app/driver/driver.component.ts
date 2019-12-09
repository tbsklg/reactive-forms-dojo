import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  public name: FormControl;
  public vorname: FormControl;
  public driverForm: FormGroup;
  public address1: FormGroup;
  public address2: FormGroup;
  public address3: FormGroup;
  public addresses: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.name = new FormControl(null, [Validators.required, Validators.maxLength(10), this.startsWithP, this.hasNumberOfPs(3)]);
    this.vorname = new FormControl(null, Validators.required);
    this.address1 = this.formBuilder.group({ street: ['Sesamstrasse', [Validators.maxLength(25)]], city: ['Bamberg'], delete: [false] });
    this.address2 = this.formBuilder.group({ street: ['Bahnhofsstrasse', [Validators.maxLength(25)]], city: ['Erlangen'], delete: [false] });
    this.address3 = this.formBuilder.group({ city: ['Gebersdorf'], street: ['Bahnhofsweg', [Validators.maxLength(25)]], delete: [false] });
    this.addresses = new FormArray([this.address1, this.address2, this.address3]);

    this.driverForm = new FormGroup({ 'name': this.name, 'vorname': this.vorname, 'addresses': this.addresses });
    //this.initForm();
  }


  addAddress(){
    let address3 = this.formBuilder.group({ city: [''], street: ['', [Validators.maxLength(25)]] , delete: [false]},);
    this.addresses.push(address3);
  }


  deleteAddress(){

    let elemsToDelete = [];
    this.addresses.controls.forEach( (e: FormGroup) => {
      if(e.controls.delete.value){
        elemsToDelete.push(this.addresses.controls.indexOf(e));
      }
    });
    
    elemsToDelete.sort((a: any, b: any) => {
      return b - a;
    });

    elemsToDelete.forEach(elem => {
      this.addresses.controls.splice(elem, 1);
    });
  }


  hasNumberOfPs(numberOfPs: number) {
    return (control: AbstractControl) => {
      const value: string = control.value;
      if (value && value.split('P').length >= numberOfPs) {
        return { hasNumberOfPs: { errorCode: 711, description: 'Has >= ' + numberOfPs + ' Ps' } }
      }
      else {
        return null;
      }
    }
  }

  private startsWithP(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (value && value.substring(0, 1) !== 'P') {
      return { startsWithP: { errorCode: 4711, description: 'starts with p' } };
    }
    return null;
  }

  private initForm() {
    this.driverForm.reset({ 'name': 'Müller', 'vorname': 'Peter', 'address': { 'street': 'Sesamstrasse', 'city': 'Bamberg' } });
  }

  public onSubmit() {
    if (this.driverForm.valid) {
      console.log('submit', this.driverForm.value);
    } else {
      console.log('fehler');
      console.log(this.driverForm.controls.name.errors)
    }
  }

  public resetForm() {
    this.initForm();
  }
}
