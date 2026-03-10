import { useState } from 'react';

// Best Practice: Define the "shape" of your data with types.
// This tells TypeScript exactly what an Employee record should contain.
type Employee = {
  id: string;
  name: string;
  age: number; // Age must always be a number in the final list.
};

// The temporary employee in the form can have a null age while the user is typing.
type NewEmployee = {
  id: string;
  name: string;
  age: number | null; // The `|` means the type can be a number OR null.
};

export default function ArrayOfObjects() {
  // The list of employees uses the strict Employee type.
  let [employees, setEmployees] = useState<Employee[]>([
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

  // The state for the input fields. Age starts as null.
  let [employee, setEmployee] = useState<NewEmployee>({
    id: crypto.randomUUID(),
    name: '',
    age: null,
  });

  const addEmployee = () => {
    // Validation: Only add an employee if they have a name and a valid age.
    if (employee.name && employee.age !== null) {
      // Because we checked that age is not null, TypeScript is smart
      // enough to know it must be a number here.
      setEmployees([...employees, { ...employee, age: employee.age }]);

      // Good UX: Reset the form for the next entry.
      setEmployee({
        id: crypto.randomUUID(),
        name: '',
        age: null,
      });
    }
  };

  return (
    <div>
      <h1>Array of Objects</h1>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={employee.name}
        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Age"
        name="age"
        // An input's value must be a string.
        // If our age is null, we show an empty string. Otherwise, we show the number.
        value={employee.age === null ? '' : employee.age}
        onChange={(e) => {
          const ageValue = parseInt(e.target.value);
          // If parseInt results in NaN (e.g., from an empty or text-only string),
          // we set our state to null. Otherwise, we use the parsed number.
          setEmployee({ ...employee, age: isNaN(ageValue) ? null : ageValue });
        }}
      />
      <button onClick={addEmployee}>Add Employee</button>
      <button onClick={() => setEmployees([])}>Clear Employees</button>
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
            Name: {employee.name} Age: ({employee.age}){' '}
          </li>
        ))}
      </ol>
      <p>
        {employees.map((emp) => (
          <p key={emp.id}> Name: {emp.name}</p>
        ))}
      </p>
    </div>
  );
}
