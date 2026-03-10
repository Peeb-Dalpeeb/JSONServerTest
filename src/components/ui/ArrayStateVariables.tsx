import { useState } from "react";

export default function ArrayStateVariables() {
    const [names, setNames] = useState<string[]>(['John', 'Jane', 'Bob', 'Alice']);
    return (
        <div>
        <h2>Array State Variables</h2>
        <label htmlFor="name-input">Add Name:</label>
        <input 
            className="border p-1 border-gray-300"
            id="name-input" 
            type="text" 
            title="Enter a name" 
            placeholder="Enter name..." 
        />
        <p>Names is {names} output as whole string format</p>
        <p>Names is {names.join(", ")} separated by , operator</p>
        <p>Names is {names[0]} first element of array</p>
        <hr/>
        <h2>All Student names new paragraph</h2>
        {
            names.map((value,index)=><p key={index}>{value}</p>)
        }
        <hr/>
        <h3>All Student names in un order list format</h3>
        <ul>
            {names.map((name,index)=><li key={index}>{name}</li>)}
        </ul>
        <hr/>
        <h3>All Student names in order list format</h3>
        <ol>
            {names.map((name,index)=><li key={index}>{name}</li>)}
        </ol>
    </div>
    );
}
