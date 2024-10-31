import React from 'react';
import { TrendingUp, Package, Users, Clock, ShoppingBag, Truck, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const kpis = [
    { title: 'Pedidos Hoy', value: '24', change: '+12%', icon: Package, color: 'blue' },
    { title: 'Eficiencia', value: '96.3%', change: '+2.1%', icon: TrendingUp, color: 'green' },
    { title: 'Empleados Activos', value: '8', change: '0%', icon: Users, color: 'purple' },
    { title: 'Tiempo Promedio', value: '28 min', change: '-5%', icon: Clock, color: 'orange' }
  ];

  const actividadReciente = [
    { tipo: 'pedido', mensaje: 'Nuevo pedido de Supermercados del Valle', tiempo: '5 min' },
    { tipo: 'completado', mensaje: 'Pedido #123 completado por Ana López', tiempo: '15 min' },
    { tipo: 'inventario', mensaje: 'Stock bajo en Producto XYZ', tiempo: '30 min' },
    { tipo: 'empleado', mensaje: 'Carlos Mendoza comenzó su turno', tiempo: '1 hora' }
  ];

  return (
    <div className="space-y-6">
      {/* Header con Bienvenida */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido a Pulla SOFT!</h1>
            <p className="text-blue-100">Sistema integral de gestión empresarial</p>
          </div>
          <Package className="h-16 w-16 opacity-50" />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
              <kpi.icon className={`h-8 w-8 text-${kpi.color}-500`} />
            </div>
            <div className="flex items-center">
              <span className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change} vs. ayer
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos y Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Rendimiento */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento General</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <p>Gráfico de rendimiento</p>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {actividadReciente.map((actividad, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {actividad.tipo === 'pedido' && <ShoppingBag className="h-5 w-5 text-blue-500" />}
                  {actividad.tipo === 'completado' && <Package className="h-5 w-5 text-green-500" />}
                  {actividad.tipo === 'inventario' && <Truck className="h-5 w-5 text-orange-500" />}
                  {actividad.tipo === 'empleado' && <Users className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{actividad.mensaje}</p>
                  <p className="text-xs text-gray-500">Hace {actividad.tiempo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen de Estado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado del Inventario</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Stock Óptimo</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Stock Bajo</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Sin Stock</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pedidos por Estado</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Pendientes</span>
              </div>
              <span className="text-sm font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">En Proceso</span>
              </div>
              <span className="text-sm font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Completados Hoy</span>
              </div>
              <span className="text-sm font-medium">24</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Empleados del Día</h2>
          <div className="space-y-4">
            {['Carlos Mendoza', 'Ana López', 'Jorge Martínez'].map((empleado, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{empleado.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{empleado}</p>
                  <p className="text-xs text-gray-500">{8 - index} pedidos completados</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;