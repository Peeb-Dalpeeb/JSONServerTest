import { useState } from 'react';

export default function TestObjectStateVariable() {
  const [employee, setEmployee] = useState({
    id: crypto.randomUUID(),
    name: 'John',
    age: 30,
    city: 'New York',
    lastName: 'Doe',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  });

  let updateObjectValue = () => {
    setEmployee({ ...employee, name: 'Jane' });
  }
  return (
    <div>
      <h1>Employee Information</h1>
      <p>ID: {employee.id}</p>
      <p>Name: {employee.name}</p>
      <p>Age: {employee.age}</p>
      <p>City: {employee.city}</p>
      <p>Last Name: {employee.lastName}</p>
      <p>
        Address: {employee.address.street}, {employee.address.city},{' '}
        {employee.address.state} {employee.address.zip}
      </p>
      <label htmlFor="employee-age">Employee Age</label>
      <input
        type="text"
        name="age"
        title="Employee Age"
        placeholder="Enter age..."
        onChange={(event) =>
          setEmployee({ ...employee, age: Number(event.target.value) })
        }
      />
      <input className='bg-gray-200 p-2 hover:bg-gray-100 transition-colors' type="button" value="Update Name" onClick={updateObjectValue} />
    </div>
  );
}
