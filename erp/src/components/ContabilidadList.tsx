import React, { useState } from 'react';
import { DollarSign, TrendingUp, PieChart, Download, Filter, Calendar } from 'lucide-react';

const ContabilidadList = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('este-mes');
  
  // Datos de ejemplo
  const resumenFinanciero = {
    ingresos: 125000,
    gastos: 85000,
    beneficio: 40000,
    cuentasPorCobrar: 35000,
    cuentasPorPagar: 25000
  };

  const transaccionesRecientes = [
    { id: 1, tipo: 'ingreso', concepto: 'Factura #1234', monto: 1500, fecha: '2024-03-28' },
    { id: 2, tipo: 'gasto', concepto: 'Compra Inventario', monto: 800, fecha: '2024-03-27' },
    { id: 3, tipo: 'ingreso', concepto: 'Factura #1235', monto: 2300, fecha: '2024-03-26' },
    { id: 4, tipo: 'gasto', concepto: 'Servicios', monto: 450, fecha: '2024-03-25' }
  ];

  return (
    <div className="space-y-6">
      {/* Filtros de Período */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <select
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="hoy">Hoy</option>
            <option value="esta-semana">Esta Semana</option>
            <option value="este-mes">Este Mes</option>
            <option value="este-año">Este Año</option>
          </select>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="h-5 w-5 mr-2" />
          Exportar Informe
        </button>
      </div>

      {/* Resumen Financiero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                ${resumenFinanciero.ingresos.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% vs. mes anterior</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gastos Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                ${resumenFinanciero.gastos.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-red-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm text-red-600">+5% vs. mes anterior</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Beneficio Neto</p>
              <p className="text-2xl font-bold text-gray-900">
                ${resumenFinanciero.beneficio.toLocaleString()}
              </p>
            </div>
            <PieChart className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-600">+8% vs. mes anterior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y Análisis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Flujo de Caja</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <span className="text-gray-500">Gráfico de Flujo de Caja</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Balance General</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Cuentas por Cobrar</span>
                <span className="font-medium">${resumenFinanciero.cuentasPorCobrar.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(resumenFinanciero.cuentasPorCobrar / resumenFinanciero.ingresos) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Cuentas por Pagar</span>
                <span className="font-medium">${resumenFinanciero.cuentasPorPagar.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(resumenFinanciero.cuentasPorPagar / resumenFinanciero.gastos) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transacciones Recientes */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Transacciones Recientes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Concepto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transaccionesRecientes.map((transaccion) => (
                  <tr key={transaccion.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(transaccion.fecha).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaccion.concepto}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaccion.tipo === 'ingreso' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaccion.tipo.charAt(0).toUpperCase() + transaccion.tipo.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm font-medium ${
                        transaccion.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaccion.tipo === 'ingreso' ? '+' : '-'}${transaccion.monto.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContabilidadList;