import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from 'app/services/clienteService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  cliente: Cliente | undefined;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.clienteService.detail(id).subscribe(
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