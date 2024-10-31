import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Cliente, Interaccion } from '../types';

interface NuevaInteraccionProps {
  cliente: Cliente;
  onClose: () => void;
  onSubmit: (interaccion: Omit<Interaccion, 'id'>) => void;
}

const NuevaInteraccion: React.FC<NuevaInteraccionProps> = ({ cliente, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tipo: 'llamada' as Interaccion['tipo'],
    descripcion: '',
    resultado: '',
    siguienteAccion: '',
    fechaSeguimiento: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      clienteId: cliente.id,
      fecha: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Nueva Interacción - {cliente.nombre}</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Interacción</label>
            <select
              value={formData.tipo}
              onChange={e => setFormData(prev => ({ ...prev, tipo: e.target.value as Interaccion['tipo'] }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="llamada">Llamada</option>
              <option value="email">Email</option>
              <option value="reunion">Reunión</option>
              <option value="nota">Nota</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={e => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Resultado</label>
            <input
              type="text"
              value={formData.resultado}
              onChange={e => setFormData(prev => ({ ...prev, resultado: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Siguiente Acción</label>
            <input
              type="text"
              value={formData.siguienteAccion}
              onChange={e => setFormData(prev => ({ ...prev, siguienteAccion: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Seguimiento</label>
            <input
              type="date"
              value={formData.fechaSeguimiento}
              onChange={e => setFormData(prev => ({ ...prev, fechaSeguimiento: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            />
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
              Guardar Interacción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaInteraccion;