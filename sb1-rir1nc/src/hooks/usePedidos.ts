import { useState, useCallback, useMemo } from 'react';
import { Pedido } from '../types';

const initialSimulationData: Pedido[] = [
  {
    id: 1,
    cliente: "Supermercados del Valle",
    fecha: new Date().toISOString(),
    estado: "pendiente",
    prioridad: "alta",
    productos: [
      { id: 1, nombre: "Arroz Premium", cantidad: 50, ubicacion: "A-01-02", sku: "ARR001", peso: 1, unidad: "kg" },
      { id: 2, nombre: "Aceite de Oliva", cantidad: 24, ubicacion: "B-03-01", sku: "ACE001", peso: 1, unidad: "l" }
    ],
    notas: "Cliente VIP - Entrega prioritaria"
  },
  {
    id: 2,
    cliente: "Restaurante El Gourmet",
    fecha: new Date().toISOString(),
    estado: "en_proceso",
    prioridad: "media",
    productos: [
      { id: 3, nombre: "Pasta Italiana", cantidad: 30, ubicacion: "C-02-03", sku: "PAS001", peso: 0.5, unidad: "kg" },
      { id: 4, nombre: "Salsa de Tomate", cantidad: 20, ubicacion: "C-02-04", sku: "SAL001", peso: 0.5, unidad: "kg" }
    ],
    preparador: "Carlos Mendoza",
    fechaEstimada: new Date(Date.now() + 30 * 60000).toISOString(),
    tiempoPreparacion: 30
  },
  {
    id: 3,
    cliente: "Cafetería Central",
    fecha: new Date().toISOString(),
    estado: "completado",
    prioridad: "baja",
    productos: [
      { id: 5, nombre: "Café en Grano", cantidad: 10, ubicacion: "D-01-01", sku: "CAF001", peso: 1, unidad: "kg" }
    ],
    preparador: "Ana López",
    tracking: "TRK123456789"
  }
];

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(initialSimulationData);

  const handleUpdateEstado = useCallback((pedidoId: number, nuevoEstado: Pedido['estado'], datos?: Partial<Pedido>) => {
    setPedidos(prevPedidos => 
      prevPedidos.map(pedido => 
        pedido.id === pedidoId 
          ? { ...pedido, estado: nuevoEstado, ...datos }
          : pedido
      )
    );
  }, []);

  const handleNuevoPedido = useCallback((pedidoData: Omit<Pedido, 'id'>) => {
    setPedidos(prevPedidos => [
      {
        ...pedidoData,
        id: Math.max(...prevPedidos.map(p => p.id), 0) + 1
      },
      ...prevPedidos
    ]);
  }, []);

  const estadisticas = useMemo(() => ({
    total: pedidos.length,
    pendientes: pedidos.filter(p => p.estado === 'pendiente').length,
    enProceso: pedidos.filter(p => p.estado === 'en_proceso').length,
    completados: pedidos.filter(p => p.estado === 'completado').length,
    prioridadAlta: pedidos.filter(p => p.prioridad === 'alta' && p.estado !== 'completado').length
  }), [pedidos]);

  return {
    pedidos,
    handleUpdateEstado,
    handleNuevoPedido,
    estadisticas
  };
};