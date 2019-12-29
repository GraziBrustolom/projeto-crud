import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmpresaService } from './../empresa.service';
import WorkLog from '../WorkLog';
import Empresa from '../Empresa';

@Component({
  selector: 'app-work-log-edit',
  templateUrl: './work-log-edit.component.html',
  styleUrls: ['./work-log-edit.component.css']
})
export class WorkLogEditComponent implements OnInit {

  constructor(public empresaService: EmpresaService, public dialogRef: MatDialogRef<WorkLogEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  workLog = new WorkLog();

  empresas: Empresa[];

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.workLog.nome = this.data.nome;
    this.workLog.codigo = this.data.codigo;
    this.workLog.empresa = this.data.empresa;
    this.workLog.tempo = this.data.tempo;


    this.empresaService
    .getEmpresas()
    .subscribe((data: Empresa[]) => {
      this.empresas = data;
    });

  }




}
