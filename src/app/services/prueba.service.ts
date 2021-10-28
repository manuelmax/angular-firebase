import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Prueba} from "../models/prueba.model";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private firestore:AngularFirestore) {  }

  set_prueba(data:Prueba):Promise<any> {
    /* Necesita un natural object */
    let obj = JSON.parse(JSON.stringify(data));
    return this.firestore.collection('pruebas').add(obj);
  }

  get_prueba(id:string): Observable<any> {
    return this.firestore.collection('pruebas').doc(id).snapshotChanges();
  }

  get_pruebas():Observable<any>{
    //return this.firestore.collection('pruebas').snapshotChanges();
    return this.firestore.collection('pruebas', ref => ref.orderBy('nombre', 'desc')).snapshotChanges();
  }

  del_prueba(id:string): Promise<any> {
    return this.firestore.collection('pruebas').doc(id).delete();
  }

  update_prueba(id:string, data:Prueba): Promise<any> {
    let obj = JSON.parse(JSON.stringify(data));
    return this.firestore.collection('pruebas').doc(id).update(obj);
  }
}
