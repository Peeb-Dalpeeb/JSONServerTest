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

  const storeProduct = (formData) => {
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
    </div>
  );
}
