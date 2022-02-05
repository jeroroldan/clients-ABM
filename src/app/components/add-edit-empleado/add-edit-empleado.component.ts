import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class AddEditEmpleadoComponent implements OnInit {
  sex: boolean = true;

  @Input() minimo: number;
  @Input() maximo: number;
  actual: number;

  estadosCiviles: any[] = ['Soltero', 'Casado', 'Divorciado'];
  idEmpleado: any;
  accion = 'Crear';
  funcionPadre = 'jeronimo';

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private route: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaDeIngreso: ['', Validators.required],
      telefono: ['', Validators.required],
      estadoCivil: [''],
      sexo: ['', Validators.required],
      lessons: this.fb.array([]),
    });
    const idParam = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  get ArraylessonsForm() {
    return this.myForm.get('lessons') as FormArray;
  }

  addlessons() {
    if (this.myForm.invalid) {
      return;
    }
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['', Validators.required],
    });
    this.ArraylessonsForm.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.ArraylessonsForm.removeAt(lessonIndex);
  }

  increment() {
    if (this.actual < this.maximo) {
      this.actual++;
    }
  }

  decrement() {
    if (this.actual > this.minimo) {
      this.actual--;
    }
  }

  fijar(v: number) {
    if (v > this.minimo && v < this.maximo) {
      this.actual = v;
    }
  }

  guardarEmpleado() {
    console.log(this.myForm);
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto').value,
      correo: this.myForm.get('correo').value,
      fechaIngreso: this.myForm.get('fechaDeIngreso').value,
      telefono: this.myForm.get('telefono').value,
      estadoCivil: this.myForm.get('estadoCivil').value,
      sexo: this.myForm.get('sexo').value,
    };

    if (this.idEmpleado !== undefined) {
      this.editarEmpleado(empleado);
    } else {
      this.agregarEmpleado(empleado);
    }
  }
  agregarEmpleado(empleado: Empleado) {
    this.empleadoService.agregarEmpleado(empleado);
    this.snackBar.open('El empleado fue registrado con exito', '', {
      duration: 2000,
    });
    this.route.navigate(['/']);
  }

  editarEmpleado(empleado: Empleado) {
    this.empleadoService.editEmpleado(empleado, this.idEmpleado);
    this.snackBar.open('El empleado fue actualizado con exito con exito', '', {
      duration: 2000,
    });
    this.route.navigate(['/']);
  }

  esEditar() {
    const empleado: Empleado = this.empleadoService.getEmpleado(
      this.idEmpleado
    );
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correo: empleado.correo,
      fechaDeIngreso: empleado.fechaIngreso,
      telefono: empleado.telefono,
      estadoCivil: empleado.estadoCivil,
      sexo: empleado.sexo,
    });
  }

  deleteItem(index: number) {
    this.ArraylessonsForm.removeAt(index);
  }
}
