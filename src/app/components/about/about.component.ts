import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @Input() funcionPadre: string;

  usuarios = null;
  articulos = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.recuperarPersona();
    this.showApi();
    // this.showProducts();
  }

  recargar() {
    this.recuperarPersona();
  }

  recuperarPersona() {
    this.empleadoService.retornar().subscribe(
      (result) => {
        this.usuarios = result;
      },

      (err) => console.log(err)
    );
  }

  showApi() {
    this.empleadoService.retornar().subscribe((data) => {
      console.log(data);
    });
  }

  // showProducts() {
  //   this.empleadoService.getProducts().subscribe(
  //     (data: any) => {
  //       this.articulos = data;
  //     },
  //     (err) => console.log(err)
  //   );
  // }
}
