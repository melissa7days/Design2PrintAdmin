import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { faFilm, faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[]=[];
  categoryForm: any;
  category: Category;
  formHeading: string;
  categoryUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;
  plus = faPlus;

  constructor(private categoryService: CategoryService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      CategoryName:['', Validators.required],
      CategoryDescription:['', Validators.required]
    })
    this.getCategories();
  }

  addCategory(category:Category){
    if(category!=undefined && category!=null){
      if(this.categoryUpdate==null){
        this.categoryService.addCategory(category).subscribe(()=>{
          alert("Record Added Successfully!");
          this.setHeading();
          this.getCategories();
        });
      }
      else{
        category.categoryId = this.categoryUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
          this.categoryService.updateCategory(this.categoryUpdate, category).subscribe(()=>{
            alert("Category Updated Successfully!");
            this.getCategories();
            this.setHeading();
          });
        }
        else{
          this.getCategories();
        }
      }
    }
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories = data;
    });
  }

  getCategoryById(categoryId:number){
    this.categoryService.getCategoryById(categoryId).subscribe((data:any)=>{
      this.category = data;
    });
  }

  updateCategory(categoryId:number){
    this.categoryService.getCategoryById(categoryId).subscribe((data:any)=>{
      this.category = data;
      this.categoryUpdate = categoryId;
      this.categoryForm.controls['CategoryName'].setValue(data[0].categoryName);
      this.categoryForm.controls['CategoryDescription'].setValue(data[0].categoryDescription);
    });
  }

  deleteCategory(categoryId:number){
    if(window.confirm('Are you sure you want to delete this record?')){
      this.categoryService.deleteCategory(categoryId).subscribe((data:any)=>{
        this.getCategories();
      });
    }
    else{
      this.getCategories();
    }
  }

  onFormSubmit(){
    const categoryData = this.categoryForm.value;
    this.addCategory(categoryData);
  }

  resetForm(){
    this.categoryForm.reset();
  }

  setHeading(){
    this.categoryUpdate = null;
    this.resetForm();
  }
}
