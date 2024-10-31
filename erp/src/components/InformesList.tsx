import React from 'react';
import { BarChart2, TrendingUp, Package, Users, Clock, Calendar } from 'lucide-react';

const InformesList = () => {
  const estadisticasGenerales = {
    pedidosMensuales: 458,
    tiempoPromedioPreparacion: 28,
    eficienciaGlobal: 96.3,
    pedidosRetrasados: 12,
    satisfaccionCliente: 4.8,
    productividadPromedio: 92.5
  };

  const rendimientoPorMes = [
    { mes: 'Enero', pedidos: 420, eficiencia: 94 },
    { mes: 'Febrero', pedidos: 385, eficiencia: 95 },
    { mes: 'Marzo', pedidos: 458, eficiencia: 96 },
  ];

  const empleadosDestacados = [
    { nombre: 'Jorge Martínez', pedidos: 312, eficiencia: 97.8 },
    { nombre: 'Carlos Mendoza', pedidos: 342, eficiencia: 98.5 },
    { nombre: 'Ana López', pedidos: 289, eficiencia: 96.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Panel de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pedidos del Mes</p>
              <p className="text-2xl font-bold text-gray-900">{estadisticasGenerales.pedidosMensuales}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8.3% vs. mes anterior</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{estadisticasGenerales.tiempoPromedioPreparacion} min</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">-12% vs. mes anterior</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eficiencia Global</p>
              <p className="text-2xl font-bold text-gray-900">{estadisticasGenerales.eficienciaGlobal}%</p>
            </div>
            <BarChart2 className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+2.1% vs. mes anterior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rendimiento Mensual */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento Mensual</h3>
        <div className="space-y-4">
          {rendimientoPorMes.map((mes) => (
            <div key={mes.mes} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{mes.mes}</span>
                <span className="text-sm text-gray-500">{mes.pedidos} pedidos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${mes.eficiencia}%` }}
                ></div>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-sm text-gray-600">Eficiencia: {mes.eficiencia}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empleados Destacados */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Empleados Destacados del Mes</h3>
        <div className="space-y-4">
          {empleadosDestacados.map((empleado, index) => (
            <div key={empleado.nombre} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{empleado.nombre}</p>
                  <p className="text-sm text-gray-500">{empleado.pedidos} pedidos</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{empleado.eficiencia}%</p>
                <p className="text-sm text-gray-500">eficiencia</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Pedidos</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Prioridad Alta</span>
              <span className="text-sm font-medium">28%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Prioridad Media</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Prioridad Baja</span>
              <span className="text-sm font-medium">27%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '27%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Calidad</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Satisfacción del Cliente</span>
                <span className="text-sm font-medium">{estadisticasGenerales.satisfaccionCliente}/5.0</span>
              </div>
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(estadisticasGenerales.satisfaccionCliente))}
                {'☆'.repeat(5 - Math.floor(estadisticasGenerales.satisfaccionCliente))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Pedidos Retrasados</span>
                <span className="text-sm font-medium text-red-600">{estadisticasGenerales.pedidosRetrasados}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Productividad Promedio</span>
                <span className="text-sm font-medium">{estadisticasGenerales.productividadPromedio}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformesList;