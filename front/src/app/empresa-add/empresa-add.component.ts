import { EmpresaGetComponent } from './../empresa-get/empresa-get.component';
import { EmpresaService } from './../empresa.service';
import { Component, OnInit } from '@angular/core';
import Empresa from '../Empresa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css']
})
export class EmpresaAddComponent implements OnInit {

  constructor(private empresaService: EmpresaService, private empresaGetComponent: EmpresaGetComponent) { }

  empresa = new Empresa();

  addEmpresa() {
    this.empresaService.addEmpresa(this.empresa.nome, this.empresa.codigo).subscribe((data: Empresa) => {
      console.log('Inserido.', data);
      this.empresaGetComponent.refreshEmpresas();
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
    this.empresa.nome = '';
    this.empresa.codigo = '';
  }

}
