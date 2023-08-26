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
    this.getCliente();
  }

  addAnotherAddress(): void {
    const addressObject: ClienteAddress = new ClienteAddress(
      this.locationId, 
      this.typeAddress, 
      this.line1, 
      this.line2, 
      this.latitude, 
      this.longitude, 
      true
    );

    this.addressArray.push(addressObject);
    this.clearAddressForm();

    Swal.fire({
      title: '¡Éxito!',
      text: 'Dirección agregada correctamente.',
      icon: 'success'
    });
  }

  clearAddressForm(): void {
    this.locationId = '';
    this.typeAddress = '';
    this.line1 = '';
    this.line2 = '';
    this.latitude = 0;
    this.longitude = 0;
  }

  onUpdate(): void {
    this.addressArray.push(new ClienteAddress(
      this.locationId, 
      this.typeAddress, 
      this.line1, 
      this.line2, 
      this.latitude, 
      this.longitude, 
      true
    ));

    this.clienteService.createAddress(this.typeDocumentId, this.documentId, this.addressArray).subscribe(
      (data) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Cliente creado correctamente.',
          icon: 'success'
        }).then(() => {
          this.isSaved = true;
          this.errorMessage = null;
          this.router.navigate(['/admin/gestion-naturales/']);
        });
      },
      (err) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Cliente creado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/admin/gestion-naturales/']);
        
      }
    );
  }
  getCliente(): void {
   
    this.clienteService.detail(this.typeDocumentId, this.documentId).subscribe(
      data => {
        this.cliente = data;
        console.log(this.cliente);
      },
      err => {
        this.router.navigate(['']);
      }
    );
  }
}
