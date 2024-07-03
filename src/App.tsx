import { useState } from 'react'
import './App.css'
import TodoPage from './TodoPage'


function App() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('Harry')

  const handleClick = () => {
    setOpen(!open);
  };

  const changeName = () => {
    setName("Charles")
  }

  return (
    <>
      <TodoPage></TodoPage>
    </>
  );
}

export default App
