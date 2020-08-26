import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/Models/pages';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PageService } from 'src/app/Services/PageService/page.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pages: Pages[]=[];
  pageForm: any;
  page: Pages;
  formHeading: string;
  pageUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private pagesService: PageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pageForm = this.formBuilder.group({
      pageName:['', Validators.required]
    });
    this.getPages();
  }

  addPage(page: Pages){
    if(page!=undefined && page!=null){
      if(this.pageUpdate==null){
        this.pagesService.addPage(page).subscribe(()=>{
          this.setHeading();
          this.getPages();
          alert("Record Added Successfully");
        });
      }
      else{
        page.pageId = this.pageUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.pagesService.updatePage(this.pageUpdate, page).subscribe(()=>{
          this.getPages();
          this.setHeading();
        });
      }
      else{
        this.getPages();
      }
      }
    }
  }

  getPages(){
    this.pagesService.getPage().subscribe((data:any)=>{
      this.pages = data;
    });
  }

  getPagesById(pageId:number){
    this.pagesService.getPageById(pageId).subscribe((data:any)=>{
      this.page = data;
    });
  }

  updatePage(pageId:number){
    this.pagesService.getPageById(pageId).subscribe((data:any)=>{
      this.page = data;
      this.pageUpdate = pageId;
      this.pageForm.controls['pageName'].setValue(data[0].pageName);
    });
  }

  deletePage(pageId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.pagesService.deletePage(pageId).subscribe(()=>{
        this.getPages();
      });
    }
    else{
      this.getPages();
    }
  }

  onFormSubmit(){
    const pageData = this.pageForm.value;
    this.addPage(pageData);
  }

  resetForm(){
    this.pageForm.reset();
  }

  setHeading(){
    this.pageUpdate = null;
    this.resetForm();
  }

}
