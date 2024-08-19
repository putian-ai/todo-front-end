import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { Toaster } from './components/ui/toaster';
import { Layout } from './layout';
import PublicPage from './views/public';
import LoginPage from './views/login';
import ProtectedPage from './views/protected';
import TodoPage from './TodoPage';

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: 'fake user' };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: TodoPage,
      },

      {
        path: "protected",
        // loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    id: "login",
    path: "login",
    Component: LoginPage,
  }
]);


function App() {

  return (
    <>
      <div className="h-screen w-screen">
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      </div>
      <Toaster></Toaster>
    </>
  );
}

export default App
