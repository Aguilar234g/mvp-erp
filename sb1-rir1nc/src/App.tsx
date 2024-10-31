import React, { useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PedidosList from './components/PedidosList';
import EmpleadosList from './components/EmpleadosList';
import InformesList from './components/InformesList';
import InventarioList from './components/InventarioList';
import ConfiguracionProductos from './components/ConfiguracionProductos';
import ComprasList from './components/ComprasList';
import CRMList from './components/CRMList';
import FacturacionList from './components/FacturacionList';
import ContabilidadList from './components/ContabilidadList';
import Filtros from './components/Filtros';
import NuevoPedido from './components/NuevoPedido';
import SearchBar from './components/SearchBar';
import EstadisticasPanel from './components/EstadisticasPanel';
import { usePedidos } from './hooks/usePedidos';
import { useFiltros } from './hooks/useFiltros';
import { useEmpleados } from './hooks/useEmpleados';
import { useInventario } from './hooks/useInventario';
import { useCompras } from './hooks/useCompras';
import { useCRM } from './hooks/useCRM';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNuevoPedido, setShowNuevoPedido] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { pedidos, handleUpdateEstado, handleNuevoPedido, estadisticas } = usePedidos();
  const { filtros, setFiltros, pedidosFiltrados } = useFiltros(pedidos);
  const { empleados, actualizarEstadoEmpleado } = useEmpleados();
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useInventario();
  const { compras, agregarCompra } = useCompras();
  const { 
    clientes, 
    interacciones, 
    oportunidades, 
    agregarCliente, 
    actualizarCliente, 
    agregarInteraccion, 
    agregarOportunidad, 
    actualizarOportunidad 
  } = useCRM();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'pedidos':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <Filtros 
                filtros={filtros}
                onFiltrosChange={setFiltros}
              />
            </div>
            <div className="h-full overflow-x-auto">
              <PedidosList 
                pedidos={pedidosFiltrados}
                onUpdateEstado={handleUpdateEstado}
              />
            </div>
          </div>
        );
      case 'inventario':
        return <InventarioList productos={productos} />;
      case 'compras':
        return <ComprasList compras={compras} onNuevaCompra={agregarCompra} />;
      case 'empleados':
        return (
          <EmpleadosList 
            empleados={empleados}
            onActualizarEstado={actualizarEstadoEmpleado}
          />
        );
      case 'informes':
        return <InformesList />;
      case 'configuracion':
        return (
          <ConfiguracionProductos
            productos={productos}
            onAgregar={agregarProducto}
            onEditar={editarProducto}
            onEliminar={eliminarProducto}
          />
        );
      case 'crm':
        return (
          <CRMList
            clientes={clientes}
            interacciones={interacciones}
            oportunidades={oportunidades}
            onAgregarInteraccion={agregarInteraccion}
          />
        );
      case 'facturacion':
        return <FacturacionList facturas={[]} onNuevaFactura={() => {}} />;
      case 'contabilidad':
        return <ContabilidadList />;
      default:
        return <div>Sección en desarrollo</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
      >
        {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={(section) => {
            setActiveSection(section);
            setShowMobileMenu(false);
          }} 
        />
      </div>

      {/* Overlay for mobile */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900 ml-12 lg:ml-0">
                {activeSection === 'dashboard' ? 'Dashboard' :
                 activeSection === 'pedidos' ? 'Preparación de Pedidos' : 
                 activeSection === 'empleados' ? 'Gestión de Empleados' :
                 activeSection === 'informes' ? 'Informes y Estadísticas' :
                 activeSection === 'inventario' ? 'Inventario' :
                 activeSection === 'compras' ? 'Gestión de Compras' :
                 activeSection === 'configuracion' ? 'Configuración de Productos' :
                 activeSection === 'crm' ? 'Gestión de Clientes (CRM)' :
                 activeSection === 'facturacion' ? 'Facturación' :
                 activeSection === 'contabilidad' ? 'Contabilidad' :
                 'Sección en Desarrollo'}
              </h1>
              {activeSection === 'pedidos' && (
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <SearchBar
                    value={filtros.busqueda}
                    onChange={(value) => setFiltros(prev => ({ ...prev, busqueda: value }))}
                  />
                  <button 
                    onClick={() => setShowNuevoPedido(true)}
                    className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Nuevo Pedido
                  </button>
                </div>
              )}
            </div>

            {activeSection === 'pedidos' && (
              <div className="mt-6 overflow-x-auto">
                <EstadisticasPanel estadisticas={estadisticas} />
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>

        {showNuevoPedido && (
          <NuevoPedido
            onClose={() => setShowNuevoPedido(false)}
            onSubmit={handleNuevoPedido}
          />
        )}
      </div>
    </div>
  );
}

export default App;