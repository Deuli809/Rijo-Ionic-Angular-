export type Prioridad = 'Alta' | 'Media' | 'Baja';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  completada: boolean;
}
