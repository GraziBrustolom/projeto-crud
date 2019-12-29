
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { WorkLogEditComponent } from './../work-log-edit/work-log-edit.component';
import { WorkLogService } from '../work-log.service';
import WorkLog from '../WorkLog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-work-log-get',
  templateUrl: './work-log-get.component.html',
  styleUrls: ['./work-log-get.component.css']
})
export class WorkLogGetComponent implements OnInit {

  worklogs: WorkLog[];
  loggedUser;
  constructor(private worklogService: WorkLogService, public dialog: MatDialog) { }

  displayedColumns = ['Nome', 'Código', 'Empresa', 'WorkLog', 'Actions'];
  step = 1;

  setStep(val) {
    this.step = val;
  }

  refreshWorkLogs() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.worklogService
    .getWorkLogs()
    .subscribe((data: WorkLog[]) => {
      if (this.loggedUser.cargo === 'Funcionário') {
        this.worklogs = data.filter( x => x.codigo === this.loggedUser.codigo);
      } else {
        this.worklogs = data;
      }
    });
  }

  editWorkLog(worklog) {

    const dialogRef = this.dialog.open(WorkLogEditComponent, {
      data: worklog,
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        const newWorkLog = new WorkLog();
        newWorkLog.nome = result.nome;
        newWorkLog.codigo = result.codigo;
        newWorkLog.empresa = result.empresa;
        newWorkLog.tempo = result.tempo;
        this.worklogService.editWorkLog(worklog._id, newWorkLog).subscribe((data: WorkLog) => {
          console.log('Editado.', data);
          this.refreshWorkLogs();
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

  deleteWorkLog(worklog) {

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

        this.worklogService.deleteWorkLog(worklog._id).subscribe((data: WorkLog) => {
          console.log('Removido.', data);
          this.refreshWorkLogs();
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
   this.refreshWorkLogs();
  }
}
