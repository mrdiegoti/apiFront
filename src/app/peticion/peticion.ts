export interface Peticion {
  firmas: any;
  estado(arg0: string, estado: any): unknown;
  firmantes: any;
  id?: number;
  titulo: string;
  descripcion: string;
  destinatario: string;
  categoria_id: number;
  imagen?: string;
  user_id?: number;
}

