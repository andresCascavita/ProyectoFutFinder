import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { CrearPartidoComponent } from '../components/crear-partido/crear-partido.component'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FirebasePartidosService{
  cretePartido: any;

  constructor(private firestore: Firestore,private afAuth: AngularFireAuth) { }

  addPartido(cretePartido: CrearPartidoComponent ){
    const partidos = collection(this.firestore,'cretePartidos')
    return addDoc(partidos,cretePartido);
  }


  async getUid(){
    const user = await this.afAuth.currentUser;
    if(user === null){
      return null;
    }else{
      return user.uid;
    }
  }
  
  getPartidos(): Observable<any[]>{
    const partidos = collection(this.firestore,'cretePartidos')
    return collectionData(partidos,{idField:'id'})
    
  }

}
