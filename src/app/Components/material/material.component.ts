import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/Models/material';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { DesignService } from 'src/app/Models/design-service';
import { MaterialService } from 'src/app/Services/MaterialService/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  materials: Material[]=[];
  materialForm: any;
  material: Material;
  formHeading: string;
  materialUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private materialService: MaterialService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.materialForm = this.formBuilder.group({
      materialName:[0, Validators.required]
    });
    this.getMaterials();
  }

  addMaterial(material: Material){
    if(material!=undefined && material!=null){
      if(this.materialUpdate==null){
        this.materialService.addMaterial(material).subscribe(()=>{
          this.setHeading();
          this.getMaterials();
          alert("Record Added Successfully");
        });
      }
      else{
        material.materialId = this.materialUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.materialService.updateMaterial(this.materialUpdate, material).subscribe(()=>{
          this.getMaterials();
          this.setHeading();
        });
      }
      else{
        this.getMaterials();
      }
      }
    }
  }

  getMaterials(){
    this.materialService.getMaterial().subscribe((data:any)=>{
      this.materials = data;
    });
  }

  getMaterialById(materialId:number){
    this.materialService.getMaterialById(materialId).subscribe((data:any)=>{
      this.material = data;
    });
  }

  updateMaterial(materialId:number){
    this.materialService.getMaterialById(materialId).subscribe((data:any)=>{
      this.material = data;
      this.materialUpdate = materialId;
      this.materialForm.controls['materialName'].setValue(data[0].materialName);
    });
  }

  deleteMaterial(materialId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.materialService.deleteMaterial(materialId).subscribe(()=>{
        this.getMaterials();
      });
    }
    else{
      this.getMaterials();
    }
  }

  onFormSubmit(){
    const materialData = this.materialForm.value;
    this.addMaterial(materialData);
  }

  resetForm(){
    this.materialForm.reset();
  }

  setHeading(){
    this.materialUpdate = null;
    this.resetForm();
  }
}
