import { Component, OnInit } from '@angular/core';
import { PDF } from 'src/app/Models/pdf';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PDFService } from 'src/app/Services/PDFService/pdf.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PDFComponent implements OnInit {

  pdfs: PDF[]=[];
  pdfForm: any;
  pdf: PDF;
  formHeading: string;
  pdfUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private pdfService: PDFService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pdfForm = this.formBuilder.group({
      pdfName:['', Validators.required]
    });
    this.getPDFs();
  }

  addPdf(pdf: PDF){
    if(pdf!=undefined && pdf!=null){
      if(this.pdfUpdate==null){
        this.pdfService.addPDF(pdf).subscribe(()=>{
          this.setHeading();
          this.getPDFs();
          alert("Record Added Successfully");
        });
      }
      else{
        pdf.pDFId = this.pdfUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
        this.pdfService.updatePDF(this.pdfUpdate, pdf).subscribe(()=>{
          this.getPDFs();
          this.setHeading();
        });
      }
      else{
        this.getPDFs();
      }
      }
    }
  }

  getPDFs(){
    this.pdfService.getPDF().subscribe((data:any)=>{
      this.pdfs = data;
    });
  }

  getPDFById(pdfId:number){
    this.pdfService.getPDFById(pdfId).subscribe((data:any)=>{
      this.pdf = data;
    });
  }

  updatePDF(pdfId:number){
    this.pdfService.getPDFById(pdfId).subscribe((data:any)=>{
      this.pdf = data;
      this.pdfUpdate = pdfId;
      this.pdfForm.controls['pdfName'].setValue(data[0].pdfName);
    });
  }

  deletePDF(pdfId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.pdfService.deletePDF(pdfId).subscribe(()=>{
        this.getPDFs();
      });
    }
    else{
      this.getPDFs();
    }
  }

  onFormSubmit(){
    const pdfData = this.pdfForm.value;
    this.addPdf(pdfData);
  }

  resetForm(){
    this.pdfForm.reset();
  }

  setHeading(){
    this.pdfUpdate = null;
    this.resetForm();
  }
}
