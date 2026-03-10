import { useState } from 'react';

export default function ArrayOfObjects() {
  const [employees, setEmployees] = useState([
    {
      id: crypto.randomUUID(),
      name: 'John',
      age: 30,
    },
    {
      id: crypto.randomUUID(),
      name: 'Jane',
      age: 25,
    },
    {
      id: crypto.randomUUID(),
      name: 'Bob',
      age: 40,
    },
  ]);

  const addEmployee = () => {
    setEmployees([
      ...employees,
      {
        id: crypto.randomUUID(),
        name: '',
        age: 30,
      },
    ]);
  };

  return (
    <div>
      <h1>Array of Objects</h1>
      <p className="flex flex-wrap gap-4">
        {employees.map((employee) => (
          <div key={employee.id}>
            <p>Name: {employee.name}</p>
            <p>Age: {employee.age}</p>
          </div>
        ))}
      </p>
      <ol className="list-decimal">
        {employees.map((employee) => (
          <li key={employee.id}>
            Name: {employee.name}Age: ({employee.age}){' '}
          </li>
        ))}
      </ol>
      <p>
        {employees.map((emp) => (
          <p key={emp.id}> Name: {emp.name}</p>
        ))}
      </p>
      <div className="flex flex-col gap-2"></div>
    </div>
  );
}
