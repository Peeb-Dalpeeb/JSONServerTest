import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export interface Product {
  pname: string;
  price: string;
  qty: number;
  id: string;
}

interface productFormData {
  pname: string;
  price: string;
  qty: number;
}

const URL: string = 'http://localhost:3000/products';

export default function PrioductOperations() {
  const [products, setProducts] = useState<Product[]>([]);
  const { register, handleSubmit, reset } = useForm<productFormData>();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
  } = useForm<productFormData>();

  useEffect(() => {
    console.log('Loading products from server...');
    loadProducts();
  }, []);

  const storeItem = async (formData: productFormData) => {
    try {
      const response = await axios.post<Product>(URL, formData);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Server error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const loadProducts = async () => {
    try {
      const response = await axios.get<Product[]>(URL);
      setProducts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Server error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Server error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    resetEdit({
      pname: product.pname,
      price: product.price,
      qty: product.qty,
    });
  };

  const updateItem = async (formData: productFormData) => {
    if (!editingProduct) return;
    try {
      const response = await axios.put<Product>(
        `${URL}/${editingProduct.id}`,
        formData
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? response.data : p))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div>
      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">Update Product</h2>
            <form onSubmit={handleSubmitEdit(updateItem)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  {...registerEdit('pname', { required: true })}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  {...registerEdit('price', { required: true })}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  {...registerEdit('qty', { required: true, min: 0 })}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h1>Product Operation with Rest API using Axios</h1>

      <form onSubmit={handleSubmit(storeItem)}>
        <div className="mb-4">
          <label htmlFor="pname" className="block text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="pname"
            {...register('pname', { required: true })}
            className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="text"
            id="price"
            {...register('price', { required: true })}
            className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="qty" className="block text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="qty"
            {...register('qty', { required: true, min: 0 })}
            className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
      <p>The number of products are: {products.length}</p>
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">
                Product ID
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">
                Product Name
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">Price</th>
              <th className="px-6 py-4 font-medium text-gray-900">Quantity</th>
              <th className="px-6 py-4 font-medium text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs">{product.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.pname}
                </td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.qty}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(product.id)}
                    type="button"
                    className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditModal(product)}
                    className="ml-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
