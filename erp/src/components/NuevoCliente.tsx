import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Cliente } from '../types';

interface NuevoClienteProps {
  onClose: () => void;
  onSubmit: (cliente: Omit<Cliente, 'id'>) => void;
}

const NuevoCliente: React.FC<NuevoClienteProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo: 'potencial' as Cliente['tipo'],
    notas: '',
    etiquetas: [] as string[],
    valorTotal: 0
  });

  const [etiquetaTemp, setEtiquetaTemp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      fechaRegistro: new Date().toISOString(),
      valorTotal: 0
    });
    onClose();
  };

  const agregarEtiqueta = () => {
    if (etiquetaTemp.trim()) {
      setFormData(prev => ({
        ...prev,
        etiquetas: [...prev.etiquetas, etiquetaTemp.trim()]
      }));
      setEtiquetaTemp('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Nuevo Cliente</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={e => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Empresa</label>
              <input
                type="text"
                value={formData.empresa}
                onChange={e => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={e => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              value={formData.direccion}
              onChange={e => setFormData(prev => ({ ...prev, direccion: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Cliente</label>
            <select
              value={formData.tipo}
              onChange={e => setFormData(prev => ({ ...prev, tipo: e.target.value as Cliente['tipo'] }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="potencial">Potencial</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
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
            <label className="block text-sm font-medium text-gray-700">Etiquetas</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={etiquetaTemp}
                onChange={e => setEtiquetaTemp(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Agregar etiqueta..."
              />
              <button
                type="button"
                onClick={agregarEtiqueta}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.etiquetas.map((etiqueta, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {etiqueta}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      etiquetas: prev.etiquetas.filter((_, i) => i !== index)
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
              Crear Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoCliente;