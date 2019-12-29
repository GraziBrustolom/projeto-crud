import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Empresa from '../Empresa';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmpresaEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  empresa = new Empresa();

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.empresa.nome = this.data.nome;
    this.empresa.codigo = this.data.codigo;
  }
}
