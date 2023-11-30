import { Component, OnInit } from '@angular/core';
import { deleteDoc, collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { } from '@angular/fire/firestore'
import { FirebasePartidosService } from 'src/app/services/firebase-partidos.service';
import { __values } from 'tslib';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-de-partidos',
  templateUrl: './lista-de-partidos.component.html',
  styleUrls: ['./lista-de-partidos.component.css']
})
export class ListaDePartidosComponent implements OnInit {
  place: any[] = [];
  enviarCheck = new FormGroup({
    isChecked: new FormControl(false),
  });
  dataUser: any;

  constructor(
    public firebasePartidosService: FirebasePartidosService,
    private firestore: Firestore,
    private router: Router,
    private cookies: CookieService
  ) {

  }

  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      console.log('Enviado');
    } else {
      console.log('No enviado');
    }
  }

  submitConfirmar() {
    const isCheckedControl = this.enviarCheck.get('isChecked');

    if (isCheckedControl) {
      const isChecked = isCheckedControl.value;
      console.log('Valor de la casilla de verificación al confirmar:', isChecked);
    } else {
      console.error('Error: isCheckedControl es nulo.');
    }
  }

  submitCrear() { }

  async ngOnInit() {
    this.firebasePartidosService.getPartidos().subscribe(data => {
      this.place = data
    })
    const userDocId = this.cookies.get('userDocId');

    if (userDocId) {
      try {
        const userRef = doc(this.firestore, `usuarios/${userDocId}`);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          this.dataUser = userDoc.data();
          console.log("Información del Usuario de Firestore:", this.dataUser);
        } else {
          console.log("No se encontró un usuario con ese ID de documento.");
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        this.router.navigate(['/login']);
      }
    } else {
      console.log("No hay ID de documento en la cookie.");
      this.router.navigate(['/login']);
    }
  }

  async asistir(partido: any) {
    console.log(partido.Creador + ' ' + this.dataUser.email)

    const templateParamsCreador = {
      to_name: partido.Creador,
      from_name: this.dataUser.email,
      to_email: partido.Creador,
      message: `${this.dataUser.email} se ha unido a tu partido en ${partido.nombreCancha}.`
    };

    const templateParamsUsuario = {
      to_name: this.dataUser.email,
      from_email: this.dataUser.email,
      from_name: 'Equipo FutFinder',
      to_email: this.dataUser.email,
      message: `Tu asistencia al partido en ${partido.nombreCancha} ha sido confirmada correctamente.`
    };

    try {
      await emailjs.send('service_ipunf8r', 'template_2le8nf9', templateParamsCreador, 'byp3KnTYpnsA0F986');
      await emailjs.send('service_ipunf8r', 'template_2le8nf9', templateParamsUsuario, 'byp3KnTYpnsA0F986');

      await this.eliminarPartido(partido.id);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Asistencia confirmada',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al confirmar la asistencia.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  async eliminarPartido(idPartido: string) {
    try {
      const partidoRef = doc(this.firestore, `cretePartidos/${idPartido}`);
      await deleteDoc(partidoRef);
    } catch (error) {
    }
  }
}
