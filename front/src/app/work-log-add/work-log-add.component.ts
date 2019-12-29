import { WorkLogGetComponent } from './../work-log-get/work-log-get.component';
import {timer, interval} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WorkLogService } from '../work-log.service';
import { EmpresaService } from './../empresa.service';
import WorkLog from '../WorkLog';
import Empresa from '../Empresa';
import Swal from 'sweetalert2';
import DateFormat from 'dateformat';

@Component({
  selector: 'app-work-log-add',
  templateUrl: './work-log-add.component.html',
  styleUrls: ['./work-log-add.component.css']
})
export class WorkLogAddComponent implements OnInit {

  constructor(private worklogService: WorkLogService,
              private empresaService: EmpresaService,
              private workLogGetComponent: WorkLogGetComponent) { }
  worklog = new WorkLog();
  loggedUser;
  empresas: Empresa[];
  empresa = new Empresa();
  timer;
  seconds;
  minutes;
  hours;
  timerCount;



  public intervallTimer = interval(1000);
  private subscription;


  addWorkLog() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.worklog.nome = this.loggedUser.nome;
    this.worklog.codigo = this.loggedUser.codigo;
    this.worklogService.addWorkLog(this.worklog.nome, this.worklog.codigo, this.worklog.empresa, this.worklog.tempo)
    .subscribe((data: WorkLog) => {
      console.log('Inserido.', data);
      this.workLogGetComponent.refreshWorkLogs();
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

    this.workLogGetComponent.refreshWorkLogs();
  }

  manageCounter(val) {

    if (val) {
      this.subscription = this.intervallTimer.subscribe((n) => {

      this.timer = new Date();
      this.timer.setHours(0);
      this.timer.setMinutes(0);
      this.timer.setSeconds(n);

      const date = DateFormat(this.timer);
      console.log(date);
      this.worklog.tempo = date.toString();

      });

    } else {
      this.timer = new Date();
      this.subscription.unsubscribe();
    }
  }


  ngOnInit() {
    this.worklog.nome = '';
    this.worklog.codigo = '';
    this.worklog.empresa = '';
    this.worklog.tempo = '';

    this.empresaService
    .getEmpresas()
    .subscribe((data: Empresa[]) => {
      this.empresas = data;
    });
  }

}
