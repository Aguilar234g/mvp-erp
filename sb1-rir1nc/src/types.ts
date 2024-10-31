// Tipos existentes...

export interface Campana {
  id: number;
  titulo: string;
  tipo: 'email' | 'llamada' | 'evento' | 'social';
  estado: 'planificada' | 'activa' | 'completada' | 'cancelada';
  fechaInicio: string;
  fechaFin: string;
  presupuesto: number;
  objetivo: string;
  audiencia: string[];
  metricas: {
    alcance: number;
    interacciones: number;
    conversiones: number;
    roi: number;
  };
}

export interface Cotizacion {
  id: number;
  clienteId: number;
  numero: string;
  fecha: string;
  validoHasta: string;
  items: {
    producto: string;
    cantidad: number;
    precioUnitario: number;
    descuento?: number;
  }[];
  subtotal: number;
  impuestos: number;
  total: number;
  estado: 'borrador' | 'enviada' | 'aprobada' | 'rechazada' | 'vencida';
  notas?: string;
}

export interface Contrato {
  id: number;
  clienteId: number;
  numero: string;
  tipo: 'venta' | 'servicio' | 'mantenimiento';
  fechaInicio: string;
  fechaFin: string;
  valor: number;
  estado: 'activo' | 'pendiente' | 'renovacion' | 'terminado';
  terminos: string;
  archivos: string[];
}

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  asignadoA: string;
  fechaVencimiento: string;
  prioridad: 'baja' | 'media' | 'alta';
  estado: 'pendiente' | 'en_proceso' | 'completada';
  tipo: 'seguimiento' | 'llamada' | 'reunion' | 'documento';
  relacionadoCon?: {
    tipo: 'cliente' | 'oportunidad' | 'campana';
    id: number;
  };
}

export interface Documento {
  id: number;
  titulo: string;
  tipo: 'contrato' | 'propuesta' | 'factura' | 'otro';
  fechaCreacion: string;
  clienteId?: number;
  archivo: string;
  estado: 'borrador' | 'revision' | 'final';
  etiquetas: string[];
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion?: string;
  tipo: 'unico' | 'recurrente';
  estado: 'activo' | 'inactivo';
  requisitos?: string[];
}

export interface PlanServicio {
  id: number;
  clienteId: number;
  servicioId: number;
  fechaInicio: string;
  fechaFin?: string;
  estado: 'activo' | 'pausado' | 'cancelado';
  frecuenciaFacturacion: 'mensual' | 'trimestral' | 'anual';
  precio: number;
  descuento?: number;
  notas?: string;
}

export interface Factura {
  id: number;
  clienteId: number;
  numero: string;
  fecha: string;
  fechaVencimiento: string;
  items: {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    impuesto: number;
  }[];
  subtotal: number;
  impuestos: number;
  total: number;
  estado: 'pendiente' | 'pagada' | 'vencida' | 'anulada';
  metodoPago?: string;
  notas?: string;
}

export interface Pago {
  id: number;
  facturaId: number;
  fecha: string;
  monto: number;
  metodoPago: string;
  referencia: string;
  estado: 'procesando' | 'completado' | 'rechazado';
  notas?: string;
}