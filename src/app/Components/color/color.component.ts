import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/Models/color';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { DesignService } from 'src/app/Models/design-service';
import { ColorService } from 'src/app/Services/ColorService/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[]=[];
  colorForm: any;
  color: Color;
  formHeading: string;
  colorUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private colorService: ColorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.colorForm = this.formBuilder.group({
      colorName:['', Validators.required]
    });
    this.getColors();
  }

  addColor(color: Color){
    if(color!=undefined && color!=null){
      if(this.colorUpdate==null){
        this.colorService.addColor(color).subscribe(()=>{
          this.setHeading();
          this.getColors();
          alert("Record Added Successfully");
        });
      }
      else{
        color.colorId = this.colorUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.colorService.updateColor(this.colorUpdate, color).subscribe(()=>{
          this.getColors();
          this.setHeading();
        });
      }
      else{
        this.getColors();
      }
      }
    }
  }

  getColors(){
    this.colorService.getColor().subscribe((data:any)=>{
      this.colors = data;
    });
  }

  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe((data:any)=>{
      this.color = data;
    });
  }

  updateColor(colorId:number){
    this.colorService.getColorById(colorId).subscribe((data:any)=>{
      this.color = data;
      this.colorUpdate = colorId;
      this.colorForm.controls['colorName'].setValue(data[0].colorName);
    });
  }

  deleteColor(colorId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.colorService.deleteColor(colorId).subscribe(()=>{
        this.getColors();
      });
    }
    else{
      this.getColors();
    }
  }

  onFormSubmit(){
    const colorData = this.colorForm.value;
    this.addColor(colorData);
  }

  resetForm(){
    this.colorForm.reset();
  }

  setHeading(){
    this.colorUpdate = null;
    this.resetForm();
  }
}
