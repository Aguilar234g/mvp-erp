import { useState } from 'react';
import { Compra } from '../types';

const comprasIniciales: Compra[] = [
  {
    id: 1,
    proveedor: "Distribuidora ABC",
    fecha: new Date().toISOString(),
    fechaEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    productos: [],
    total: 1500.00,
    estado: "pendiente"
  },
  {
    id: 2,
    proveedor: "Mayorista XYZ",
    fecha: new Date().toISOString(),
    fechaEntrega: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    productos: [],
    total: 2300.00,
    estado: "aprobada"
  },
  {
    id: 3,
    proveedor: "Importadora 123",
    fecha: new Date().toISOString(),
    fechaEntrega: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    productos: [],
    total: 3800.00,
    estado: "pendiente"
  }
];

export const useCompras = () => {
  const [compras, setCompras] = useState<Compra[]>(comprasIniciales);

  const agregarCompra = (compra: Omit<Compra, 'id'>) => {
    const nuevaCompra = {
      ...compra,
      id: Math.max(...compras.map(c => c.id)) + 1
    };
    setCompras(prev => [nuevaCompra, ...prev]);
  };

  const actualizarCompra = (id: number, datos: Partial<Compra>) => {
    setCompras(prev => prev.map(compra =>
      compra.id === id ? { ...compra, ...datos } : compra
    ));
  };

  return {
    compras,
    agregarCompra,
    actualizarCompra
  };
};