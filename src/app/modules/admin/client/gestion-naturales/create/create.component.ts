import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'app/services/clienteService';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


 
  tipoDocumento!: String;
  numeroDocumento!: string;
  name!: String;
  lastname!: String;
  genero!: String;
  fechaNacimiento!: String;
  direction!: String;
  rol!: String;
  estado!: String;
  isSaved: boolean | null = null;
  errorMessage: string | null = null;
    constructor(
      private clienteService: ClienteService,
      private router: Router
    ) { }
  
    ngOnInit(): void {
    }
  
    onCreate(): void {
      if (!this.validateForm()) {
        return;
      }
  
      const cliente = new Cliente(this.tipoDocumento, this.numeroDocumento, this.name, this.lastname, this.genero, this.fechaNacimiento, this.direction, this.rol, this.estado);
      this.clienteService.create(cliente).subscribe(
        
        data => {
          this.isSaved = true;
          this.errorMessage = null;
          // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
          this.router.navigate(['']);
        },
        err => {
          this.isSaved = false;
          this.errorMessage = 'Error al guardar el usuario. Por favor, inténtalo nuevamente.';
        }
      );
    }
  
    validateForm(): boolean {
      if (!this.tipoDocumento || !this.numeroDocumento || !this.name || !this.lastname ||
          !this.genero || !this.fechaNacimiento || !this.direction || !this.rol || !this.estado) {
        this.errorMessage = 'Por favor, completa todos los campos.';
        return false;
      }
  
      // Validar el formato de los campos según tus requisitos
      if (!/^[0-9]{1,10}$/.test(this.numeroDocumento)) {
        this.errorMessage = 'El número de documento debe contener solo números y tener un máximo de 10 caracteres.';
        return false;
      }
  
      // Si todas las validaciones pasan, se considera el formulario válido
      this.errorMessage = null;
      return true;
    }
}
