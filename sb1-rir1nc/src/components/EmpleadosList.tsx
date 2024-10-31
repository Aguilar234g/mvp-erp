import React from 'react';
import { Mail, Phone, Calendar, Award, BarChart2, PackageCheck } from 'lucide-react';
import { Empleado } from '../types';

interface EmpleadosListProps {
  empleados: Empleado[];
  onActualizarEstado: (id: number, estado: Empleado['estado']) => void;
}

const estadoColors = {
  activo: 'bg-green-100 text-green-800',
  inactivo: 'bg-red-100 text-red-800',
  vacaciones: 'bg-blue-100 text-blue-800'
};

const EmpleadosList: React.FC<EmpleadosListProps> = ({ empleados, onActualizarEstado }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {empleados.map((empleado) => (
        <div key={empleado.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <img
                src={empleado.foto}
                alt={`${empleado.nombre} ${empleado.apellido}`}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {empleado.nombre} {empleado.apellido}
                </h3>
                <p className="text-sm text-gray-500">{empleado.cargo}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${estadoColors[empleado.estado]}`}>
                  {empleado.estado.charAt(0).toUpperCase() + empleado.estado.slice(1)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-sm text-gray-500">
                <Award className="h-4 w-4 mr-2" />
                {empleado.departamento}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                {empleado.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                {empleado.telefono}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Contratado: {new Date(empleado.fechaContratacion).toLocaleDateString()}
              </div>
            </div>

            {empleado.pedidosCompletados !== undefined && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <PackageCheck className="h-4 w-4 mr-2" />
                    Pedidos completados
                  </div>
                  <span className="font-semibold">{empleado.pedidosCompletados}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Eficiencia
                  </div>
                  <span className="font-semibold">{empleado.eficienciaPromedio}%</span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <select
                value={empleado.estado}
                onChange={(e) => onActualizarEstado(empleado.id, e.target.value as Empleado['estado'])}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="vacaciones">Vacaciones</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpleadosList;