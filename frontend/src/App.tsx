import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [items, setItems] = useState<{ id: number; text: string }[]>([])

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then(setItems)
  }, [])

  const [inputValue, setInputValue] = useState("");

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((item) => {
        setItems((items) => [...items, item]);
        setInputValue("");
      });
  }  

  return (
    <>
      <h1>Full-Stack App</h1>

      <div className="form">
        <form onSubmit={addItem}>
          <input
            id="item-input"
            placeholder="Item text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            autoFocus
          />
          <button
            id="item-submit"
            type="submit"
            disabled={!inputValue.trim()}
          >Add Item</button>
        </form>
      </div>

      <div className="card">
          {items.map((item) => (
            <div key={item.id} className="item-text">{item.text}</div>
          ))}
      </div>
    </>
  )
}

export default App
