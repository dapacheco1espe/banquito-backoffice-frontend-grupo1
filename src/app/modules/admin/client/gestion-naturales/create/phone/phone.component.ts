import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  phoneForm: FormGroup;
  typeDocumentId: string;
  documentId: string;
  isSaved: boolean | null = null;
  phoneArray: ClientePhone[] = [];
  errorMessage: string | null = null;
  cliente!: Cliente;


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.typeDocumentId = this.activatedRoute.snapshot.params['typeDocumentId'];
    this.documentId = this.activatedRoute.snapshot.params['documentId'];

    this.phoneForm = this.fb.group({
      phoneType: ['OFI', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.getCliente();
  }

  onUpdate(): void {
    const phoneObject: ClientePhone = new ClientePhone(
      this.phoneForm.value.phoneType,
      this.phoneForm.value.phoneNumber,
      true
      
    );
    this.phoneArray.push(phoneObject);
    this.clienteService.createPhone(this.typeDocumentId, this.documentId, this.phoneArray).subscribe(
      (data) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'La información telefónica ha sido guardada correctamente.',
          icon: 'success',
        }).then(() => {
          this.isSaved = true;
          this.errorMessage = null;
          // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
          this.router.navigate(['/gestion/gestion-naturales/createAddress/' + this.typeDocumentId + '/' + this.documentId])
        });
      },
      (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al guardar la información telefónica. Por favor, inténtalo nuevamente.',
          icon: 'error',
        });

        this.isSaved = false;
        this.errorMessage = 'Error al guardar la información telefónica. Por favor, inténtalo nuevamente.';
      }
    );
  }

  addAnotherPhone(): void {
    if (this.phoneForm.valid) {
      const phoneObject: ClientePhone = new ClientePhone(
        this.phoneForm.value.phoneType,
        this.phoneForm.value.phoneNumber,
        true
      );
      this.phoneArray.push(phoneObject);
      this.phoneForm.reset();

      Swal.fire({
        title: '¡Éxito!',
        text: 'Teléfono agregado correctamente.',
        icon: 'success'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos o inválidos',
        text: 'Faltan campos por llenar o algunos campos no son válidos.',
      });
    }
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
