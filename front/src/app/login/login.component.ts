import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import User from '../User';
import { UserService } from './../user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private appComp: AppComponent) { }

  user = new User();
  currentUser;

  users: User[];

  login(user) {

    const found = this.users.find(x => x.codigo === user.codigo && x.senha === user.senha);
    if ( found !== undefined) {
      this.appComp.setLoggedUser(found);

      const timerInterval = 0;
      Swal.fire({
                  title: `Bem vindo(a) ${found.nome}!`,
                  html: '',
                  timer: 1500,
                  timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
  },
  onClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  if (
    result.dismiss === Swal.DismissReason.timer
  ) {
    console.log('I was closed by the timer');
  }
});

      localStorage.setItem('currentUser', JSON.stringify(found));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Código ou senha incorretos!'
      });
    }

  }

  ngOnInit() {
      this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }

}
