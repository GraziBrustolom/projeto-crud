import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import User from '../User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  user = new User();

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user.nome = this.data.nome;
    this.user.cargo = this.data.cargo;
    this.user.codigo = this.data.codigo;
    this.user.senha = this.data.senha;
  }

}
