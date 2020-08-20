import { Component, OnInit } from '@angular/core';
import { Quantity } from 'src/app/Models/quantity';
import { QuantityService } from 'src/app/Services/QuantityService/quantity.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {

  quantities: Quantity[]=[];
  quantityForm: any;
  quantity: Quantity;
  formHeading: string;
  quantityUpdate = null;

  constructor(private quantityService: QuantityService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.quantityForm = this.formBuilder.group({
      quantityName:[0, Validators.required]
    });
    this.getQuantities();
  }

  addQuantity(quantity: Quantity){
    if(quantity!=undefined && quantity!=null){
      if(this.quantityUpdate==null){
        this.quantityService.addQuantity(quantity).subscribe(()=>{
          this.setHeading();
          this.getQuantities();
        });
      }
      else{
        quantity.quantityId = this.quantityUpdate;
        this.quantityService.updateQuantity(this.quantityUpdate, quantity).subscribe(()=>{
          this.getQuantities();
          this.setHeading();
        });
      }
    }
  }

  getQuantities(){
    this.quantityService.getQuantity().subscribe((data:any)=>{
      this.quantities = data;
    });
  }

  getQuantityById(quantityId:number){
    this.quantityService.getQuantityById(quantityId).subscribe((data:any)=>{
      this.quantity = data;
    });
  }

  updateQuantity(quantityId:number){
    this.quantityService.getQuantityById(quantityId).subscribe((data:any)=>{
      this.quantity = data;
      this.quantityUpdate = quantityId;
      console.log('Found this', this.quantity);
      this.quantityForm.controls['quantityName'].setValue(data[0].quantityName);
    });
  }

  deleteQuantity(quantityId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.quantityService.deleteQuantity(quantityId).subscribe(()=>{
        this.getQuantities();
      });
    }
    else{
      this.getQuantities();
    }
  }

  onFormSubmit(){
    const quantityData = this.quantityForm.value;
    this.addQuantity(quantityData);
  }

  resetForm(){
    this.quantityForm.reset();
  }

  setHeading(){
    this.quantityUpdate = null;
    this.resetForm();
  }
}
