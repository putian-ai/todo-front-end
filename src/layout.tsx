import { useDebounceFn } from "ahooks";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";
import SearchComponent from "./SearchTodo";
import { Outlet } from 'react-router-dom'
import { CreateTagCreateTagPostData, getTodosByItemNameGetTodosByItemNameItemNameGet, GetTodosByItemNameGetTodosByItemNameItemNameGetData, PaginateModel_Todo_ } from "./client";
import { useState } from "react";

export function Layout() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [searchTodoPage, setSearchTodoPage] = useState<PaginateModel_Todo_>()

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
      </ResizablePanel>

      <ResizableHandle withHandle />

      <Outlet />
    </ResizablePanelGroup>
  );
}