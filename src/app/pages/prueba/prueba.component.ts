import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//models
import {Prueba} from "../../models/prueba.model";
import {PruebaService} from "../../services/prueba.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  formulario: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _prueba_service: PruebaService, private router:Router, private toastr: ToastrService ) {
    this.formulario = this.fb.group({
      code: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      valor_min: ['', [Validators.required, Validators.min(0)]],
      valor_max: ['', [Validators.required,Validators.max(100)]]
    })
  }

  ngOnInit(): void {
  }

  new_prueba(){
    console.log(this.formulario);
    this.submitted = true;
    //if(this.formulario.valid){
    //  console.log('formulario valid!!!');
    //}
    if(this.formulario.invalid){
      return;
    }
    const prueba =  new Prueba(
     this.formulario.value.code,
      this.formulario.value.nombre,
      this.formulario.value.descripcion,
      this.formulario.value.valor_min,
      this.formulario.value.valor_max
    )
    console.log(prueba);
    this._prueba_service.set_prueba(prueba).then( ()=>{
      console.log('prueba insertada...');
      this.toastr.success('Prueba insertada con éxito','Prueba registrada', {positionClass:'toast-bottom-right'});
      this.router.navigate(['/pruebas']);
    }).catch(error =>{
      console.log(error);
    })
  }

}
