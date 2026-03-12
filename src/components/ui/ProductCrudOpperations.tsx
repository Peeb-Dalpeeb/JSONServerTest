import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Product = {
  id: string;
  name: string;
  price: string;
  url: string;
};

type productFormData = {
  name: string;
  price: string;
  url: string;
};

export default function ProductCrudOpperations() {
  const [products, setProducts] = useState<Product[]>([]);
  const { register, handleSubmit, reset } = useForm<productFormData>();

  const storeProduct = (formData: productFormData) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...formData,
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    reset();
  };

  return (
    <div>
      <h1>Product CRUD Operations</h1>
      <form
        className="mt-4 flex flex-col gap-4"
        onSubmit={handleSubmit(storeProduct)}
      >
        <div>
          <label htmlFor="pname">Product Name</label>
          <input
            type="text"
            placeholder="Enter the product Name"
            id="pname"
            className="flex border border-gray-300 p-2"
            {...register('name')}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            placeholder="Enter the product price"
            id="price"
            className="flex border border-gray-300 p-2"
            {...register('price')}
          />
          <div>
            <label htmlFor="url">Image URL</label>
            <input
              type="text"
              placeholder="Enter the product image URL"
              id="url"
              className="flex border border-gray-300 p-2"
              {...register('url')}
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600 active:scale-95"
        >
          Add Product
        </button>
      </form>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-gray-300 p-4 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-101 active:scale-95"
          >
            <img
              src={product.url}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
