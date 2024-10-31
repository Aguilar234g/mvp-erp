import React, { useState } from 'react';
import { X, Mail, MessageCircle, Send, Paperclip } from 'lucide-react';
import { Cliente } from '../types';

interface ComunicacionModalProps {
  cliente: Cliente;
  tipo: 'email' | 'whatsapp';
  onClose: () => void;
  onEnviar: (datos: { tipo: string; mensaje: string; asunto?: string }) => void;
}

const ComunicacionModal: React.FC<ComunicacionModalProps> = ({
  cliente,
  tipo,
  onClose,
  onEnviar
}) => {
  const [mensaje, setMensaje] = useState('');
  const [asunto, setAsunto] = useState('');
  const [adjunto, setAdjunto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnviar({
      tipo,
      mensaje,
      asunto: tipo === 'email' ? asunto : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            {tipo === 'email' ? (
              <Mail className="h-5 w-5 text-blue-500" />
            ) : (
              <MessageCircle className="h-5 w-5 text-green-500" />
            )}
            <h3 className="text-lg font-semibold">
              {tipo === 'email' ? 'Nuevo Email' : 'Nuevo WhatsApp'} - {cliente.nombre}
            </h3>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Para: {tipo === 'email' ? cliente.email : cliente.telefono}
            </p>
          </div>

          {tipo === 'email' && (
            <div>
              <input
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Asunto"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
          )}

          <div>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder={`Escribe tu ${tipo === 'email' ? 'email' : 'mensaje'}...`}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={6}
              required
            />
          </div>

          {tipo === 'email' && (
            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                <Paperclip className="h-4 w-4" />
                <span>Adjuntar archivo</span>
                <input
                  type="file"
                  onChange={(e) => setAdjunto(e.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              {adjunto && (
                <div className="mt-2 text-sm text-gray-600">
                  Archivo seleccionado: {adjunto.name}
                </div>
              )}
            </div>
          )}

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
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComunicacionModal;