import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Cliente, Oportunidad } from '../types';

interface NuevaOportunidadProps {
  cliente: Cliente;
  onClose: () => void;
  onSubmit: (oportunidad: Omit<Oportunidad, 'id'>) => void;
}

const NuevaOportunidad: React.FC<NuevaOportunidadProps> = ({ cliente, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    valor: 0,
    estado: 'nueva' as Oportunidad['estado'],
    probabilidad: 50,
    notas: '',
    productos: [] as string[]
  });

  const [productoTemp, setProductoTemp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      clienteId: cliente.id,
      fechaCreacion: new Date().toISOString()
    });
    onClose();
  };

  const agregarProducto = () => {
    if (productoTemp.trim()) {
      setFormData(prev => ({
        ...prev,
        productos: [...prev.productos, productoTemp.trim()]
      }));
      setProductoTemp('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Nueva Oportunidad - {cliente.nombre}</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={e => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Valor ($)</label>
            <input
              type="number"
              value={formData.valor}
              onChange={e => setFormData(prev => ({ ...prev, valor: Number(e.target.value) }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              value={formData.estado}
              onChange={e => setFormData(prev => ({ ...prev, estado: e.target.value as Oportunidad['estado'] }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="nueva">Nueva</option>
              <option value="seguimiento">En Seguimiento</option>
              <option value="propuesta">Propuesta</option>
              <option value="negociacion">Negociación</option>
              <option value="ganada">Ganada</option>
              <option value="perdida">Perdida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Probabilidad de Cierre ({formData.probabilidad}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.probabilidad}
              onChange={e => setFormData(prev => ({ ...prev, probabilidad: Number(e.target.value) }))}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notas</label>
            <textarea
              value={formData.notas}
              onChange={e => setFormData(prev => ({ ...prev, notas: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Productos</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={productoTemp}
                onChange={e => setProductoTemp(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Agregar producto..."
              />
              <button
                type="button"
                onClick={agregarProducto}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.productos.map((producto, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {producto}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      productos: prev.productos.filter((_, i) => i !== index)
                    }))}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
              Crear Oportunidad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaOportunidad;