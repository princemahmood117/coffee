import { Link, useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeeCard from "./components/CoffeeCard";
import { useState } from "react";

function App() {
  const loadedCoffees = useLoaderData();

  const [coffees,setCoffees] = useState(loadedCoffees)

  return (
    <>
      <nav className="flex justify-center gap-4">
        <Link to="/addCoffee">
      
          <button className="btn"> Add </button>
        </Link>

        <Link to="/login">

          <button className="btn"> Login </button>
        </Link>

        <Link to="/register">

          <button className="btn"> Register </button>
        </Link>

        <Link to="/user">

          <button className="btn"> User </button>
        </Link>
      </nav>

      <div className="m-20">
        <h1 className="text-purple-600 text-3xl text-center">
          Total Coffee : {coffees.length}
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

        {
        coffees.map((coffee) => (
          <CoffeeCard key={coffee._id} coffee={coffee}
          coffees = {coffees} setCoffees = {setCoffees}
          ></CoffeeCard>
        ))
        
        }
        </div>

   
      </div>
    </>
  );
}

export default App;
