import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [nombre, setNombre] = useState("")

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)),
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault()
    // Should implement
    setItems([...items, {text: nombre, id: Date.now(), completed: false }])


    setNombre("")
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  console.log(items)
  if(items?.length === 0) return <h1>Cargando...</h1>

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input onChange={(e)=> setNombre(e.target.value)} 
         name="text" type="text" value={nombre} />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            {item.text} <button onClick={() => handleRemove(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
