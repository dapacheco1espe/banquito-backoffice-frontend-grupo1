import { Component, OnInit } from '@angular/core';
import { ClienteAddress } from '../../model/clienteAddress';
import Swal from 'sweetalert2';
import { Cliente } from '../../model/cliente';
import { ClienteService } from 'app/services/clienteService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  typeDocumentId: string = this.activatedRoute.snapshot.params['typeDocumentId'];
  documentId: string = this.activatedRoute.snapshot.params['documentId'];
  isSaved: boolean | null = null;
  addressArray: ClienteAddress[]=[];
  locationId!: String;
  typeAddress!: String;
  line1!: string;
  line2!: string;
  latitude!: number;
  longitude!: number;
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
        const addressObject: ClienteAddress=new ClienteAddress(this.locationId,this.typeAddress,this.line1,this.line2,this.latitude,this.longitude,true);
        this.addressArray.push(addressObject);
        this.clienteService.createAddress(this.typeDocumentId,this.documentId, this.addressArray).subscribe(
        (data) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Cliente creado correctamente.',
            icon: 'success',

          }).then(() => {

            this.isSaved = true;
            this.errorMessage = null;
            // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
            this.router.navigate(['/gestion/gestion-naturales/']);
          });
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al guardar la informacion del cliente. Por favor, inténtalo nuevamente.',
            icon: 'error'
          });

          this.isSaved = false;
          this.errorMessage = 'Error al guardar la informacion del cliente. Por favor, inténtalo nuevamente.';
        }
      );
    }

}
