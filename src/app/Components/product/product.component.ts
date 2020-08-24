import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from 'src/app/Models/ViewModels/ProductViewModel';
import { Product } from 'src/app/Models/product';
import { Category } from 'src/app/Models/category';
import { ProductType } from 'src/app/Models/product-type';
import { ProductService } from 'src/app/Services/ProductService/product.service';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';
import { ProductTypeService } from 'src/app/Services/ProductTypeService/product-type.service';
import { FormBuilder, Validators } from '@angular/forms';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  products: ProductViewModel[];
  product: Product;
  productForm: any;
  categories: Category[];
  productTypes: ProductType[];
  category: Category;
  productType: ProductType;
  selectedCategory: Category;
  selectedProductType: ProductType;
  categoryId: number = null;
  productTypeId: number = null;
  dataFromForm: any;
  updateOption: number;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private productService: ProductService, private categoryService: CategoryService, private productTypeService: ProductTypeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getProductTypes();
    this.productForm= this.formBuilder.group({
      productName:['', Validators.required],
      productBasePrice:['',Validators.required],
      productImage:['', Validators.required]
    });
  }

  addProducts(product: Product){
    if(product != undefined && product != null){
      if(this.updateOption == null){
        product.categoryId = this.categoryId;
        product.productTypeId = this.productTypeId;
        this.productService.addProduct(product).subscribe((data:any)=>{
          this.changeHeading();
          this.getProducts();
          alert("Product Added Successfully");
        });
      }
      else{
        product.categoryId = this.selectedCategory.categoryId;
        product.productTypeId = this.selectedProductType.productTypeId;
        product.productId = this.updateOption;
        if(window.confirm('Are you sure you want to update this record?')){
        this.productService.updateProduct(this.updateOption, product).subscribe((data:any)=>{
          this.getProducts();
          this.changeHeading();
          alert("Product Updated Successfully");
        });
      }
      else{
        this.getProductTypes();
      }
      this.updateOption=null;
      }
    }
  }

  getProducts(){
    this.productService.getProduct().subscribe((data:any)=>{
      this.products = data;
    });
  }

  getCategories(){
    this.selectedCategory={
      categoryId: null,
      categoryName: 'Select Category',
      categoryDescription: ''
    };
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories = data;
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

  getReferenceCategory(){
    this.categoryService.getCategoryById(this.categoryId).subscribe((data:any)=>{
      this.category = data;
      this.selectedCategory = data[0];
    });
  }

  getReferenceProductType(){
    this.productTypeService.getProductTypeById(this.productTypeId).subscribe((data:any)=>{
      this.productType = data;
      this.selectedProductType = data[0];
    });
  }

  getCategoryId(category: any){
    this.selectedCategory = category;
    this.categoryId = category.categoryId;
  }

  getProductTypeId(producttype:any){
    this.selectedProductType = producttype;
    this.productTypeId = producttype.productTypeId;
  }

  loadProductsToEdit(productId: number){
    this.updateOption = productId;
    this.productService.getProductById(productId).subscribe((data:any)=>{
      this.product = data;
      this.productForm.controls['productName'].setValue(data[0].productName);
      this.productForm.controls['productBasePrice'].setValue(data[0].productBasePrice);
      this.productForm.controls['productImage'].setValue(data[0].productImage);    
    });
  }

  loadFormToEdit(productId: number){
    this.updateOption = productId;
    this.productService.getProductById(productId).subscribe((data:any)=>{
      this.product = data;
      this.productForm.controls['productName'].setValue(data[0].productName);
      this.productForm.controls['productBasePrice'].setValue(data[0].productBasePrice);
      this.productForm.controls['productImage'].setValue(data[0].productImage);
      this.categoryId = data[0].categoryId;
      this.productTypeId = data[0].productTypeId;
      this.getReferenceCategory();
      this.getReferenceProductType();
    });
  }

  deleteProduct(productId: number){
    if(window.confirm("Are you sure you want to delete this product")){
      this.productService.deleteProduct(productId).subscribe((data:any)=>{
        this.getProducts();
      });
    }
  }

  onFormSubmit(){
    this.getReferenceCategory();
    this.getReferenceProductType();
    const productData = this.productForm.value;
    var p :Product = this.productForm.value;
    this.addProducts(p);
  }

  changeHeading(){
    this.updateOption=null;
    this.productForm.reset();
    this.selectedCategory = {
      categoryId: null,
      categoryName: 'Select Category',
      categoryDescription: ''
    };
    this.selectedProductType = {
      productTypeId: null,
      productTypeName: 'Select Product Type'
    };
  }
}
