import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/Models/product-type';
import { ProductTypeService } from 'src/app/Services/ProductTypeService/product-type.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  productTypes: ProductType[]=[];
  productTypeForm: any;
  productType: ProductType;
  formHeading: string;
  productTypeUpdate = null;

  constructor(private productTypeService: ProductTypeService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.productTypeForm = this.formBuilder.group({
      ProductTypeName:['',Validators.required]
    })
    this.getProductTypes();
  }

  addProductType(productType:ProductType){
    if(productType!=undefined && productType!=null){
      if(this.productTypeUpdate==null){
        this.productTypeService.addProductType(productType).subscribe(()=>{
          this.setHeading();
          this.getProductTypes();
        });
      }
      else{
        productType.productTypeId = this.productTypeUpdate;
        this.productTypeService.updateProductType(this.productTypeUpdate, productType).subscribe(()=>{
          this.getProductTypes();
          this.setHeading();
        });
      }
    }
  }

  getProductTypes(){
    this.productTypeService.getProductType().subscribe((data:any)=>{
      this.productTypes = data;
      console.log(this.productType)
    });
  }

  getProductTypeById(productTypeId:number){
    this.productTypeService.getProductTypeById(productTypeId).subscribe((data:any)=>{
      this.productType = data;
    });
  }

  updateProductType(productTypeId:number){
    this.productTypeService.getProductTypeById(productTypeId).subscribe((data:any)=>{
      this.productType = data;
      this.productTypeUpdate = productTypeId;
      console.log('Found this', this.productType);
      this.productTypeForm.controls['ProductTypeName'].setValue(data[0].productTypeName);
    });
  }

  deleteProductType(productTypeId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.productTypeService.deleteProductType(productTypeId).subscribe(()=>{
        this.getProductTypes();
      });
    }
    else{
      this.getProductTypes();
    }
    }

    onFormSubmit(){
      const productTypeData = this.productTypeForm.value;
      this.addProductType(productTypeData);
    }

    resetForm(){
      this.productTypeForm.reset();
    }

    setHeading(){
      this.productTypeUpdate = null;
      this.resetForm();
    }
}
