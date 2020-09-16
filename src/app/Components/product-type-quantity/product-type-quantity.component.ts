import { Component, OnInit } from '@angular/core';
import { ProductTypeQuantityViewModel } from 'src/app/Models/ViewModels/ProductTypeQuantityViewModel';
import { ProductTypeQuantity } from 'src/app/Models/product-type-quantity';
import { Quantity } from 'src/app/Models/quantity';
import { ProductType } from 'src/app/Models/product-type';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductTypeQuantityService } from 'src/app/Services/ProductTypeQuantityService/product-type-quantity.service';
import { QuantityService } from 'src/app/Services/QuantityService/quantity.service';
import { ProductTypeService } from 'src/app/Services/ProductTypeService/product-type.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-type-quantity',
  templateUrl: './product-type-quantity.component.html',
  styleUrls: ['./product-type-quantity.component.css']
})
export class ProductTypeQuantityComponent implements OnInit {

  productTypeQuantities: ProductTypeQuantityViewModel[];
  productTypeQuantity: ProductTypeQuantity;
  productTypeQuantityForm: any;
  quantities: Quantity[];
  productTypes: ProductType[];
  quantity: Quantity;
  productType: ProductType;
  selectedQuantity: any;
  selectedProductType: ProductType;
  quantityId: number = null;
  productTypeId: number = null;
  dataFromForm: any;
  updateOption = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private productTypeQuantityService: ProductTypeQuantityService, private quantityService: QuantityService, private productTypeService: ProductTypeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getProductTypeQuantities();
    this.getQuantities();
    this.getProductTypes();
    this.productTypeQuantityForm= this.formBuilder.group({
      quantityName:['', Validators.required],
      productTypeName:['', Validators.required]
    });
  }

  addProductTypeQuantity(productTypeQuantity: ProductTypeQuantity){
    if(productTypeQuantity != undefined && productTypeQuantity != null){
      if(this.updateOption == null){
        productTypeQuantity.quantityId = this.quantityId;
        productTypeQuantity.productTypeId = this.productTypeId;
        this.productTypeQuantityService.addProductTypeQuantity(productTypeQuantity).subscribe((data:any)=>{
          this.changeHeading();
          this.getProductTypeQuantities();
          alert("Record Added Successfully");
        });
      }
      else{
        productTypeQuantity.quantityId = this.selectedQuantity.quantityId;
        productTypeQuantity.productTypeId = this.selectedProductType.productTypeId;
        productTypeQuantity.productTypeQuantityId = this.updateOption;
        if(window.confirm('Are you sure you want to update this record?')){
          this.productTypeQuantityService.updateProductTypeQuantity(this.updateOption,productTypeQuantity).subscribe((data:any)=>{
            this.getProductTypeQuantities();
            this.changeHeading();
            alert("Record Updated Successfully");
          });
        }
        else{
          this.getProductTypes();
        }
        this.updateOption=null;
      }
    }
  }

  getProductTypeQuantities(){
    this.productTypeQuantityService.getProductTypeQuantity().subscribe((data:any)=>{
      this.productTypeQuantities = data;
    });
  }

  getQuantities(){
    this.selectedQuantity={
      quantityId: null,
      quantityName: 'Select Quantity',
    };
    this.quantityService.getQuantity().subscribe((data:any)=>{
      this.quantities = data;
    })
  }

  getProductTypes(){
    this.selectedProductType={
      productTypeId: null, 
      productTypeName: 'Select Product Type'
    };
    this.productTypeService.getProductType().subscribe((data:any)=>{
      this.productTypes = data; 
    });
  }

  getReferenceQuantity(){
    this.quantityService.getQuantityById(this.quantityId).subscribe((data:any)=>{
      this.quantity = data;
      this.selectedQuantity = data[0];
    });
  }

  getReferenceProductType(){
    this.productTypeService.getProductTypeById(this.productTypeId).subscribe((data:any)=>{
      this.productType = data;
      this.selectedProductType = data[0];
    });
  }

  getQuantityId(quantity: any){
    this.selectedQuantity = quantity;
    this.quantityId = quantity.quantityId;
  }

  getProductTypeId(producttype: any){
    this.selectedProductType = producttype;
    this.productTypeId = producttype.productTypeId;
  }

  loadProductTypeQuantityToEdit(productTypeQuantityId: number){
    this.updateOption = productTypeQuantityId;
    this.productTypeQuantityService.getProductById(productTypeQuantityId).subscribe((data:any)=>{
      this.productTypeQuantity = data;
      this.productTypeQuantityForm.controls['productTypeName'].setValue(data[0].productTypeName);
      this.productTypeQuantityForm.controls['quantityName'].setValue(data[0].quantityName);
    });
  }

  loadFormToEdit(productTypeQuantityId: number){
    this.updateOption = productTypeQuantityId;
    this.productTypeQuantityService.getProductById(productTypeQuantityId).subscribe((data:any)=>{
      this.productTypeQuantity = data; 
      this.productTypeQuantityForm.controls['productTypeName'].setValue(data[0].productTypeName);
      this.productTypeQuantityForm.controls['quantityName'].setValue(data[0].quantityName);
      this.productTypeId = data[0].productTypeId;
      this.quantityId = data[0].quantityId;
      this.getReferenceQuantity();
      this.getReferenceProductType();
    });
  }

  deleteProductTypeQuantity(productTypeQuantityId:number){
    if(window.confirm("Are you sure you want to delete this product")){
      this.productTypeQuantityService.deleteProductTypeQuantity(productTypeQuantityId).subscribe((data:any)=>{
        this.getProductTypeQuantities();
      });
    }
  }

  onFormSubmit(){
    this.getReferenceQuantity();
    this.getReferenceProductType();
    const productTypeQuantityData = this.productTypeQuantityForm.value;
    var p: ProductTypeQuantity = this.productTypeQuantityForm.value;
    this.addProductTypeQuantity(p);
  }

  changeHeading(){
    this.updateOption = null;
    this.productTypeQuantityForm.reset();
    this.selectedQuantity = {
      quantityId: null, 
      quantityName: 'Select Quantity'
    };
    this.selectedProductType = {
      productTypeId: null,
      productTypeName: 'Select Product Type'
    }
  }
}
