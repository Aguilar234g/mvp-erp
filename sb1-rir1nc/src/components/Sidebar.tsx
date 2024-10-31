import React from 'react';
import { Package, Boxes, ClipboardList, Settings, TrendingUp, Users, ShoppingCart, Users as UsersIcon, FileText, DollarSign } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: Package, text: 'Dashboard' },
    { id: 'pedidos', icon: ClipboardList, text: 'Pedidos' },
    { id: 'inventario', icon: Boxes, text: 'Inventario' },
    { id: 'compras', icon: ShoppingCart, text: 'Compras' },
    { id: 'empleados', icon: Users, text: 'Empleados' },
    { id: 'crm', icon: UsersIcon, text: 'CRM' },
    { id: 'facturacion', icon: FileText, text: 'Facturación' },
    { id: 'contabilidad', icon: DollarSign, text: 'Contabilidad' },
    { id: 'informes', icon: TrendingUp, text: 'Informes' },
    { id: 'configuracion', icon: Settings, text: 'Configuración' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-blue-400" />
          <div>
            <span className="text-xl font-bold">Pulla SOFT</span>
            <span className="text-xs text-gray-400 block">Sistema ERP</span>
          </div>
        </div>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.text}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;