import { useState } from 'react';
import { 
  Cliente, 
  Interaccion, 
  Oportunidad,
  Campana,
  Cotizacion,
  Contrato,
  Tarea,
  Documento,
  Servicio,
  PlanServicio,
  Factura,
  Pago
} from '../types';

const clientesIniciales: Cliente[] = [
  {
    id: 1,
    nombre: "Empresa ABC",
    contacto: "Juan Pérez",
    email: "juan@empresaabc.com",
    telefono: "+34 123 456 789",
    direccion: "Calle Principal 123",
    tipo: "empresa",
    estado: "activo"
  },
  {
    id: 2,
    nombre: "Distribuidora XYZ",
    contacto: "María García",
    email: "maria@xyz.com",
    telefono: "+34 987 654 321",
    direccion: "Avenida Central 456",
    tipo: "empresa",
    estado: "activo"
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    contacto: "Carlos Rodríguez",
    email: "carlos@gmail.com",
    telefono: "+34 555 123 456",
    direccion: "Plaza Mayor 789",
    tipo: "individual",
    estado: "activo"
  }
];

const interaccionesIniciales: Interaccion[] = [
  {
    id: 1,
    clienteId: 1,
    tipo: "llamada",
    fecha: "2024-03-28",
    descripcion: "Llamada de seguimiento sobre propuesta comercial",
    resultado: "positivo"
  },
  {
    id: 2,
    clienteId: 2,
    tipo: "email",
    fecha: "2024-03-27",
    descripcion: "Envío de cotización actualizada",
    resultado: "pendiente"
  }
];

const oportunidadesIniciales: Oportunidad[] = [
  {
    id: 1,
    clienteId: 1,
    titulo: "Proyecto de implementación ERP",
    valor: 50000,
    estado: "en_proceso",
    probabilidad: 75,
    fechaCreacion: "2024-03-20",
    fechaCierre: "2024-04-30"
  },
  {
    id: 2,
    clienteId: 2,
    titulo: "Actualización sistema de gestión",
    valor: 25000,
    estado: "inicial",
    probabilidad: 50,
    fechaCreacion: "2024-03-25",
    fechaCierre: "2024-05-15"
  }
];

const campanasIniciales: Campana[] = [
  {
    id: 1,
    titulo: "Campaña Primavera 2024",
    tipo: "email",
    estado: "activa",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-05-31",
    presupuesto: 5000,
    objetivo: "Incrementar ventas en un 20%",
    audiencia: ["empresas", "tecnología"],
    metricas: {
      alcance: 1000,
      interacciones: 250,
      conversiones: 50,
      roi: 2.5
    }
  }
];

export const useCRM = () => {
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciales);
  const [interacciones, setInteracciones] = useState<Interaccion[]>(interaccionesIniciales);
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>(oportunidadesIniciales);
  const [campanas, setCampanas] = useState<Campana[]>(campanasIniciales);
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [planesServicio, setPlanesServicio] = useState<PlanServicio[]>([]);
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);

  const agregarCliente = (cliente: Omit<Cliente, 'id'>) => {
    const nuevoCliente = {
      ...cliente,
      id: Math.max(...clientes.map(c => c.id), 0) + 1
    };
    setClientes(prev => [...prev, nuevoCliente]);
  };

  const agregarInteraccion = (interaccion: Omit<Interaccion, 'id'>) => {
    const nuevaInteraccion = {
      ...interaccion,
      id: Math.max(...interacciones.map(i => i.id), 0) + 1
    };
    setInteracciones(prev => [...prev, nuevaInteraccion]);
  };

  const agregarOportunidad = (oportunidad: Omit<Oportunidad, 'id'>) => {
    const nuevaOportunidad = {
      ...oportunidad,
      id: Math.max(...oportunidades.map(o => o.id), 0) + 1
    };
    setOportunidades(prev => [...prev, nuevaOportunidad]);
  };

  const agregarCampana = (campana: Omit<Campana, 'id'>) => {
    const nuevaCampana = {
      ...campana,
      id: Math.max(...campanas.map(c => c.id), 0) + 1
    };
    setCampanas(prev => [...prev, nuevaCampana]);
  };

  const agregarCotizacion = (cotizacion: Omit<Cotizacion, 'id'>) => {
    const nuevaCotizacion = {
      ...cotizacion,
      id: Math.max(...cotizaciones.map(c => c.id), 0) + 1
    };
    setCotizaciones(prev => [...prev, nuevaCotizacion]);
  };

  const agregarContrato = (contrato: Omit<Contrato, 'id'>) => {
    const nuevoContrato = {
      ...contrato,
      id: Math.max(...contratos.map(c => c.id), 0) + 1
    };
    setContratos(prev => [...prev, nuevoContrato]);
  };

  const agregarTarea = (tarea: Omit<Tarea, 'id'>) => {
    const nuevaTarea = {
      ...tarea,
      id: Math.max(...tareas.map(t => t.id), 0) + 1
    };
    setTareas(prev => [...prev, nuevaTarea]);
  };

  const agregarDocumento = (documento: Omit<Documento, 'id'>) => {
    const nuevoDocumento = {
      ...documento,
      id: Math.max(...documentos.map(d => d.id), 0) + 1
    };
    setDocumentos(prev => [...prev, nuevoDocumento]);
  };

  const agregarServicio = (servicio: Omit<Servicio, 'id'>) => {
    const nuevoServicio = {
      ...servicio,
      id: Math.max(...servicios.map(s => s.id), 0) + 1
    };
    setServicios(prev => [...prev, nuevoServicio]);
  };

  const agregarPlanServicio = (plan: Omit<PlanServicio, 'id'>) => {
    const nuevoPlan = {
      ...plan,
      id: Math.max(...planesServicio.map(p => p.id), 0) + 1
    };
    setPlanesServicio(prev => [...prev, nuevoPlan]);
  };

  const agregarFactura = (factura: Omit<Factura, 'id'>) => {
    const nuevaFactura = {
      ...factura,
      id: Math.max(...facturas.map(f => f.id), 0) + 1
    };
    setFacturas(prev => [...prev, nuevaFactura]);
  };

  const agregarPago = (pago: Omit<Pago, 'id'>) => {
    const nuevoPago = {
      ...pago,
      id: Math.max(...pagos.map(p => p.id), 0) + 1
    };
    setPagos(prev => [...prev, nuevoPago]);
  };

  return {
    clientes,
    interacciones,
    oportunidades,
    campanas,
    cotizaciones,
    contratos,
    tareas,
    documentos,
    servicios,
    planesServicio,
    facturas,
    pagos,
    agregarCliente,
    agregarInteraccion,
    agregarOportunidad,
    agregarCampana,
    agregarCotizacion,
    agregarContrato,
    agregarTarea,
    agregarDocumento,
    agregarServicio,
    agregarPlanServicio,
    agregarFactura,
    agregarPago
  };
};