export type Tarea = {
  id: number;
  titulo: string;
  detalles: string;
  estado: 'pendiente'| 'en_progreso' | 'completado';
  prioridad: 'baja' | 'media' | 'alta';
  created_at: string;
  updated_at: string;
  usuarios: Usuario[];
};

export type Usuario = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  pivot: {
    tarea_id: number;
    user_id: number;
    estado: 'pendiente' | 'en_progreso' | 'finalizado';
  };
};

export type PaginationLinks = {
  url: string | null;
  label: string;
  active: boolean;
};

export type TareasResponse = {
  current_page: number;
  data: Tarea[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type GetTareasType = { 
  data: TareasResponse, 
  isLoading: boolean, 
  error: any,
  isValidating: boolean,
}

export type GetTareaType = {
  data: Tarea,
  isLoading: boolean,
  error: any,
  isValidating: boolean,
}