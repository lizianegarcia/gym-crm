import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PagamentoService } from '../../../../core/services/pagamento.service';
import { Pagamento } from '../../../../core/models/pagamento.model';

@Component({
  selector: 'app-pagamentos-list',
  standalone: true,
  templateUrl: './pagamentos-list.component.html',

  imports: [
    CommonModule,
    CurrencyPipe,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PagamentosListComponent implements OnInit {

  displayedColumns = ['valor', 'data', 'status'];

  dataSource = new MatTableDataSource<Pagamento>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pagamentoService: PagamentoService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.pagamentoService.listar().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

}
