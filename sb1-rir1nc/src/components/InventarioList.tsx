import React, { useState } from 'react';
import { Package, Search } from 'lucide-react';
import { Producto } from '../types';

interface InventarioListProps {
  productos: Producto[];
}

const InventarioList: React.FC<InventarioListProps> = ({ productos }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroUnidad, setFiltroUnidad] = useState('');

  const productosFiltrados = productos.filter(producto => {
    const cumpleBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          producto.sku?.toLowerCase().includes(busqueda.toLowerCase()) ||
                          producto.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleUnidad = !filtroUnidad || producto.unidad === filtroUnidad;
    return cumpleBusqueda && cumpleUnidad;
  });

  const unidadesUnicas = Array.from(new Set(productos.map(p => p.unidad)));

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, SKU o ubicación..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filtroUnidad}
              onChange={(e) => setFiltroUnidad(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Todas las unidades</option>
              {unidadesUnicas.map(unidad => (
                <option key={unidad} value={unidad}>{unidad}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">SKU: {producto.sku}</p>
              </div>
              <Package className="h-6 w-6 text-blue-500" />
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cantidad:</span>
                <span className="text-sm font-medium">
                  {producto.cantidad} {producto.unidad}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ubicación:</span>
                <span className="text-sm font-medium">{producto.ubicacion}</span>
              </div>
              {producto.peso && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Peso:</span>
                  <span className="text-sm font-medium">{producto.peso} kg</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  producto.cantidad > 50 ? 'bg-green-100 text-green-800' :
                  producto.cantidad > 20 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {producto.cantidad > 50 ? 'Stock Alto' :
                   producto.cantidad > 20 ? 'Stock Medio' :
                   'Stock Bajo'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventarioList;