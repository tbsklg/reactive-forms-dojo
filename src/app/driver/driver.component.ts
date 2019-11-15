import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  public name: FormControl;
  public vorname: FormControl;
  public driverForm: FormGroup;

  constructor() { }

  ngOnInit() {
    
    
    this.name = new FormControl('Müller');
    this.vorname = new FormControl();
    
    this.vorname.setValue('ghp');
    this.driverForm = new FormGroup({'name': this.name, 'vorname': this.vorname});

  }

  public onSubmit(){
    console.log('submit', this.driverForm.value );
  }
}
