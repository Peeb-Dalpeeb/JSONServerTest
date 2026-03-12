import React, { useState } from 'react';

type ProductState = { id: string; name: string; price: string; url: string };

export default function ProductCrudOperations() {
  const [products, setProducts] = useState<ProductState[]>([]); // The "Database"
  // The `id` is removed from the initial state for the form, as it's no longer needed there.
  const [item, setItem] = useState({ name: '', price: '', url: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // We no longer need to specify the type here, TypeScript can infer it.
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDATION: Check if any of the required fields are empty.
    if (!item.name || !item.price || !item.url) {
      alert('Please fill out all fields before saving.');
      return;
    }

    // Create the new product object with a unique ID
    const newProduct = {
      id: crypto.randomUUID(), // Generate a unique ID
      ...item, // Copy the name, price, and url from the form state
    };

    setProducts((prev) => [...prev, newProduct]); // Add the complete product to the list
    console.log(products);
    setItem({ name: '', price: '', url: '' }); // Reset form
  };

  const deleteProduct = (idToDelete: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== idToDelete));
  };

  return (
    <div>
      <h1>Product CRUD Operations</h1>
      <form onSubmit={handleSave} className="mt-4 flex flex-col gap-3">
        <input
          type="text"
          className="rounded border p-2"
          name="name"
          placeholder="Name"
          value={item.name}
          onChange={handleChange}
        />
        <input
          type="text"
          className="rounded border p-2"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
        />
        <input
          type="text"
          className="rounded border p-2"
          name="url"
          placeholder="URL"
          value={item.url}
          onChange={handleChange}
        />
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:scale-95"
          type="submit"
        >
          Save
        </button>
      </form>

      {/* ⚡ See the results immediately */}
      <h2 className="mt-8 text-xl font-bold">Product List</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((I) => (
          <div key={I.id} className="rounded-lg border p-4 shadow-md">
            <img
              src={I.url}
              alt={I.name}
              className="h-40 w-full rounded-md object-cover"
            />
            <div className="mt-4 flex flex-col">
              <h3 className="text-lg font-semibold">{I.name}</h3>
              <p className="mt-2 text-gray-600">${I.price}</p>
              <p className="mt-2 text-sm text-gray-400">ID: {I.id}</p>
              <button
                onClick={() => deleteProduct(I.id)}
                type="button"
                value="delete"
                className="mt-4 rounded bg-blue-200 px-4 py-2 text-white hover:bg-blue-500 active:scale-95"
              >
                Update
              </button>
              <button
                onClick={() => deleteProduct(I.id)}
                type="button"
                value="delete"
                className="mt-4 rounded bg-red-200 px-4 py-2 text-white hover:bg-red-500 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
