import { Component, OnInit } from '@angular/core';
import { CompanyMember } from '../../model/companyMember';
import { Cliente } from '../../../gestion-naturales/model/cliente';
import { Company } from '../../model/company';
import { CompanyService } from 'app/services/companyService';
import { ClienteService } from 'app/services/clienteService';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  uniqueKey: string = this.activatedRoute.snapshot.params['uniqueKey'];
  groupName: string = this.activatedRoute.snapshot.params['groupName'];
  groupRole!: string;
  state!: String;
  isSaved: boolean | null = null;
  memberArray: CompanyMember[]=[];
  errorMessage: string | null = null;
  cliente!: Cliente;
  company!:Company;


    constructor(

      private clienteService: ClienteService,
      private companyService: CompanyService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

     // this.getCliente();
    }

    onUpdate(): void {
        const memberObject: CompanyMember=new CompanyMember(this.groupRole,this.uniqueKey,this.state);
        this.memberArray.push(memberObject);
        this.companyService.createMember(this.groupName, this.memberArray).subscribe(
        (data) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'La informacion telefonica ha sido guardada correctamente.',
            icon: 'success',

          }).then(() => {

            this.isSaved = true;
            this.errorMessage = null;
            // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
            this.router.navigate(['/gestion/gestion-juridicos'])
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

}
