import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//models
import {Prueba} from "../../models/prueba.model";
import {PruebaService} from "../../services/prueba.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  formulario: FormGroup;
  submitted = false;
  id: string | null; // editar

  constructor(private fb: FormBuilder, private _prueba_service: PruebaService, private router:Router, private aRoute: ActivatedRoute,
              private toastr: ToastrService ) {

    this.formulario = this.fb.group({
      code: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      valor_min: ['', [Validators.required, Validators.min(0)]],
      valor_max: ['', [Validators.required,Validators.max(100)]]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id'); // editar, se obtiene id de la url
  }

  ngOnInit(): void {
    this.edit_prueba();
  }

  balancer(){
    //para controlar el estado del formulario en consola del browser
    console.log(this.formulario);
    this.submitted = true;
    //if(this.formulario.valid){
    //  console.log('formulario valid!!!');
    //}
    if(this.formulario.invalid){
      return;
    }
    if(this.id === null){
      this.add_prueba();
    }else{
      this.update_prueba();
    }

  }

  add_prueba(){
    const prueba =  new Prueba(
     this.formulario.value.code,
      this.formulario.value.nombre,
      this.formulario.value.descripcion,
      this.formulario.value.valor_min,
      this.formulario.value.valor_max
    );
    console.log(prueba);
    this._prueba_service.set_prueba(prueba).then( ()=>{
      console.log('prueba insertada...');
      this.toastr.success('Prueba insertada con éxito','Prueba registrada', {positionClass:'toast-bottom-right'});
      this.router.navigate(['/pruebas']);
    }).catch(error =>{
      console.log(error);
    });
  }

  update_prueba(){
    console.log('update prueba...');
    if(this.id !== null){
       const prueba =  new Prueba(
       this.formulario.value.code,
        this.formulario.value.nombre,
        this.formulario.value.descripcion,
        this.formulario.value.valor_min,
        this.formulario.value.valor_max
      );
      this._prueba_service.update_prueba(this.id, prueba).then( ()=>{
        this.toastr.info('Actualizada con éxito', 'Prueba actualizada');
      });
    }
  }

  edit_prueba(){
    console.log('editar prueba...');
    if(this.id !== null){
      // si es Observale hay que subscribirse
      this._prueba_service.get_prueba(this.id).subscribe( data =>{
        let prueba =  new Prueba(
         data.payload.data()['code'],
          data.payload.data()['nombre'],
          data.payload.data()['descripcion'],
          data.payload.data()['valor_min'],
          data.payload.data()['valor_max']
        );
        this.formulario.setValue(prueba);
      } );
    }
  }



}
