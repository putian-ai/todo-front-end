import { useEffect, useMemo, useState } from 'react'
import { CreateTodoCreateTodosPostData, DeleteTodosDeleteTodosTodoIdDeleteData, PaginateModel_Todo_, Todo, TodoDto, UpdateTodosUpdateTodosTodoIdPostData, createTodoCreateTodosPost, deleteTodosDeleteTodosTodoIdDelete, readTodosGetTodosGet, updateTodosUpdateTodosTodoIdPost } from './client'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import Pagination from './Pagination'
import InlineEdit from './InLineEdit'

function TodoPage() {

  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [userId, setUserId] = useState<number>(1)
  const [addTodoItem, setAddtodoItem] = useState<string>('')
  const [addTodoPlanTime, setAddtodoPlanTime] = useState<string>('')
  const [updateTodoItem, setUpdatetodoItem] = useState<string>('')
  const [updateTodoPlanTime, setUpdatetodoPlanTime] = useState<string>('')
  const [testValue, setTestValue] = useState<string>('Hahahahah')
  const handleTestValueChange = (newValue: string) => {
    setTestValue(newValue)
  }

  const fetchTodos = async (page: number, perPage: number) => {
    const data = await readTodosGetTodosGet({ page: page, perPage: perPage })
    setTodoPage(data)
  }

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
    fetchTodos(page, perPage)
  }


  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
  }

  useEffect(() => {
    fetchTodos(page, perPage)
  }, [page, perPage])


  const GetTodoPageButton = <Button onClick={() => fetchTodos(page, perPage)}>get todo page</Button>

  const todoRows = todoPage?.items.map(item => (
    <tr key={item.id}>
      <td className="border border-gray-200 px-4 py-2">
        {item.item}
      </td>
      <td className="border border-gray-200 px-4 py-2">
      <InlineEdit value={updateTodoItem} onChange={handleClickUpdateTodoItemChange}></InlineEdit>
      </td>
      <td className="border border-gray-200 px-4 py-2">{dayjs(item.create_time).format('YYYY-MM-DD HH:mm')}</td>
      <td className="border border-gray-200 px-4 py-2">{dayjs(item.plan_time).format('YYYY-MM-DD HH:mm')}</td>
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
  const handleClickUpdateTodoItemChange = (newTodoItem: string) => {
    setUpdatetodoItem(newTodoItem);
  };
  const handleUpdateTodoPlanTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatetodoPlanTime(event.target.value);
  };


  if (todoPage)
    return (
      <>
        {GetTodoPageButton}
        <div>
          <table className="table-auto w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100 text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Item
                </th>
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


            <div>
              <label htmlFor="updateItemName">newItemName: </label>
              <input type="text" value={updateTodoItem} onChange={handleUpdateTodoItemChange} name="item"></input>

              <label htmlFor="updateItemName">newPlanTime: </label>
              <input type="datetime-local" value={updateTodoPlanTime} onChange={handleUpdateTodoPlanTimeChange} name="item"></input>



              <InlineEdit value={testValue} onChange={handleTestValueChange}></InlineEdit>
            </div>

          </div>

        </div>


      </>
    )


  return (
    <>
      {GetTodoPageButton}
    </>
  )
}

export default TodoPage