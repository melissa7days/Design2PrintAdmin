import { Component, OnInit } from '@angular/core';
import { Finishing } from 'src/app/Models/finishing';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FinishingService } from 'src/app/Services/FinishingService/finishing.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-finishing',
  templateUrl: './finishing.component.html',
  styleUrls: ['./finishing.component.css']
})
export class FinishingComponent implements OnInit {

  finishings: Finishing[]=[];
  finishingForm: any;
  finishing: Finishing;
  formHeading: string;
  finishingUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private finishingService: FinishingService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.finishingForm = this.formBuilder.group({
      finishingName:['', Validators.required]
    });
    this.getFinishings();
  }

  addFinishing(finishing: Finishing){
    if(finishing!=undefined && finishing!=null){
      if(this.finishingUpdate==null){
        this.finishingService.addFinishing(finishing).subscribe(()=>{
          this.setHeading();
          this.getFinishings();
          alert("Record Added Successfully");
        });
      }
      else{
        finishing.finishingId = this.finishingUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.finishingService.updateFinishing(this.finishingUpdate, finishing).subscribe(()=>{
          this.getFinishings();
          this.setHeading();
        });
      }
      else{
        this.getFinishings();
      }
      }
    }
  }

  getFinishings(){
    this.finishingService.getFinishing().subscribe((data:any)=>{
      this.finishings = data;
    });
  }

  getFinishingById(finishingId:number){
    this.finishingService.getFinishingById(finishingId).subscribe((data:any)=>{
      this.finishing = data;
    });
  }

  updateFinishing(finishingId:number){
    this.finishingService.getFinishingById(finishingId).subscribe((data:any)=>{
      this.finishing = data;
      this.finishingUpdate = finishingId;
      this.finishingForm.controls['finishingName'].setValue(data[0].finishingName);
    });
  }

  deleteFinishing(finishingId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.finishingService.deleteFinishing(finishingId).subscribe(()=>{
        this.getFinishings();
      });
    }
    else{
      this.getFinishings();
    }
  }

  onFormSubmit(){
    const finishingData = this.finishingForm.value;
    this.addFinishing(finishingData);
  }

  resetForm(){
    this.finishingForm.reset();
  }

  setHeading(){
    this.finishingUpdate = null;
    this.resetForm();
  }
}
