import React, { useState } from 'react';
import { 
  Users, 
  Phone, 
  Mail, 
  Building2,
  MessageCircle,
  Plus
} from 'lucide-react';
import { Cliente } from '../types';
import ComunicacionModal from './ComunicacionModal';
import { toast } from 'react-hot-toast';

interface CRMListProps {
  clientes: Cliente[];
  interacciones: any[];
  oportunidades: any[];
  onAgregarInteraccion: (interaccion: any) => void;
}

const CRMList: React.FC<CRMListProps> = ({ 
  clientes, 
  interacciones, 
  oportunidades,
  onAgregarInteraccion
}) => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [comunicacionModal, setComunicacionModal] = useState<{
    show: boolean;
    tipo: 'email' | 'whatsapp';
    cliente: Cliente | null;
  }>({
    show: false,
    tipo: 'email',
    cliente: null
  });

  const getEstadoColor = (estado: string) => {
    const colores = {
      activo: 'bg-green-100 text-green-800',
      inactivo: 'bg-red-100 text-red-800',
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_proceso: 'bg-blue-100 text-blue-800',
      completado: 'bg-purple-100 text-purple-800'
    };
    return colores[estado as keyof typeof colores] || 'bg-gray-100 text-gray-800';
  };

  const handleEnviarComunicacion = (datos: { tipo: string; mensaje: string; asunto?: string }) => {
    if (!comunicacionModal.cliente) return;

    // Simular el envío
    setTimeout(() => {
      // Registrar la interacción
      onAgregarInteraccion({
        clienteId: comunicacionModal.cliente?.id,
        tipo: datos.tipo,
        fecha: new Date().toISOString(),
        descripcion: datos.tipo === 'email' ? 
          `Email enviado - Asunto: ${datos.asunto}` : 
          'Mensaje de WhatsApp enviado',
        resultado: 'enviado',
        contenido: datos.mensaje
      });

      // Mostrar notificación
      toast.success(
        datos.tipo === 'email' ? 
        'Email enviado correctamente' : 
        'Mensaje de WhatsApp enviado'
      );
    }, 1000);
  };

  const clientesFiltrados = clientes?.filter(cliente => {
    if (filtroActivo === 'todos') return true;
    return cliente.estado === filtroActivo;
  }) || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestión de Clientes y Relaciones</h2>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFiltroActivo('todos')}
            className={`px-4 py-2 rounded ${
              filtroActivo === 'todos' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltroActivo('activo')}
            className={`px-4 py-2 rounded ${
              filtroActivo === 'activo' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Activos
          </button>
          <button
            onClick={() => setFiltroActivo('inactivo')}
            className={`px-4 py-2 rounded ${
              filtroActivo === 'inactivo' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Inactivos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientesFiltrados.map(cliente => (
          <div
            key={cliente.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{cliente.nombre}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${getEstadoColor(cliente.estado)}`}>
                {cliente.estado}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{cliente.contacto}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{cliente.email}</span>
                </div>
                <button
                  onClick={() => setComunicacionModal({
                    show: true,
                    tipo: 'email',
                    cliente
                  })}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  title="Enviar email"
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{cliente.telefono}</span>
                </div>
                <button
                  onClick={() => setComunicacionModal({
                    show: true,
                    tipo: 'whatsapp',
                    cliente
                  })}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  title="Enviar WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </button>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Building2 className="w-5 h-5 mr-2" />
                <span>{cliente.direccion}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="text-gray-500">Interacciones:</span>
                  <span className="ml-2 font-semibold">
                    {interacciones?.filter(i => i.clienteId === cliente.id).length || 0}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Oportunidades:</span>
                  <span className="ml-2 font-semibold">
                    {oportunidades?.filter(o => o.clienteId === cliente.id).length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clientesFiltrados.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No se encontraron clientes con los filtros seleccionados.</p>
        </div>
      )}

      {comunicacionModal.show && comunicacionModal.cliente && (
        <ComunicacionModal
          cliente={comunicacionModal.cliente}
          tipo={comunicacionModal.tipo}
          onClose={() => setComunicacionModal({ show: false, tipo: 'email', cliente: null })}
          onEnviar={handleEnviarComunicacion}
        />
      )}
    </div>
  );
};

export default CRMList;