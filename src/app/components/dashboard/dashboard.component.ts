import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: Firestore,
    private cookies: CookieService,
    private router: Router
  ) { }

  async ngOnInit() {
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

  logOut() {
    this.afAuth.signOut().then(() => {
      this.cookies.delete('userDocId');
      this.router.navigate(['/login']);
    });
  }

  jugar() {
    this.router.navigate(['/menu']);
  }
}
