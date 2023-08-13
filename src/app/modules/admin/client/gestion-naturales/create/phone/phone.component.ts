import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/clienteService';
import { Cliente } from '../../model/cliente';
import Swal from 'sweetalert2';
import { ClientePhone } from '../../model/clientePhone';


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  typeDocumentId: string = this.activatedRoute.snapshot.params['typeDocumentId'];
  documentId: string = this.activatedRoute.snapshot.params['documentId'];
  isSaved: boolean | null = null;
  phoneArray: ClientePhone[]=[];
  phoneType!: string;
  phoneNumber!: string;


  errorMessage: string | null = null;
  cliente!: Cliente;
    constructor(

      private clienteService: ClienteService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

     // this.getCliente();
    }

    onUpdate(): void {
        const phoneObject: ClientePhone=new ClientePhone(this.phoneType,this.phoneNumber,true);
        this.phoneArray.push(phoneObject);
        this.clienteService.createPhone(this.typeDocumentId,this.documentId, this.phoneArray).subscribe(
        (data) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'La informacion telefonica ha sido guardada correctamente.',
            icon: 'success',

          }).then(() => {

            this.isSaved = true;
            this.errorMessage = null;
            // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
            this.router.navigate(['/gestion/gestion-naturales/createAddress/'+this.typeDocumentId+'/'+this.documentId])
          });
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al guardar la informacion telefonica. Por favor, inténtalo nuevamente.',
            icon: 'error'
          });

          this.isSaved = false;
          this.errorMessage = 'Error al la informacion telefonica. Por favor, inténtalo nuevamente.';
        }
      );
    }
    // getCliente(): void {
    //   console.log(this.activatedRoute.snapshot);
    //   const typeDocumentId = this.activatedRoute.snapshot.params['typeDocumentId'];
    //   const documentId = this.activatedRoute.snapshot.params['documentId'];
    //   console.log(this.typeDocumentId, this.documentId);
    //   this.clienteService.detail(typeDocumentId, documentId).subscribe(
    //     (data) => {
    //
    //       this.cliente = data;
    //       console.log(this.cliente);
    //     },
    //     (err) => {
    //       this.router.navigate(['']);
    //     }
    //   );
    //}

    addAnotherPhone(): void {
      const phoneObject: ClientePhone = new ClientePhone(this.phoneType, this.phoneNumber, true);
      this.phoneArray.push(phoneObject);
      this.phoneType = ''; // Limpiar el tipo de teléfono después de agregar
      this.phoneNumber = ''; // Limpiar el número de teléfono después de agregar

      Swal.fire({
        title: '¡Éxito!',
        text: 'Teléfono agregado correctamente.',
        icon: 'success'
      });
    }



}
