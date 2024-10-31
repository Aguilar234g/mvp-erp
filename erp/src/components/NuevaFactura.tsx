import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Factura } from '../types';

interface NuevaFacturaProps {
  onClose: () => void;
  onSubmit: (factura: Omit<Factura, 'id'>) => void;
}

const NuevaFactura: React.FC<NuevaFacturaProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clienteId: '',
    numero: '',
    items: [] as {
      descripcion: string;
      cantidad: number;
      precioUnitario: number;
      impuesto: number;
    }[],
    metodoPago: '',
    notas: ''
  });

  const [itemTemp, setItemTemp] = useState({
    descripcion: '',
    cantidad: 1,
    precioUnitario: 0,
    impuesto: 21
  });

  const calcularSubtotal = () => {
    return formData.items.reduce((sum, item) => 
      sum + (item.cantidad * item.precioUnitario), 0);
  };

  const calcularImpuestos = () => {
    return formData.items.reduce((sum, item) => 
      sum + (item.cantidad * item.precioUnitario * (item.impuesto / 100)), 0);
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularImpuestos();
  };

  const agregarItem = () => {
    if (itemTemp.descripcion && itemTemp.cantidad > 0 && itemTemp.precioUnitario > 0) {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { ...itemTemp }]
      }));
      setItemTemp({
        descripcion: '',
        cantidad: 1,
        precioUnitario: 0,
        impuesto: 21
      });
    }
  };

  const eliminarItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fechaActual = new Date();
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);

    onSubmit({
      ...formData,
      clienteId: parseInt(formData.clienteId),
      fecha: fechaActual.toISOString(),
      fechaVencimiento: fechaVencimiento.toISOString(),
      subtotal: calcularSubtotal(),
      impuestos: calcularImpuestos(),
      total: calcularTotal(),
      estado: 'pendiente'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Nueva Factura</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cliente ID</label>
              <input
                type="text"
                value={formData.clienteId}
                onChange={e => setFormData(prev => ({ ...prev, clienteId: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Factura</label>
              <input
                type="text"
                value={formData.numero}
                onChange={e => setFormData(prev => ({ ...prev, numero: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Items</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Descripción"
                value={itemTemp.descripcion}
                onChange={e => setItemTemp(prev => ({ ...prev, descripcion: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={itemTemp.cantidad}
                onChange={e => setItemTemp(prev => ({ ...prev, cantidad: Number(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Precio Unitario"
                value={itemTemp.precioUnitario}
                onChange={e => setItemTemp(prev => ({ ...prev, precioUnitario: Number(e.target.value) }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={agregarItem}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Agregar Item
              </button>
            </div>

            <div className="mt-4">
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2">
                  <div className="flex-1">
                    <p className="font-medium">{item.descripcion}</p>
                    <p className="text-sm text-gray-600">
                      {item.cantidad} x ${item.precioUnitario} 
                      (IVA: {item.impuesto}%)
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">
                      ${(item.cantidad * item.precioUnitario * (1 + item.impuesto / 100)).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => eliminarItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
              <select
                value={formData.metodoPago}
                onChange={e => setFormData(prev => ({ ...prev, metodoPago: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Seleccionar método</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="tarjeta">Tarjeta de Crédito</option>
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
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-end space-y-2">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${calcularSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos:</span>
                  <span className="font-medium">${calcularImpuestos().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${calcularTotal().toFixed(2)}</span>
                </div>
              </div>
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
              Crear Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaFactura;