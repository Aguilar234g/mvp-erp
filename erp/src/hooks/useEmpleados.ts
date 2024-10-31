import { useState } from 'react';
import { Empleado } from '../types';

const empleadosIniciales: Empleado[] = [
  {
    id: 1,
    nombre: "Carlos",
    apellido: "Mendoza",
    cargo: "Jefe de Almacén",
    departamento: "Logística",
    email: "carlos.mendoza@pullasoft.com",
    telefono: "099-555-0101",
    fechaContratacion: "2022-03-15",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
    pedidosCompletados: 342,
    eficienciaPromedio: 98.5
  },
  {
    id: 2,
    nombre: "Ana",
    apellido: "López",
    cargo: "Preparadora Senior",
    departamento: "Operaciones",
    email: "ana.lopez@pullasoft.com",
    telefono: "099-555-0102",
    fechaContratacion: "2022-06-20",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200",
    pedidosCompletados: 289,
    eficienciaPromedio: 96.8
  },
  {
    id: 3,
    nombre: "Miguel",
    apellido: "Torres",
    cargo: "Preparador",
    departamento: "Operaciones",
    email: "miguel.torres@pullasoft.com",
    telefono: "099-555-0103",
    fechaContratacion: "2023-01-10",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=200&h=200",
    pedidosCompletados: 156,
    eficienciaPromedio: 94.2
  },
  {
    id: 4,
    nombre: "Laura",
    apellido: "Ramírez",
    cargo: "Supervisora",
    departamento: "Logística",
    email: "laura.ramirez@pullasoft.com",
    telefono: "099-555-0104",
    fechaContratacion: "2022-08-05",
    estado: "vacaciones",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=200&h=200",
    pedidosCompletados: 245,
    eficienciaPromedio: 97.3
  },
  {
    id: 5,
    nombre: "Roberto",
    apellido: "García",
    cargo: "Preparador Senior",
    departamento: "Operaciones",
    email: "roberto.garcia@pullasoft.com",
    telefono: "099-555-0105",
    fechaContratacion: "2022-11-15",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=200&h=200",
    pedidosCompletados: 198,
    eficienciaPromedio: 95.7
  },
  {
    id: 6,
    nombre: "Patricia",
    apellido: "Morales",
    cargo: "Preparadora",
    departamento: "Operaciones",
    email: "patricia.morales@pullasoft.com",
    telefono: "099-555-0106",
    fechaContratacion: "2023-03-01",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fit=crop&w=200&h=200",
    pedidosCompletados: 134,
    eficienciaPromedio: 93.8
  },
  {
    id: 7,
    nombre: "Daniel",
    apellido: "Herrera",
    cargo: "Preparador",
    departamento: "Operaciones",
    email: "daniel.herrera@pullasoft.com",
    telefono: "099-555-0107",
    fechaContratacion: "2023-02-15",
    estado: "inactivo",
    foto: "https://images.unsplash.com/photo-1463453091185-61582044d556?fit=crop&w=200&h=200",
    pedidosCompletados: 89,
    eficienciaPromedio: 91.5
  },
  {
    id: 8,
    nombre: "María",
    apellido: "Sánchez",
    cargo: "Supervisora",
    departamento: "Logística",
    email: "maria.sanchez@pullasoft.com",
    telefono: "099-555-0108",
    fechaContratacion: "2022-09-20",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?fit=crop&w=200&h=200",
    pedidosCompletados: 267,
    eficienciaPromedio: 96.4
  },
  {
    id: 9,
    nombre: "Jorge",
    apellido: "Martínez",
    cargo: "Preparador Senior",
    departamento: "Operaciones",
    email: "jorge.martinez@pullasoft.com",
    telefono: "099-555-0109",
    fechaContratacion: "2022-07-10",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?fit=crop&w=200&h=200",
    pedidosCompletados: 312,
    eficienciaPromedio: 97.8
  },
  {
    id: 10,
    nombre: "Carmen",
    apellido: "Díaz",
    cargo: "Preparadora",
    departamento: "Operaciones",
    email: "carmen.diaz@pullasoft.com",
    telefono: "099-555-0110",
    fechaContratacion: "2023-04-01",
    estado: "activo",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=200&h=200",
    pedidosCompletados: 78,
    eficienciaPromedio: 92.6
  }
];

export const useEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>(empleadosIniciales);

  const actualizarEstadoEmpleado = (id: number, nuevoEstado: Empleado['estado']) => {
    setEmpleados(prev => prev.map(emp => 
      emp.id === id ? { ...emp, estado: nuevoEstado } : emp
    ));
  };

  const actualizarEmpleado = (id: number, datos: Partial<Empleado>) => {
    setEmpleados(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...datos } : emp
    ));
  };

  return {
    empleados,
    actualizarEstadoEmpleado,
    actualizarEmpleado
  };
};