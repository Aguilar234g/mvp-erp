import { useState } from 'react';
import { Producto } from '../types';

const productosIniciales: Producto[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  nombre: `Producto ${index + 1}`,
  cantidad: Math.floor(Math.random() * 100) + 1,
  ubicacion: `${String.fromCharCode(65 + Math.floor(index / 10))}-${String(Math.floor(index % 10)).padStart(2, '0')}`,
  sku: `SKU${String(index + 1).padStart(4, '0')}`,
  peso: Math.random() * 10,
  unidad: ['kg', 'g', 'l', 'ml', 'unidad'][Math.floor(Math.random() * 5)]
}));

export const useInventario = () => {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);

  const agregarProducto = (producto: Omit<Producto, 'id'>) => {
    const nuevoProducto = {
      ...producto,
      id: Math.max(...productos.map(p => p.id)) + 1
    };
    setProductos(prev => [...prev, nuevoProducto]);
  };

  const editarProducto = (id: number, datos: Partial<Producto>) => {
    setProductos(prev => prev.map(producto =>
      producto.id === id ? { ...producto, ...datos } : producto
    ));
  };

  const eliminarProducto = (id: number) => {
    setProductos(prev => prev.filter(producto => producto.id !== id));
  };

  return {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto
  };
};