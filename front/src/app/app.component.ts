import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import User from './User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  logged = false;
  loggedUser = new User();
  sensitive = false;

  setLoggedUser(user) {
    this.loggedUser = user;

    if (this.loggedUser.cargo === 'Funcionário') {
      this.sensitive = true;
    }
    this.logged = true;

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.logged = false;
    this.sensitive = false;

    const timerInterval = 0;
    Swal.fire({
                title: 'Bye bye!',
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

  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.loggedUser !== null) {
      this.setLoggedUser(this.loggedUser);
    } else {
      this.logged = false;
    }
  }

}
