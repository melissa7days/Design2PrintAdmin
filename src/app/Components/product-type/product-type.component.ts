import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/Models/product-type';
import { ProductTypeService } from 'src/app/Services/ProductTypeService/product-type.service';
import { FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private productTypeService: ProductTypeService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.productTypeForm = this.formBuilder.group({
      productTypeName:['',Validators.required]
    });
    this.getProductTypes();
  }

  addProductType(productType:ProductType){
    if(productType!=undefined && productType!=null){
      if(this.productTypeUpdate==null){
        this.productTypeService.addProductType(productType).subscribe(()=>{
          alert("Record Added Successfully!");
          this.setHeading();
          this.getProductTypes();
        });
      }
      else{
        productType.productTypeId = this.productTypeUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
          this.productTypeService.updateProductType(this.productTypeUpdate, productType).subscribe(()=>{
            alert("Category Updated Successfully!");
            this.getProductTypes();
            this.setHeading();
          });
        }
        else{
          this.getProductTypes();
        }
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
      this.productTypeForm.controls['productTypeName'].setValue(data[0].productTypeName);
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
