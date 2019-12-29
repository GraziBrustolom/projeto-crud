
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { UserEditComponent } from './../user-edit/user-edit.component';
import { UserService } from '../user.service';
import User from '../User';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  displayedColumns = ['Nome', 'Cargo', 'Código', 'Senha', 'Actions'];
  step = 1;

  setStep(val) {
    this.step = val;
  }


  refreshUsers() {
    this.userService
    .getUsers()
    .subscribe((data: User[]) => {
      this.users = data;
    },
    (error: any) => {
      console.error('Erro: ', error );
    });
  }

  editUser(user) {

    const dialogRef = this.dialog.open(UserEditComponent, {
      data: user,
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        const newUser = new User();
        newUser.nome = result.nome;
        newUser.cargo = result.cargo;
        newUser.codigo = result.codigo;
        newUser.senha = result.senha;
        this.userService.editUser(user._id, newUser).subscribe((data: User) => {
          console.log('Editado.', data);
          this.refreshUsers();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Editado com sucesso.',
            showConfirmButton: false,
            timer: 2000
          });
        },
        (error: any) => {
          console.error('Erro: ', error );
        });
      }
    });

  }

  deleteUser(user) {

    Swal.fire({
      title: 'Deletar',
      text: 'Tem certeza que deseja remover?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {

        this.userService.deleteUser(user._id).subscribe((data: User) => {
          console.log('Removido.', data);
          this.refreshUsers();
          Swal.fire(
            'Deletado',
            'Registro deletado com sucesso.',
            'success'
          );
        },
        (error: any) => {
          console.error('Erro: ', error );
        });

      }
    });

  }

  ngOnInit() {
    this.refreshUsers();
  }

}
