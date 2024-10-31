import { useState, useMemo } from 'react';
import { FiltrosPedido, Pedido } from '../types';

export const useFiltros = (pedidos: Pedido[]) => {
  const [filtros, setFiltros] = useState<FiltrosPedido>({
    busqueda: '',
    estado: undefined,
    prioridad: undefined,
    fechaDesde: undefined,
    fechaHasta: undefined,
    preparador: undefined
  });

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(pedido => {
      const cumpleFiltroEstado = !filtros.estado || pedido.estado === filtros.estado;
      const cumpleFiltroPrioridad = !filtros.prioridad || pedido.prioridad === filtros.prioridad;
      const cumplePreparador = !filtros.preparador || 
        pedido.preparador?.toLowerCase().includes(filtros.preparador.toLowerCase());
      
      const fechaPedido = new Date(pedido.fecha);
      const cumpleFechaDesde = !filtros.fechaDesde || 
        fechaPedido >= new Date(filtros.fechaDesde);
      const cumpleFechaHasta = !filtros.fechaHasta || 
        fechaPedido <= new Date(filtros.fechaHasta);

      const cumpleBusqueda = !filtros.busqueda || 
        pedido.cliente.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        pedido.productos.some(p => 
          p.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          p.sku?.toLowerCase().includes(filtros.busqueda.toLowerCase())
        );

      return cumpleFiltroEstado && 
             cumpleFiltroPrioridad && 
             cumplePreparador && 
             cumpleFechaDesde && 
             cumpleFechaHasta && 
             cumpleBusqueda;
    });
  }, [pedidos, filtros]);

  return {
    filtros,
    setFiltros,
    pedidosFiltrados
  };
};