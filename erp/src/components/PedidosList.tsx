import React, { useState } from 'react';
import { Clock, AlertCircle, CheckCircle, ArrowRight, AlertTriangle, Timer, User, Calendar, Truck } from 'lucide-react';
import { Pedido } from '../types';

interface PedidosListProps {
  pedidos: Pedido[];
  onUpdateEstado: (pedidoId: number, nuevoEstado: Pedido['estado'], datos?: Partial<Pedido>) => void;
}

const estadoColors = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  en_proceso: 'bg-blue-100 text-blue-800',
  completado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800'
};

const estadoTitles = {
  pendiente: 'Pedidos Pendientes',
  en_proceso: 'En Preparación',
  completado: 'Completados',
  cancelado: 'Cancelados'
};

const prioridadIcons = {
  baja: Clock,
  media: AlertCircle,
  alta: AlertTriangle
};

const prioridadColors = {
  baja: 'text-gray-500',
  media: 'text-orange-500',
  alta: 'text-red-500'
};

const PedidoCard = ({ pedido, onUpdateEstado }: { pedido: Pedido; onUpdateEstado: PedidosListProps['onUpdateEstado'] }) => {
  const [expandedPedido, setExpandedPedido] = useState<boolean>(false);
  const [preparador, setPreparador] = useState<string>('');
  const [tiempoEstimado, setTiempoEstimado] = useState<number>(30);
  const PrioridadIcon = prioridadIcons[pedido.prioridad];
  const progreso = calcularProgreso(pedido);

  const handleComenzarPreparacion = () => {
    if (!preparador.trim()) {
      alert('Por favor, ingrese el nombre del preparador');
      return;
    }

    const fechaEstimada = new Date();
    fechaEstimada.setMinutes(fechaEstimada.getMinutes() + tiempoEstimado);

    onUpdateEstado(pedido.id, 'en_proceso', {
      preparador,
      fechaEstimada: fechaEstimada.toISOString(),
      tiempoPreparacion: tiempoEstimado
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-4">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">{pedido.cliente}</h3>
              <PrioridadIcon 
                className={`h-5 w-5 ${prioridadColors[pedido.prioridad]}`} 
                title={`Prioridad ${pedido.prioridad}`}
              />
            </div>
            <p className="text-sm text-gray-500">Pedido #{pedido.id} - {new Date(pedido.fecha).toLocaleDateString()}</p>
          </div>
        </div>

        {pedido.estado === 'en_proceso' && (
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {pedido.preparador}
              </div>
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-1" />
                {pedido.tiempoPreparacion} min
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {(expandedPedido ? pedido.productos : pedido.productos.slice(0, 2)).map((producto) => (
            <div key={producto.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{producto.nombre}</p>
                <p className="text-sm text-gray-500">
                  Ubicación: {producto.ubicacion}
                  {producto.sku && ` | SKU: ${producto.sku}`}
                </p>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                x{producto.cantidad}
              </span>
            </div>
          ))}
          
          {pedido.productos.length > 2 && (
            <button
              onClick={() => setExpandedPedido(!expandedPedido)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {expandedPedido ? 'Ver menos' : `Ver ${pedido.productos.length - 2} productos más`}
            </button>
          )}
        </div>

        {pedido.notas && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{pedido.notas}</p>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          {pedido.estado === 'pendiente' && (
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Nombre del preparador"
                  value={preparador}
                  onChange={(e) => setPreparador(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={tiempoEstimado}
                  onChange={(e) => setTiempoEstimado(parseInt(e.target.value))}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <button 
                onClick={handleComenzarPreparacion}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Comenzar preparación
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

          {pedido.estado === 'en_proceso' && (
            <button 
              onClick={() => onUpdateEstado(pedido.id, 'completado', {
                tracking: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
              })}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              Marcar como completado
              <CheckCircle className="ml-2 h-4 w-4" />
            </button>
          )}

          {pedido.estado === 'completado' && pedido.tracking && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Truck className="h-4 w-4" />
              <span className="text-sm font-medium">{pedido.tracking}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function calcularProgreso(pedido: Pedido): number {
  if (!pedido.fechaEstimada || pedido.estado === 'completado') return 100;
  if (pedido.estado === 'pendiente') return 0;

  const inicio = new Date(pedido.fecha).getTime();
  const fin = new Date(pedido.fechaEstimada).getTime();
  const actual = new Date().getTime();

  const progreso = ((actual - inicio) / (fin - inicio)) * 100;
  return Math.min(Math.max(progreso, 0), 100);
}

const PedidosList: React.FC<PedidosListProps> = ({ pedidos, onUpdateEstado }) => {
  const pedidosPorEstado = {
    pendiente: pedidos.filter(p => p.estado === 'pendiente'),
    en_proceso: pedidos.filter(p => p.estado === 'en_proceso'),
    completado: pedidos.filter(p => p.estado === 'completado'),
    cancelado: pedidos.filter(p => p.estado === 'cancelado')
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(['pendiente', 'en_proceso', 'completado'] as const).map((estado) => (
        <div key={estado} className="flex flex-col">
          <div className={`p-3 rounded-t-lg ${estadoColors[estado]} font-medium mb-4`}>
            {estadoTitles[estado]} ({pedidosPorEstado[estado].length})
          </div>
          <div className="space-y-4">
            {pedidosPorEstado[estado].map((pedido) => (
              <PedidoCard
                key={pedido.id}
                pedido={pedido}
                onUpdateEstado={onUpdateEstado}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PedidosList;