import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';

import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { FirebasePartidosService } from 'src/app/services/firebase-partidos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private cookies: CookieService,
    private firestore: Firestore,
    private firebasePartidosService: FirebasePartidosService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  async ngOnInit() {
    const uid = this.cookies.get('uid');
    console.log(uid)
    this.obtenerInformacionUsuario();
  }

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Aquí necesitas buscar el documento en Firestore basado en el email
        const usersRef = collection(this.firestore, 'usuarios');
        const q = query(usersRef, where("email", "==", email));
        return getDocs(q);
      })
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          this.cookies.set('userDocId', userDoc.id);
          this.router.navigate(['/dashboard']);
        } else {
          throw new Error('No se encontró el documento del usuario');
        }
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }


  async obtenerInformacionUsuario() {
    const userDocId = this.cookies.get('userDocId');
    console.log("ID del documento de Firestore obtenido de la cookie:", userDocId);
    if (userDocId) {
      try {
        const userRef = doc(this.firestore, `usuarios/${userDocId}`);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          console.log("Información del Usuario:", userDoc.data());
          return userDoc.data();
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }

}
