import { useEffect, useMemo, useState } from 'react'
import {
  CreateTodoCreateTodosPostData, DeleteTodosDeleteTodosTodoIdDeleteData, PaginateModel_Todo_, Todo, TodoDto, UpdateTodosUpdateTodosTodoIdPostData, createTodoCreateTodosPost, deleteTodosDeleteTodosTodoIdDelete, readTodosGetTodosGet, updateTodosUpdateTodosTodoIdPost,
  getTodosByItemNameGetTodosByItemNameItemNameGet


} from './client'
import { Button, TextField, Box, Container } from '@mui/material'
import dayjs from 'dayjs'
import Pagination from './Pagination'
import InlineTimeEdit from './InLineTimeEdit'
import InlineTextEdit from './InLineTextEdit'
import { useDebounceEffect, useDebounceFn } from 'ahooks'


function TodoPage() {

  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [userId, setUserId] = useState<number>(1)
  const [addTodoItem, setAddtodoItem] = useState<string>('')
  const [addTodoPlanTime, setAddtodoPlanTime] = useState<string>('')
  const [updateTodoItem, setUpdatetodoItem] = useState<string>('')
  const [updateTodoPlanTime, setUpdatetodoPlanTime] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)



  //////////////////////////////////////////////////////////////////////////增查删改
  const fetchTodos = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      const data = await readTodosGetTodosGet({ page: page, perPage: perPage })
      setTodoPage(data);
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


  const createTodo = async () => {
    const data: CreateTodoCreateTodosPostData = {
      requestBody: {
        item: addTodoItem,
        plan_time: dayjs(addTodoPlanTime).format('YYYY-MM-DD HH:mm:ss'),
        user_id: userId
      }
    }
    await createTodoCreateTodosPost(data)
    fetchTodos(page, perPage)
  }

  const deleteTodo = async (id: number) => {
    console.log(`Delete: ${id}`)
    const data: DeleteTodosDeleteTodosTodoIdDeleteData = {
      todoId: id
    }
    await deleteTodosDeleteTodosTodoIdDelete(data)
    fetchTodos(page, perPage)
  }

  const updateTodo = async (id: number) => {
    console.log(`Update: ${id}`)
    const data: UpdateTodosUpdateTodosTodoIdPostData = {
      todoId: id,
      requestBody: {
        item: updateTodoItem,
        plan_time: dayjs(updateTodoPlanTime).format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    await updateTodosUpdateTodosTodoIdPost(data)
    await fetchTodos(page, perPage)
  }
  //////////////////////////////////////////////////

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
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
      }
    }
    await updateTodosUpdateTodosTodoIdPost(data)
    await fetchTodos(page, perPage)
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
    setUpdatetodoPlanTime(newTodoPlanTime);
    const data: UpdateTodosUpdateTodosTodoIdPostData = {
      todoId: todoItem.id!,
      requestBody: {
        item: todoItem.item,
        plan_time: dayjs(newTodoPlanTime).format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    await updateTodosUpdateTodosTodoIdPost(data)
    await fetchTodos(page, perPage)
  };

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


  //revise search with debounce
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  useDebounceEffect(
    () => {
      console.log(updateTodoItem)
    },
    [updateTodoItem],
    {
      wait: 1000,
    },
  );


  const GetTodoPageButton = <Button onClick={() => fetchTodos(page, perPage)}>get todo page</Button>

  const todoRows = todoPage?.items.map(item => (
    <tr key={item.id}>
      <td className="border border-gray-200 px-4 py-2">
        <InlineTextEdit
          value={item.item}
          onChange={(newValue) => runUpdateTodoItem(newValue, item)}
        ></InlineTextEdit>
      </td>
      <td className="border border-gray-200 px-4 py-2">{dayjs(item.create_time).format('YYYY-MM-DD HH:mm')}</td>
      <td className="border border-gray-200 px-4 py-2">
        <InlineTimeEdit value={dayjs(item.plan_time).format('YYYY-MM-DD HH:mm')} onChange={(newValue) => runUpdateTodoPlanTime(newValue, item)}>
        </InlineTimeEdit>
      </td>
      <td className="border border-gray-200 px-4 py-2 flex space-x-2">
        <Button onClick={() => deleteTodo(item.id!)} className="text-red-500 hover:text-red-700">
          Delete
        </Button>
        <Button onClick={() => updateTodo(item.id!)} className="text-blue-500 hover:text-blue-700">
          Update
        </Button>
      </td>
    </tr>
  ))

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddtodoItem(event.target.value);
  };

  const handleTodoPlanTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddtodoPlanTime(event.target.value);
  };

  const handleUpdateTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatetodoItem(event.target.value);
  };
  const handleUpdateTodoPlanTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatetodoPlanTime(event.target.value);
  };


  if (todoPage)
    return (

      <Container>
        <Button onClick={() => fetchTodos(page, perPage)}>Get Todo Page</Button>
        <Box my={4}>
          <TextField
            label="Search Todos"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box></Box>
        <>

          <div>

            <table className="table-auto w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-100 text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Create Time
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Plan Time
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todoRows}
              </tbody>
            </table>


            <Pagination
              currentPage={page}
              perPage={perPage}
              totalItems={todoPage.total_items}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            >
            </Pagination>


            <div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="addItemName" className="text-gray-700">newItemName: </label>
                <input type="text" value={addTodoItem} onChange={handleTodoItemChange} name="item" className="border rounded-md px-2 py-1" />


                <label htmlFor="addItemName" className="text-gray-700">newPlanTime: </label>
                <input type="datetime-local" value={addTodoPlanTime} onChange={handleTodoPlanTimeChange} name="item" className="border rounded-md px-2 py-1" />


                <button onClick={createTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="addItemName" className="text-gray-700">newItemName: </label>
                <input type="text" value={addTodoItem} onChange={handleTodoItemChange} name="item" className="border rounded-md px-2 py-1" />

                <label htmlFor="addItemName" className="text-gray-700">newPlanTime: </label>
                <input type="datetime-local" value={addTodoPlanTime} onChange={handleTodoPlanTimeChange} name="item" className="border rounded-md px-2 py-1" />

                <button onClick={createTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
              </div>


              <div>
                <label htmlFor="updateItemName">newItemName: </label>
                <input type="text" value={updateTodoItem} onChange={handleUpdateTodoItemChange} name="item"></input>

                <label htmlFor="updateItemName">newPlanTime: </label>
                <input type="datetime-local" value={updateTodoPlanTime} onChange={handleUpdateTodoPlanTimeChange} name="item"></input>
              </div>

            </div>

          </div>


        </>
      </Container>
    )


  return (
    <>
      {GetTodoPageButton}
    </>
  )

}

export default TodoPage