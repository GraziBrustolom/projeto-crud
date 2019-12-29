
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserGetComponent } from './../user-get/user-get.component';
import User from '../User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private userService: UserService, private userGetComponent: UserGetComponent) { }

  cargos = ['Gerente', 'Funcionário'];

   user = new User();

  addUser() {

    this.userService.addUser(this.user.nome, this.user.cargo, this.user.codigo, this.user.senha).subscribe(
      (data: any) => {
        console.log('Inserido.', data.user);
        this.userGetComponent.refreshUsers();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Salvo com sucesso.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      (error: any) => {
        console.error('Erro: ', error );
      });
  }

  ngOnInit() {
    this.user.nome = '';
    this.user.cargo = '';
    this.user.codigo = '';
    this.user.senha = '';
  }

}
