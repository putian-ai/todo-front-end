import './App.css'
import { Toaster } from './components/ui/toaster';
import TodoPage from './TodoPage'


function App() {

  return (
    <>
      <div className="h-screen w-screen">
        <TodoPage></TodoPage>
      </div>
      <Toaster></Toaster>
    </>
  );
}

export default App
