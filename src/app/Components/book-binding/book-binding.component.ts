import { Component, OnInit } from '@angular/core';
import { BookBinding } from 'src/app/Models/book-binding';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { DesignService } from 'src/app/Models/design-service';
import { BookBindingService } from 'src/app/Services/BookBindingService/book-binding.service';

@Component({
  selector: 'app-book-binding',
  templateUrl: './book-binding.component.html',
  styleUrls: ['./book-binding.component.css']
})
export class BookBindingComponent implements OnInit {

  bookBindings: BookBinding[]=[];
  bookBindingForm: any;
  bookBinding: BookBinding;
  formHeading: string;
  bookBindingUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private bookBindingService: BookBindingService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookBindingForm = this.formBuilder.group({
      bookBindingName:['', Validators.required]
    });
    this.getBookBindings();
  }

  addBookBinding(bookBinding: BookBinding){
    if(bookBinding!=undefined && bookBinding!=null){
      if(this.bookBindingUpdate==null){
        this.bookBindingService.addBookBinding(bookBinding).subscribe(()=>{
          this.setHeading();
          this.getBookBindings();
          alert("Record Added Successfully");
        });
      }
      else{
        bookBinding.bookBindingId = this.bookBindingUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.bookBindingService.updateBookBinding(this.bookBindingUpdate, bookBinding).subscribe(()=>{
          this.getBookBindings();
          this.setHeading();
        });
      }
      else{
        this.getBookBindings();
      }
      }
    }
  }

  getBookBindings(){
    this.bookBindingService.getBookBinding().subscribe((data:any)=>{
      this.bookBindings = data;
    });
  }

  getBookBindingById(bookBindingId:number){
    this.bookBindingService.getBookBindingById(bookBindingId).subscribe((data:any)=>{
      this.bookBindingService = data;
    });
  }

  updateBookBinding(bookBindingId:number){
    this.bookBindingService.getBookBindingById(bookBindingId).subscribe((data:any)=>{
      this.bookBinding = data;
      this.bookBindingUpdate = bookBindingId;
      this.bookBindingForm.controls['bookBindingName'].setValue(data[0].bookBindingName);
    });
  }

  deleteBookBinding(bookBindingId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.bookBindingService.deleteBookBinding(bookBindingId).subscribe(()=>{
        this.getBookBindings();
      });
    }
    else{
      this.getBookBindings();
    }
  }

  onFormSubmit(){
    const bookBindingData = this.bookBindingForm.value;
    this.addBookBinding(bookBindingData);
  }

  resetForm(){
    this.bookBindingForm.reset();
  }

  setHeading(){
    this.bookBindingUpdate = null;
    this.resetForm();
  }
}
