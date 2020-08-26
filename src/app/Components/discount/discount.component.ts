import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/Models/discount';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DiscountService } from 'src/app/Services/DiscountService/discount.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  discounts: Discount[]=[];
  discountForm: any;
  discount: Discount;
  formHeading: string;
  discountUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private discountService: DiscountService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.discountForm = this.formBuilder.group({
      discountName:['', Validators.required]
    });
    this.getDiscounts();
  }

  addDiscount(discount: Discount){
    if(discount!=undefined && discount!=null){
      if(this.discountUpdate==null){
        this.discountService.addDiscount(discount).subscribe(()=>{
          this.setHeading();
          this.getDiscounts();
          alert("Discount Added Successfully");
        });
      }
      else{
        discount.discountId = this.discountUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.discountService.updateDiscount(this.discountUpdate, discount).subscribe(()=>{
          this.getDiscounts();
          this.setHeading();
        });
      }
      else{
        this.getDiscounts();
      }
      }
    }
  }

  getDiscounts(){
    this.discountService.getDiscount().subscribe((data:any)=>{
      this.discounts = data;
    });
  }

  getDiscountById(discountId:number){
    this.discountService.getDiscountById(discountId).subscribe((data:any)=>{
      this.discount = data;
    });
  }

  updateDiscount(discountId:number){
    this.discountService.getDiscountById(discountId).subscribe((data:any)=>{
      this.discount = data;
      this.discountUpdate = discountId;
      this.discountForm.controls['discountName'].setValue(data[0].discountName);
    });
  }

  deleteDiscount(discountId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.discountService.deleteDiscount(discountId).subscribe(()=>{
        this.getDiscounts();
      });
    }
    else{
      this.getDiscounts();
    }
  }

  onFormSubmit(){
    const discountData = this.discountForm.value;
    this.addDiscount(discountData);
  }

  resetForm(){
    this.discountForm.reset();
  }

  setHeading(){
    this.discountUpdate = null;
    this.resetForm();
  }
}
