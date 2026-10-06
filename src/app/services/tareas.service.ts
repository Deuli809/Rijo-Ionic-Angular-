import { Injectable } from '@angular/core';
import { Prioridad, Tarea } from '../models/tarea.model';

@Injectable({ providedIn: 'root' })
export class TareasService {
  private readonly storageKey = 'rijo-tareas';
  private tareas: Tarea[] = this.cargarTareas();

  obtenerTareas(): Tarea[] {
    return this.tareas.map((tarea) => ({ ...tarea }));
  }

  agregarTarea(datos: Pick<Tarea, 'titulo' | 'descripcion' | 'prioridad'>): Tarea[] {
    const nuevaTarea: Tarea = {
      ...datos,
      id: Math.max(Date.now(), ...this.tareas.map((tarea) => tarea.id + 1)),
      completada: false,
    };

    this.tareas = [nuevaTarea, ...this.tareas];
    this.guardarTareas();
    return this.obtenerTareas();
  }

  cambiarEstado(id: number, completada: boolean): Tarea[] {
    this.tareas = this.tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada } : tarea,
    );
    this.guardarTareas();
    return this.obtenerTareas();
  }

  eliminarTarea(id: number): Tarea[] {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    this.guardarTareas();
    return this.obtenerTareas();
  }

  private cargarTareas(): Tarea[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const guardadas = localStorage.getItem(this.storageKey);
      if (!guardadas) {
        return [];
      }

      const tareas: unknown = JSON.parse(guardadas);
      return Array.isArray(tareas) ? tareas.filter((tarea) => this.esTarea(tarea)) : [];
    } catch {
      return [];
    }
  }

  private guardarTareas(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tareas));
    } catch (error) {
      console.error('No se pudieron guardar las tareas en localStorage.', error);
    }
  }

  private esTarea(valor: unknown): valor is Tarea {
    if (typeof valor !== 'object' || valor === null) {
      return false;
    }

    const tarea = valor as Partial<Tarea>;
    const prioridades: Prioridad[] = ['Alta', 'Media', 'Baja'];

    return (
      typeof tarea.id === 'number' &&
      typeof tarea.titulo === 'string' &&
      typeof tarea.descripcion === 'string' &&
      prioridades.includes(tarea.prioridad as Prioridad) &&
      typeof tarea.completada === 'boolean'
    );
  }
}
