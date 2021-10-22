import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {PruebaService} from "../../services/prueba.service";

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  pruebas: any[] = [];
  loading = true;

  //items: Observable<any[]>; //probar la conexion
  //constructor(firestore:AngularFirestore) {
  constructor(firestore:AngularFirestore, private _prueba_service: PruebaService) {
    //this.items = firestore.collection('pruebas').valueChanges(); //probar el firebase conexion
  }

  ngOnInit(): void {
    setTimeout( () => { this.get_pruebas(); this.loading = false; }, 2000 ); //spiner hasta que lea la data
  }

  get_pruebas(){
    this._prueba_service.get_pruebas().subscribe(data=>{
      console.log(data);
      data.forEach( (item:any)=>{
        this.pruebas.push( {id:item.payload.doc.id, ...item.payload.doc.data() });
      });
    });
    console.log(this.pruebas);
  }

}
