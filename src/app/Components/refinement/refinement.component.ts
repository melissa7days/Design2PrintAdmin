import { Component, OnInit } from '@angular/core';
import { Refinement } from 'src/app/Models/refinement';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RefinementService } from 'src/app/Services/RefinementService/refinement.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-refinement',
  templateUrl: './refinement.component.html',
  styleUrls: ['./refinement.component.css']
})
export class RefinementComponent implements OnInit {

  refinements: Refinement[]=[];
  refinementForm: any;
  refinement: Refinement;
  formHeading: string;
  refinementUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private refinementService: RefinementService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refinementForm = this.formBuilder.group({
      refinementName:['', Validators.required]
    });
    this.getRefinements();
  }

  addRefinement(refinement: Refinement){
    if(refinement!=undefined && refinement!=null){
      if(this.refinementUpdate==null){
        this.refinementService.addRefinement(refinement).subscribe(()=>{
          this.setHeading();
          this.getRefinements();
          alert("Refinement Added Successfully");
        });
      }
      else{
        refinement.refinementId = this.refinementUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.refinementService.updateRefinement(this.refinementUpdate, refinement).subscribe(()=>{
          this.getRefinements();
          this.setHeading();
        });
      }
      else{
        this.getRefinements();
      }
      }
    }
  }

  getRefinements(){
    this.refinementService.getRefinement().subscribe((data:any)=>{
      this.refinements = data;
    });
  }

  getRefinementById(refinementId:number){
    this.refinementService.getRefinementById(refinementId).subscribe((data:any)=>{
      this.refinement = data;
    });
  }

  updateRefinement(refinementId:number){
    this.refinementService.getRefinementById(refinementId).subscribe((data:any)=>{
      this.refinement = data;
      this.refinementUpdate = refinementId;
      this.refinementForm.controls['refinementName'].setValue(data[0].refinemtnName);
    });
  }

  deleteRefinement(refinementId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.refinementService.deleteRefinement(refinementId).subscribe(()=>{
        this.getRefinements();
      });
    }
    else{
      this.getRefinements();
    }
  }

  onFormSubmit(){
    const refinementData = this.refinementForm.value;
    this.addRefinement(refinementData);
  }

  resetForm(){
    this.refinementForm.reset();
  }

  setHeading(){
    this.refinementUpdate = null;
    this.resetForm();
  }
}
