import React, { useEffect } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import './App.css'
import { Toaster } from './components/ui/toaster';
import { Layout } from './layout';
import LoginPage from './views/login';
import ProtectedPage from './views/protected';
import TodoPage from './TodoPage';
import { userAtom, UserInfo } from './atom';
import { useAtom } from 'jotai';
import RegisterPage from './views/register';
import { client } from './client';
import { useToast } from './components/ui/use-toast';

client.setConfig({
  baseURL: 'http://127.0.0.1:8001'
});



const authLoader = (getUser: () => UserInfo | null) => async () => {
  const user = getUser();
  if (!user) {
    return redirect('/login')
  }
  return { user }
}

function App() {
  const [user] = useAtom(userAtom);
  const { toast } = useToast();


  useEffect(() => {
    client.instance.interceptors.response.use((response) => { return response; }, (error) => {
      console.error('Failed to set token', error);
      if (error.response.status === 400) {
        console.error(error.response.data);
        toast({
          title: "Error!",
          description: error.response.data.detail
        })
      } else if (error.response.status === 401) {
        toast({
          title: "Error!",
          description: "Unauthorized"
        })
      } else if (error.response.status === 403) {
        toast({
          title: "Error!",
          description: "Forbidden"
        })
      } else if (error.response.status === 404) {
        toast({
          title: "Error!",
          description: "Not Found"
        })
      }
      return Promise.reject(error);
    });
  }, [toast]);


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
    },
    {
      id: "register",
      path: "register",
      loader: () => {
        if (user) {
          return redirect('/');
        }
        return null;
      },
      Component: RegisterPage
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
