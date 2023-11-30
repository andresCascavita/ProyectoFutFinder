import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebasePartidosService } from 'src/app/services/firebase-partidos.service';
import { ToastrService } from 'ngx-toastr';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-agregar-partido',
  templateUrl: './agregar-partido.component.html',
  styleUrls: ['./agregar-partido.component.css']
})
export class AgregarPartidoComponent implements OnInit {
  cretePartido: FormGroup;
  submitted = false;

  dataUser: any; // Para almacenar la información del usuario

  constructor(
    private fb: FormBuilder,
    private FirebasePartidosService: FirebasePartidosService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private firestore: Firestore,
    private cookies: CookieService
  ) {
    this.cretePartido = this.fb.group({
      nombreCancha: ['', Validators.required],
      Direccion: ['', Validators.required],
      Creador: ['', Validators.required], // Deja este campo vacío inicialmente
      Telefono: ['', Validators.required],
      Posicion: ['', Validators.required],
      Fecha: ['', Validators.required],
      Hora: ['', Validators.required],
      Observaciones: ['', Validators.required]
    });
  }

  async ngOnInit() {
    const userDocId = this.cookies.get('userDocId');
    
    if (userDocId) {
      try {
        const userRef = doc(this.firestore, `usuarios/${userDocId}`);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          this.dataUser = userDoc.data();
          this.cretePartido.get('Creador')?.setValue(this.dataUser.email);
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
      this.toastr.success('El partido fue registrado con éxito', 'Partido Registrado')
      this.router.navigate(['/listaDePartidos']);
    });
  }
  
}

