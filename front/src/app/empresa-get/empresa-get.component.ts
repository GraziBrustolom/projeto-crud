import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../empresa.service';
import { EmpresaEditComponent } from './../empresa-edit/empresa-edit.component';
import Empresa from '../Empresa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-get',
  templateUrl: './empresa-get.component.html',
  styleUrls: ['./empresa-get.component.css']
})
export class EmpresaGetComponent implements OnInit {

  empresas: Empresa[];

  constructor(private empresaService: EmpresaService, public dialog: MatDialog) { }

  displayedColumns = ['Nome', 'Código', 'Actions'];

  step = 1;

  setStep(val) {
    this.step = val;
  }


  refreshEmpresas() {
    this.empresaService
    .getEmpresas()
    .subscribe((data: Empresa[]) => {
      this.empresas = data;
    });
  }


  editEmpresa(empresa) {

    const dialogRef = this.dialog.open(EmpresaEditComponent, {
      data: empresa,
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        const newEmpresa = new Empresa();
        newEmpresa.nome = result.nome;
        newEmpresa.codigo = result.codigo;
        this.empresaService.editEmpresa(empresa._id, newEmpresa).subscribe((data: Empresa) => {
          console.log('Editado.', data);
          this.refreshEmpresas();
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

  deleteEmpresa(empresa) {

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
        this.empresaService.deleteEmpresa(empresa._id).subscribe((data: Empresa) => {
          console.log('Removido.', data);
          this.refreshEmpresas();
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
    this.refreshEmpresas();
  }


}
