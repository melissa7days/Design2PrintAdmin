import { Component, OnInit } from '@angular/core';
import { FinishedFormat } from 'src/app/Models/finished-format';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FinishedFormatService } from 'src/app/Services/FinishedFormatService/finished-format.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-finished-format',
  templateUrl: './finished-format.component.html',
  styleUrls: ['./finished-format.component.css']
})
export class FinishedFormatComponent implements OnInit {

  finishedFormats: FinishedFormat[]=[];
  finishedFormatForm: any;
  finishedFormat: FinishedFormat;
  formHeading: string;
  finishedFormatUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private finishedFormatService: FinishedFormatService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.finishedFormatForm = this.formBuilder.group({
      finishedFormatName:[0, Validators.required]
    });
    this.getFinishedFormats();
  }

  addFinishedFormat(finishedFormat: FinishedFormat){
    if(finishedFormat!=undefined && finishedFormat!=null){
      if(this.finishedFormatUpdate==null){
        this.finishedFormatService.addFinishedFormat(finishedFormat).subscribe(()=>{
          this.setHeading();
          this.getFinishedFormats();
          alert("Record Added Successfully");
        });
      }
      else{
        finishedFormat.finishedFormatId = this.finishedFormatUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.finishedFormatService.updateFinishedFormat(this.finishedFormatUpdate, finishedFormat).subscribe(()=>{
          this.getFinishedFormats();
          this.setHeading();
        });
      }
      else{
        this.getFinishedFormats();
      }
      }
    }
  }

  getFinishedFormats(){
    this.finishedFormatService.getFinishedFormat().subscribe((data:any)=>{
      this.finishedFormats = data;
    });
  }

  getFinsihedFormatById(finishedFormatId:number){
    this.finishedFormatService.getFinishedFormatById(finishedFormatId).subscribe((data:any)=>{
      this.finishedFormat = data;
    });
  }

  updateFinishedFormat(finishedFormatId:number){
    this.finishedFormatService.getFinishedFormatById(finishedFormatId).subscribe((data:any)=>{
      this.finishedFormat = data;
      this.finishedFormatUpdate = finishedFormatId;
      this.finishedFormatForm.controls['finishedFormatName'].setValue(data[0].finishedFormatName);
    });
  }

  deleteFinishedFormat(finishedFormatId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.finishedFormatService.deleteFinishedFormat(finishedFormatId).subscribe(()=>{
        this.getFinishedFormats();
      });
    }
    else{
      this.getFinishedFormats();
    }
  }

  onFormSubmit(){
    const finishedFormatData = this.finishedFormatForm.value;
    this.addFinishedFormat(finishedFormatData);
  }

  resetForm(){
    this.finishedFormatForm.reset();
  }

  setHeading(){
    this.finishedFormatUpdate = null;
    this.resetForm();
  }

}
