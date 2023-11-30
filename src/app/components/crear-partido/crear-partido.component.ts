import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { FirebasePartidosService } from 'src/app/services/firebase-partidos.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Firestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-crear-partido',
  templateUrl: './crear-partido.component.html',
  styleUrls: ['./crear-partido.component.css']
})
export class CrearPartidoComponent implements OnInit {

  cretePartido: FormGroup;
  submitted = false;
  dataUser: any;

  constructor
    (private fb: FormBuilder,
      private FirebasePartidosService: FirebasePartidosService,
      private afAuth: AngularFireAuth,
      private router: Router,
      private firestore: Firestore,
      private cookies: CookieService,
      private toastr: ToastrService
    ) {
    this.cretePartido = this.fb.group({
      nombreCancha: ['', Validators.required],
      Direccion: ['', Validators.required],
      Creador: ['', Validators.required],
      Telefono: ['', Validators.required],
      Posicion: ['', Validators.required],
      Fecha: ['', Validators.required],
      Hora: ['', Validators.required],
      Observaciones: ['', Validators.required]
    })
  }
  async agregarPartido() {
    this.submitted = true;

    if (this.cretePartido.invalid) {
      return;
    }
    const partido: any = {
      nombreCancha: this.cretePartido.value.nombreCancha,
      Direccion: this.cretePartido.value.Direccion,
      Creador: this.cretePartido.value.Creador,
      Telefono: this.cretePartido.value.Telefono,
      Posicion: this.cretePartido.value.Posicion,
      Fecha: this.cretePartido.value.Fecha,
      Hora: this.cretePartido.value.Hora,
      Observaciones: this.cretePartido.value.Observaciones

    }

    this.FirebasePartidosService.addPartido(partido).then(() => {
      this.toastr.success('El partido fue registrado con exito', 'Partido Registrado')
      this.router.navigate(['/listaDePatidos']);
    })
  }

  submit(): void { }
  submitCrear() {

  }

  async ngOnInit() {
    const userDocId = this.cookies.get('userDocId');
    const userRef = doc(this.firestore, `usuarios/${userDocId}`);
    const userDoc = await getDoc(userRef);
    this.dataUser = userDoc.data();
    console.log("Información del Usuario de Firestore:", this.dataUser);
  }
}
