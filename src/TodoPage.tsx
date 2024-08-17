import { useEffect, useMemo, useState } from 'react'
import {
  CreateTodoCreateTodosPostData, DeleteTodosDeleteTodosTodoIdDeleteData, PaginateModel_Todo_, Todo, TodoDto, UpdateTodosUpdateTodosTodoIdPostData, createTodoCreateTodosPost, deleteTodosDeleteTodosTodoIdDelete, readTodosGetTodosGet, updateTodosUpdateTodosTodoIdPost,
  getTodosByItemNameGetTodosByItemNameItemNameGet,
  Importance,
  DeleteTagsDeleteTagTagIdDeleteData,
  deleteTagsDeleteTagTagIdDelete,
  createTagCreateTagPost,
  CreateTagCreateTagPostData,
  GetTodoByTodoIdGetTodoByTodoIdTodoIdGetData,
  getTodoByTodoIdGetTodoByTodoIdTodoIdGet,
} from './client'
import { TextField, Box } from '@mui/material'
import dayjs from 'dayjs'
// import Pagination from './Pagination'
import InlineTimeEdit from './InLineTimeEdit'
import InlineTextEdit from './InLineTextEdit'
import { useDebounceEffect, useDebounceFn } from 'ahooks'
import InlineMarkDownEdit from './InLineMarkDownEdit'
import Markdown from 'react-markdown'
import InlineSelectEdit from './InlineSelectEdit'
import InlineTagEdit from './InLineTagEdit'
import { Button } from './components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { TodoTableData, columns } from "./columns"
import { DataTable } from "./data-table"
import TodoItem from './TodoItem'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import PaginationDemo from './Pagination'
import { useToast } from './components/ui/use-toast'

function TodoPage() {

  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const { toast } = useToast()


  const [userId, setUserId] = useState<number>(1)

  const [addTodoItem, setAddtodoItem] = useState<string>('')
  const [addTodoPlanTime, setAddtodoPlanTime] = useState<string>('')

  const [updateTodoItem, setUpdatetodoItem] = useState<string>('')
  const [updateTodoContent, setUpdatetodoContent] = useState<string>('')
  const [updateTodoImportance, setUpdatetodoImportance] = useState<Importance>(0)



  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [selectedTodo, setSelectedTodo] = useState<Todo>()

  // TODO: needs to be delete
  const [tempTodoTagColorString, setTempTodoTagColorString] = useState("1111111")




  //////////////////////////////////////////////////////////////////////////增查删改
  const fetchTodos = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      const data = await readTodosGetTodosGet({ page: page, perPage: perPage })
      setTodoPage(data);
      // let result2 = data.items.find((item) => item.id == selectedTodo?.id)
      // if (result2) setSelectedTodo(result2)
    } catch (error) {
      console.error('Failed to fetch todos', error);
    } finally {
      setLoading(false);
    }
  }


  //add method to search todos by its name
  const searchTodos = async (itemName: string, page: number, perPage: number) => {
    setLoading(true);
    try {
      const data = await getTodosByItemNameGetTodosByItemNameItemNameGet({ itemName, page, perPage })
      setTodoPage(data);
    } catch (error) {
      console.error('Failed to search todos', error);
    } finally {
      setLoading(false);
    }
  };



  const deleteTodo = async (id: number) => {
    console.log(`Delete: ${id}`)
    const data: DeleteTodosDeleteTodosTodoIdDeleteData = {
      todoId: id
    }
    await deleteTodosDeleteTodosTodoIdDelete(data)
    await fetchTodos(page, perPage)
    if (selectedTodo?.id === id) {
      setSelectedTodo(undefined)
    }
  }


  //////////////////////////////////////////////////

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(todoPage?.total_items! / perPage)) {
      setPage(newPage)
    }
    else if (newPage < 1) {
      toast({
        title: "Already first page!",
        description: "That's enough, man!",
      })
    } else {
      toast({
        title: "Already last page!",
        description: "That's enough, man!",
      })
    }
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
  }


  const { run: runUpdateTodoItem } = useDebounceFn(
    async (newTodoItem: string, todoItem: Todo) => {
      handleClickUpdateTodoItemChange(newTodoItem, todoItem)
    },
    {
      wait: 500,
    },
  );

  const handleClickUpdateTodoItemChange = async (newTodoItem: string, todoItem: Todo) => {
    setUpdatetodoItem(newTodoItem);
    const data: UpdateTodosUpdateTodosTodoIdPostData = {
      todoId: todoItem.id!,
      requestBody: {
        item: newTodoItem,
        plan_time: dayjs(todoItem.plan_time).format('YYYY-MM-DD HH:mm:ss'),
        content: todoItem.content ?? '',
        importance: todoItem.importance ?? 0
      }
    }
    await updateTodosUpdateTodosTodoIdPost(data)
    await fetchTodos(page, perPage)
    await updateSelectedTodo()
  };

  const { run: runUpdateTodoPlanTime } = useDebounceFn(
    async (newTodoPlanTime: string, todoItem: Todo) => {
      handleClickUpdateTodoPlanTimeChange(newTodoPlanTime, todoItem)
    },
    {
      wait: 500,
    },
  );

  const handleClickUpdateTodoPlanTimeChange = async (newTodoPlanTime: string, todoItem: Todo) => {
    const data: UpdateTodosUpdateTodosTodoIdPostData = {
      todoId: todoItem.id!,
      requestBody: {
        item: todoItem.item,
        plan_time: dayjs(newTodoPlanTime).format('YYYY-MM-DD HH:mm:ss'),
        content: todoItem.content ?? '',
        importance: todoItem.importance ?? 0
      }
    }
    await updateTodosUpdateTodosTodoIdPost(data)
    await fetchTodos(page, perPage)
  };

  const { run: runUpdateTodoContent } = useDebounceFn(
    async (newTodoContent: string, todoItem: Todo) => {
      handleClickUpdateTodoContentChange(newTodoContent, todoItem)
    },
    {
      wait: 500,
    },
  );

  const handleClickUpdateTodoContentChange = async (newTodoContent: string, todoItem: Todo) => {
    setUpdatetodoContent(newTodoContent);
    const data: UpdateTodosUpdateTodosTodoIdPostData = {
      todoId: todoItem.id!,
      requestBody: {
        item: todoItem.item,
        plan_time: dayjs(todoItem.plan_time).format('YYYY-MM-DD HH:mm:ss'),
        content: newTodoContent,
        importance: todoItem.importance ?? 0
      }
    }
    await updateTodosUpdateTodosTodoIdPost(data)
    await fetchTodos(page, perPage)
    if (selectedTodo) selectedTodo!.content = newTodoContent
  };


  const handleClickDeleteTodoTag = async (deleteTodoTagId: number) => {
    const data: DeleteTagsDeleteTagTagIdDeleteData = {
      tagId: deleteTodoTagId
    }
    await deleteTagsDeleteTagTagIdDelete(data)
    await updateSelectedTodo()
  }

  const handleClickAdditionTodoTag = async (newTodoTagName: string, newTodoTagUserId: number) => {
    if (!selectedTodo) {
      throw new Error('NO SELECTED ERROR!')
    }
    const data: CreateTagCreateTagPostData = {
      requestBody: {
        todo_id: selectedTodo?.id,
        user_id: newTodoTagUserId,
        name: newTodoTagName,
        color: tempTodoTagColorString
      }
    }
    await createTagCreateTagPost(data)
    await updateSelectedTodo()
  }

  const updateSelectedTodo = async () => {
    const data: GetTodoByTodoIdGetTodoByTodoIdTodoIdGetData = {
      todoId: selectedTodo?.id ?? -1
    }

    const todo = await getTodoByTodoIdGetTodoByTodoIdTodoIdGet(data)
    setSelectedTodo(todo)
  }

  //delete searchQuery in hook
  useEffect(() => {
    if (searchQuery) {
      searchTodos(searchQuery, page, perPage);
    } else {
      fetchTodos(page, perPage)
    }
  }, [page, perPage])


  //use debounce for query entering
  useDebounceEffect(
    () => {
      if (searchQuery) {
        searchTodos(searchQuery, page, perPage);
      }
    },
    [searchQuery],
    {
      wait: 500,
    }
  );


  useDebounceEffect(
    () => {
      console.log(updateTodoItem)
    },
    [updateTodoItem],
    {
      wait: 1000,
    },
  );

  useDebounceEffect(
    () => {
      console.log(updateTodoContent)
    },
    [updateTodoContent],
    {
      wait: 1000,
    },
  );

  const clickItem = (item: Todo) => {
    setSelectedTodo(item)
  }

  const GetTodoPageButton = <Button onClick={() => fetchTodos(page, perPage)}>get todo page</Button>


  function handleToggle(index: number): void {

  }
  if (todoPage)

    return (

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>

        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel>

          {/* <DataTable columns={columns} data={todoTableData} /> */}
          {todoPage.items.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              isSelected={selectedTodo?.id === item.id}
              onDelete={() => deleteTodo(item.id!)} // Pass a function to handle deletion
              onCheck={() => handleToggle(item.id)} // Pass a function to handle toggle
              onUpdate={(newValue) => runUpdateTodoItem(newValue, item)}
              onClick={clickItem}
              onTimeUpdate={(newTime) => runUpdateTodoPlanTime(dayjs(newTime).format('YYYY-MM-DD HH:mm:ss'), item)} />
          ))}
          <PaginationDemo currentPage={page} perPage={perPage} totalItems={todoPage.total_items} onPageChange={handlePageChange} onPerPageChange={handlePerPageChange}></PaginationDemo>

        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          {selectedTodo ?
            <div >

              <InlineTagEdit value={selectedTodo.tags ?? []} item={selectedTodo} onDelete={(index) => handleClickDeleteTodoTag(index)} onAddition={(newTagName, newTodoUserId) => handleClickAdditionTodoTag(newTagName, newTodoUserId)}></InlineTagEdit>

              <Markdown className='text-4xl flex justify-start'>
                {selectedTodo.item}
              </Markdown>
              <InlineMarkDownEdit value={selectedTodo.content ?? ''} onChange={(newContent) => runUpdateTodoContent(newContent, selectedTodo)}></InlineMarkDownEdit>
            </div> :
            <span>Pick one!</span>
          }
        </ResizablePanel>
      </ResizablePanelGroup>
    );


  return (
    <>
      {GetTodoPageButton}
    </>
  )

}

export default TodoPage
