import React from 'react';

interface EstadisticasPanelProps {
  estadisticas: {
    total: number;
    pendientes: number;
    enProceso: number;
    completados: number;
    prioridadAlta: number;
  };
}

const EstadisticasPanel: React.FC<EstadisticasPanelProps> = ({ estadisticas }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm font-medium text-gray-500">Total Pedidos</div>
        <div className="mt-1 text-2xl font-semibold">{estadisticas.total}</div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
        <div className="text-sm font-medium text-yellow-800">Pendientes</div>
        <div className="mt-1 text-2xl font-semibold text-yellow-900">{estadisticas.pendientes}</div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <div className="text-sm font-medium text-blue-800">En Proceso</div>
        <div className="mt-1 text-2xl font-semibold text-blue-900">{estadisticas.enProceso}</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg shadow-sm">
        <div className="text-sm font-medium text-green-800">Completados</div>
        <div className="mt-1 text-2xl font-semibold text-green-900">{estadisticas.completados}</div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg shadow-sm">
        <div className="text-sm font-medium text-red-800">Prioridad Alta</div>
        <div className="mt-1 text-2xl font-semibold text-red-900">{estadisticas.prioridadAlta}</div>
      </div>
    </div>
  );
};

export default EstadisticasPanel;