import { useDebounceFn } from "ahooks";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";
import SearchComponent from "./SearchTodo";
import { Outlet } from 'react-router-dom'
import { CreateTagCreateTagPostData, getProtectedProtectedGet, GetProtectedProtectedGetData, getTodosByItemNameGetTodosByItemNameItemNameGet, GetTodosByItemNameGetTodosByItemNameItemNameGetData, OpenAPI, PaginateModel_Todo_ } from "./client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "./atom";
import { LogOut, TestTube } from "lucide-react";
import { useToast } from "./components/ui/use-toast";



export function Layout() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [searchTodoPage, setSearchTodoPage] = useState<PaginateModel_Todo_>()
  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(tokenAtom)
  const { toast } = useToast();

  useEffect(() => {
    OpenAPI.interceptors.request.use((config) => {
      config.headers = { 'Authorization': `Bearer ${token}` }
      return config;
    });
  }, [token])


  function logout() {
    setUser(null);
    setToken(null);
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
    const data: GetTodosByItemNameGetTodosByItemNameItemNameGetData = {
      itemName: newSearchTerm,
      page: page,
      perPage: perPage
    }
    const data2 = await getTodosByItemNameGetTodosByItemNameItemNameGet(data)
    setSearchTodoPage(data2);
  }
  return (

    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <SearchComponent onSearch={(searchTerm) => runSearchTodo(searchTerm)}></SearchComponent>
        <LogOut onClick={logout} className="h-4 w-4 cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-accent m-5" />
        <TestTube onClick={getProtected} className="h-4 w-4 cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-accent m-5" />

        {JSON.stringify(user)}
      </ResizablePanel>

      <ResizableHandle withHandle />

      <Outlet />
    </ResizablePanelGroup>
  );
}