import React from "react";
import { useDebounceFn } from "ahooks";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";
import SearchComponent from "./SearchTodo";
import { Outlet } from 'react-router-dom'
import { getProtectedProtectedGet, getTodosByItemNameGetTodosByItemNameGet, GetTodosByItemNameGetTodosByItemNameGetData, PaginateModel_Todo_ } from "./client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom, selectedTagIDAtom } from "./atom";
import { LogOut, TestTube } from "lucide-react";
import { useToast } from "./components/ui/use-toast";
import TagList from "./TagList";
import { client } from './client/sdk.gen';


export function Layout() {
  const [page,] = useState<number>(1)
  const [perPage,] = useState<number>(5)
  const [, setSearchTodoPage] = useState<PaginateModel_Todo_>()
  const [, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(tokenAtom)
  const [, setSelectedTagID] = useAtom(selectedTagIDAtom)
  const { toast } = useToast();

  useEffect(() => {
    client.instance.interceptors.request.use((config) => {
      config.headers.set('Authorization', `Bearer ${token}`);
      return config;
    });
  }, [token])


  function logout() {
    setUser(null);
    setToken(null);
    setSelectedTagID(-1);
    toast({
      title: "Goodbye!",
      description: "You have successfully log out!",
    })
  }

  function getProtected() {
    getProtectedProtectedGet()
  }


  const { run: runSearchTodo } = useDebounceFn(
    async (newSearchTerm: string) => {
      handleSearchTodo(newSearchTerm)
    },
    {
      wait: 500,
    },
  );

  const handleSearchTodo = async (newSearchTerm: string) => {
    const data: GetTodosByItemNameGetTodosByItemNameGetData = {
      query: {
        item_name: newSearchTerm,
        page: page,
        per_page: perPage
      }
    }

    const data2 = await getTodosByItemNameGetTodosByItemNameGet(data)
    setSearchTodoPage(data2.data);
  }
  return (
    <div className="flex h-full">
      <div className="w-13 bg-gray-200 ">
        <SearchComponent onSearch={(searchTerm) => runSearchTodo(searchTerm)}></SearchComponent>
        <LogOut onClick={logout} className="h-4 w-4 cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-accent m-5" />
        <TestTube onClick={getProtected} className="h-4 w-4 cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-accent m-5" />
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel >
          <TagList></TagList>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <Outlet />
      </ResizablePanelGroup>
    </div>
  );
}