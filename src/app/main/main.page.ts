import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, checkboxOutline, trashOutline } from 'ionicons/icons';
import { Prioridad, Tarea } from '../models/tarea.model';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonBadge,
    IonButton,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class MainPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly tareasService = inject(TareasService);

  tareas: Tarea[] = [];
  modalAbierto = false;

  readonly formulario = this.formBuilder.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: [''],
    prioridad: ['Media' as Prioridad, Validators.required],
  });

  constructor() {
    addIcons({ add, 'checkbox-outline': checkboxOutline, 'trash-outline': trashOutline });
  }

  ngOnInit(): void {
    this.tareas = this.tareasService.obtenerTareas();
  }

  get tareasPendientes(): number {
    return this.tareas.filter((tarea) => !tarea.completada).length;
  }

  abrirFormulario(): void {
    this.formulario.reset({ titulo: '', descripcion: '', prioridad: 'Media' });
    this.modalAbierto = true;
  }

  cerrarFormulario(): void {
    this.modalAbierto = false;
  }

  guardarTarea(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();
    this.tareas = this.tareasService.agregarTarea({
      titulo: datos.titulo.trim(),
      descripcion: datos.descripcion.trim(),
      prioridad: datos.prioridad,
    });
    this.cerrarFormulario();
  }

  cambiarEstado(tarea: Tarea, completada: boolean): void {
    this.tareas = this.tareasService.cambiarEstado(tarea.id, completada);
  }

  eliminarTarea(tarea: Tarea): void {
    this.tareas = this.tareasService.eliminarTarea(tarea.id);
  }

  colorPrioridad(prioridad: Prioridad): string {
    switch (prioridad) {
      case 'Alta':
        return 'danger';
      case 'Media':
        return 'warning';
      case 'Baja':
        return 'success';
    }
  }
}
