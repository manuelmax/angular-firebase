import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Prueba} from "../models/prueba.model";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private firestore:AngularFirestore) {  }

  set_prueba(prueba:Prueba):Promise<any> {
    /* Necesita un natural object */
    let obj = JSON.parse(JSON.stringify(prueba));
    return this.firestore.collection('pruebas').add(obj);
  }

  get_pruebas():Observable<any>{
    //return this.firestore.collection('pruebas').snapshotChanges();
    return this.firestore.collection('pruebas', ref => ref.orderBy('nombre', 'desc')).snapshotChanges();
  }
}
