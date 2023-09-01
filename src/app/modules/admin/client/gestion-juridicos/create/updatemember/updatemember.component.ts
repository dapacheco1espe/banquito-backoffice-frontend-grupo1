import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/clienteService';
import Swal from 'sweetalert2';
import { Cliente } from '../../../gestion-naturales/model/cliente';

@Component({
  selector: 'app-updatemember',
  templateUrl: './updatemember.component.html',
  styleUrls: ['./updatemember.component.scss']
})
export class UpdatememberComponent implements OnInit {

  
  groupName:String =this.activatedRoute.snapshot.params['groupName'];
  uniqueKey:String = this.activatedRoute.snapshot.params['uniqueKey'];
  cliente: Cliente ;
  typeDocumentId!: String;
  documentId!: String;
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    this.clienteService.detail(this.typeDocumentId, this.documentId).subscribe(
      (data) => {
        this.cliente = data;
        //(this.cliente);
      },
      (err) => {
        // Mostrar mensaje de error con SweetAlert
      }
    );
  }
  buscarCliente(): void {
    //(this.activatedRoute.snapshot.params['uniqueKey'])
    this.clienteService.detail(this.typeDocumentId, this.documentId).subscribe(
      (data) => {
        this.cliente = data;
        this.uniqueKey = this.cliente.uniqueKey;
        //(this.uniqueKey);
  
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Cliente encontrado Asigne Empresa',
          text: 'La información del cliente ha sido cargada correctamente.',
          confirmButtonText: 'Aceptar',
          
        }).then(() => {
        
          // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
          this.router.navigate(['/admin/gestion-juridicos/createMember/'+this.groupName+'/'+this.uniqueKey]);
        });
      },
      (err) => {
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El cliente no pudo ser encontrado.',
          confirmButtonText: 'Aceptar',
        });
  
        this.router.navigate(['/gestion/gestion-naturales']);
      }
    );
  }

}
