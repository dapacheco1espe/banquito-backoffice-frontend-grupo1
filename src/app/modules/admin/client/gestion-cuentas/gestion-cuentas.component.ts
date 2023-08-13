import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-gestion-cuentas',
  templateUrl: './gestion-cuentas.component.html',
  styleUrls: ['./gestion-cuentas.component.scss'],
  animations: fuseAnimations,
})
export class GestionCuentasComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  public navigateToPages(page: 'create') {
    this.router.navigateByUrl(`/admin/client/gestion-cuentas/${page}`);
}

}
