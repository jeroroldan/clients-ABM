import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  listEmpleados: Empleado[] = [
    {
      nombreCompleto: 'Lucas Martinez',
      correo: 'lmartinez@gmail.com',
      telefono: 352134,
      sexo: 'Masculinoi',
      fechaIngreso: new Date(),
      estadoCivil: 'soltero',
    },

    {
      nombreCompleto: 'Santiago Cuneo',
      correo: 'lmartinez@gmail.com',
      telefono: 35213344,
      sexo: 'Masculinoi',
      fechaIngreso: new Date(),
      estadoCivil: 'casaado',
    },

    {
      nombreCompleto: 'Lucas Martinez',
      correo: 'lmartinez@gmail.com',
      telefono: 352134,
      sexo: 'Masculinoi',
      fechaIngreso: new Date(),
      estadoCivil: 'soltero',
    },
  ];

  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.listEmpleados.slice();
  }

  eliminarEmpleado(index: number) {
    this.listEmpleados.splice(index, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    this.listEmpleados.unshift(empleado);
  }

  getEmpleado(id: number) {
    return this.listEmpleados[id];
  }

  editEmpleado(empleado: Empleado, idx: number) {
    (this.listEmpleados[idx].nombreCompleto = empleado.nombreCompleto),
      (this.listEmpleados[idx].correo = empleado.correo),
      (this.listEmpleados[idx].fechaIngreso = empleado.fechaIngreso),
      (this.listEmpleados[idx].estadoCivil = empleado.estadoCivil),
      (this.listEmpleados[idx].sexo = empleado.sexo);
  }

  retornar() {
    return this.http.get(environment.url);
  }
}
