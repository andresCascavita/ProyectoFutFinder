import { Component, OnInit } from '@angular/core';
import { collection,  Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import {  } from '@angular/fire/firestore'
import { FirebasePartidosService } from 'src/app/services/firebase-partidos.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-lista-de-partidos',
  templateUrl: './lista-de-partidos.component.html',
  styleUrls: ['./lista-de-partidos.component.css']
})
export class ListaDePartidosComponent implements OnInit {
  place: any[]=[];
  enviarCheck = new FormGroup({
    isChecked: new FormControl(false),
  });
  

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
    
      // Lógica adicional para el botón "Confirmar" aquí
    } else {
      console.error('Error: isCheckedControl es nulo.');
    }
  }

  submitCrear() {}

  constructor(
    public firebasePartidosService: FirebasePartidosService,
    private firestore: Firestore
  ) {
    
  }

  
  ngOnInit(): void {
    this.firebasePartidosService.getPartidos().subscribe(data =>{
      this.place = data
     // this.firebasePartidosService = firebasePartidosService;
     console.log(data)
      
    })
  }
  
}
