import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css'],
})
export class ListEmpleadoComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  user = {
    name: 'jeronimo',
  };

  displayedColumns: string[] = [
    'nombreCompleto',
    'correo',
    'estadoCivil',
    'fechaIngreso',
    'sexo',
    'telefono',
    'acciones',
  ];
  listEmpleado: Empleado[] = [];
  dataSource = new MatTableDataSource(this.listEmpleado);

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private empleadoService: EmpleadoService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cargarEmpleados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados() {
    this.listEmpleado = this.empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleado);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.listEmpleado);
  }

  eliminarEmpleado(index: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: 'Estas seguro que desea eliminar el empleado?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'aceptar') {
        this.empleadoService.eliminarEmpleado(index);
        this.cargarEmpleados();//para que se vuelva a llenar la grilla
        this.snackBar.open('El empleado fue eliminado con exito', '', {
          duration: 2000,
        });
      }
    });
  }
}
