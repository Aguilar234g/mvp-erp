import React, { useState } from 'react';
import { X, Plus, Package } from 'lucide-react';
import { Producto, Pedido } from '../types';

interface NuevoPedidoProps {
  onClose: () => void;
  onSubmit: (pedido: Omit<Pedido, 'id'>) => void;
}

const NuevoPedido: React.FC<NuevoPedidoProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    cliente: '',
    prioridad: 'media' as Pedido['prioridad'],
    notas: '',
    productos: [] as Omit<Producto, 'id'>[]
  });

  const [productoTemp, setProductoTemp] = useState({
    nombre: '',
    cantidad: 1,
    ubicacion: ''
  });

  const agregarProducto = () => {
    if (productoTemp.nombre && productoTemp.ubicacion) {
      setFormData(prev => ({
        ...prev,
        productos: [...prev.productos, productoTemp]
      }));
      setProductoTemp({ nombre: '', cantidad: 1, ubicacion: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.cliente && formData.productos.length > 0) {
      onSubmit({
        ...formData,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'pendiente'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Nuevo Pedido</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <input
              type="text"
              value={formData.cliente}
              onChange={e => setFormData(prev => ({ ...prev, cliente: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridad
            </label>
            <select
              value={formData.prioridad}
              onChange={e => setFormData(prev => ({ ...prev, prioridad: e.target.value as Pedido['prioridad'] }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas
            </label>
            <textarea
              value={formData.notas}
              onChange={e => setFormData(prev => ({ ...prev, notas: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Productos</h3>
            <div className="space-y-4">
              {formData.productos.map((producto, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">Ubicación: {producto.ubicacion}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">x{producto.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        productos: prev.productos.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={productoTemp.nombre}
                  onChange={e => setProductoTemp(prev => ({ ...prev, nombre: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  min="1"
                  value={productoTemp.cantidad}
                  onChange={e => setProductoTemp(prev => ({ ...prev, cantidad: parseInt(e.target.value) }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={productoTemp.ubicacion}
                  onChange={e => setProductoTemp(prev => ({ ...prev, ubicacion: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <button
                type="button"
                onClick={agregarProducto}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Crear Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoPedido;