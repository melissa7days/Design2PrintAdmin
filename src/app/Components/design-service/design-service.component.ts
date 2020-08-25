import { Component, OnInit } from '@angular/core';
import { DesignService } from 'src/app/Models/design-service';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DesignServiceService } from 'src/app/Services/DesignService/design-service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-design-service',
  templateUrl: './design-service.component.html',
  styleUrls: ['./design-service.component.css']
})
export class DesignServiceComponent implements OnInit {

  designServices: DesignService[]=[];
  designServiceForm: any;
  designService: DesignService;
  formHeading: string;
  designServiceUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private DesignServiceService: DesignServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.designServiceForm = this.formBuilder.group({
      designServiceName:[0, Validators.required]
    });
    this.getDesignServices();
  }

  addDesignService(designService: DesignService){
    if(designService!=undefined && designService!=null){
      if(this.designServiceUpdate==null){
        this.DesignServiceService.addDesignService(designService).subscribe(()=>{
          this.setHeading();
          this.getDesignServices();
          alert("Design Service Added Successfully");
        });
      }
      else{
        designService.designServiceId = this.designServiceUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.DesignServiceService.updateDesignService(this.designServiceUpdate, designService).subscribe(()=>{
          this.getDesignServices();
          this.setHeading();
        });
      }
      else{
        this.getDesignServices();
      }
      }
    }
  }

  getDesignServices(){
    this.DesignServiceService.getDesignService().subscribe((data:any)=>{
      this.designServices = data;
    });
  }

  getDesignServiceById(designServiceId:number){
    this.DesignServiceService.getDesignServiceById(designServiceId).subscribe((data:any)=>{
      this.designService = data;
    });
  }

  updateDesignService(designServiceId:number){
    this.DesignServiceService.getDesignServiceById(designServiceId).subscribe((data:any)=>{
      this.designService = data;
      this.designServiceUpdate = designServiceId;
      this.designServiceForm.controls['designServiceName'].setValue(data[0].designServiceName);
    });
  }

  deleteDesignService(designServiceId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.DesignServiceService.deleteDesignService(designServiceId).subscribe(()=>{
        this.getDesignServices();
      });
    }
    else{
      this.getDesignServices();
    }
  }

  onFormSubmit(){
    const designServiceData = this.designServiceForm.value;
    this.addDesignService(designServiceData);
  }

  resetForm(){
    this.designServiceForm.reset();
  }

  setHeading(){
    this.designServiceUpdate = null;
    this.resetForm();
  }

}
