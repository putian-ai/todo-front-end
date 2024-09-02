import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import './App.css'
import { Toaster } from './components/ui/toaster';
import { Layout } from './layout';
import PublicPage from './views/public';
import LoginPage from './views/login';
import ProtectedPage from './views/protected';
import TodoPage from './TodoPage';
import { tokenAtom, userAtom, UserInfo } from './atom';
import { useAtom } from 'jotai';

const authLoader = (getUser: () => UserInfo | null) => async () => {
  const user = getUser();
  if (!user) {
    return redirect('/login')
  }
  return { user }
}


function App() {
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);


  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      loader: () => ({ user }),
      Component: Layout,
      children: [
        {
          index: true,
          loader: authLoader(() => user),
          Component: TodoPage,
        },

        {
          path: "protected",
          loader: authLoader(() => user),
          Component: ProtectedPage,
        },
      ],
    },
    {
      id: "login",
      path: "login",
      loader: () => {
        if (user) {
          return redirect('/');
        }
        return null;
      },
      Component: LoginPage,
    }
  ]);

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
