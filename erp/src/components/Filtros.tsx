import React from 'react';
import { Filter, Calendar } from 'lucide-react';
import { FiltrosPedido } from '../types';

interface FiltrosProps {
  filtros: FiltrosPedido;
  onFiltrosChange: (filtros: FiltrosPedido) => void;
}

const Filtros: React.FC<FiltrosProps> = ({ filtros, onFiltrosChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center space-x-2 text-gray-700">
        <Filter className="h-5 w-5" />
        <h3 className="font-medium">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={filtros.estado || ''}
            onChange={(e) => onFiltrosChange({ ...filtros, estado: e.target.value || undefined })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En proceso</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
          <select
            value={filtros.prioridad || ''}
            onChange={(e) => onFiltrosChange({ ...filtros, prioridad: e.target.value || undefined })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las prioridades</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preparador</label>
          <input
            type="text"
            value={filtros.preparador || ''}
            onChange={(e) => onFiltrosChange({ ...filtros, preparador: e.target.value || undefined })}
            placeholder="Nombre del preparador"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha desde</label>
          <input
            type="date"
            value={filtros.fechaDesde || ''}
            onChange={(e) => onFiltrosChange({ ...filtros, fechaDesde: e.target.value || undefined })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha hasta</label>
          <input
            type="date"
            value={filtros.fechaHasta || ''}
            onChange={(e) => onFiltrosChange({ ...filtros, fechaHasta: e.target.value || undefined })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Filtros;