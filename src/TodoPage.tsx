import { useEffect, useMemo, useState } from 'react'
import { CreateTodoCreateTodosPostData, DeleteTodosDeleteTodosTodoIdDeleteData, PaginateModel_Todo_, Todo, TodoDto, UpdateTodosUpdateTodosTodoIdPostData, createTodoCreateTodosPost, deleteTodosDeleteTodosTodoIdDelete, readTodosGetTodosGet, updateTodosUpdateTodosTodoIdPost } from './client'
import { Button } from '@mui/material'
import dayjs from 'dayjs'

function TodoPage() {

  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [userId, setUserId] = useState<number>(1)
  const [addTodoItem, setAddtodoItem] = useState<string>('')
  const [addTodoPlanTime, setAddtodoPlanTime] = useState<string>('')
  const [updateTodoItem, setUpdatetodoItem] = useState<string>('')
  const [updateTodoPlanTime, setUpdatetodoPlanTime] = useState<string>('')

  const hasNext = useMemo(() => {
    return todoPage === undefined || todoPage.total_items - page * perPage < 0
  }, [perPage, page, todoPage])

  const hasPrev = useMemo(() => {
    return todoPage === undefined || page < 2
  }, [page, todoPage])

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


  const nextPageTodos = async () => {
    setPage(page + 1)
  }

  const prevPageTodos = async () => {
    setPage(page - 1)
  }

  useEffect(() => {
    fetchTodos(page, perPage)
  }, [page, perPage])


  const NextPageButton = <Button onClick={nextPageTodos} disabled={hasNext}>Next page</Button>
  const PrevPageButton = <Button onClick={prevPageTodos} disabled={hasPrev}>Prev page</Button>


  const GetTodoPageButton = <Button onClick={() => fetchTodos(page, perPage)}>get todo page</Button>

  const todoRows = todoPage?.items.map(item => (
    <tr key={item.id}>
      <td>{item.item}</td>
      <td>{dayjs(item.create_time).format('YYYY-MM-DD HH:mm')}</td>
      <td>{dayjs(item.plan_time).format('YYYY-MM-DD HH:mm')}</td>
      <td>
        <Button onClick={() => deleteTodo(item.id!)} >delete</Button>
        <Button onClick={() => updateTodo(item.id!)} >update</Button>
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

  const perPageOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ]

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(event.target.value))
  };



  if (todoPage)
    return (
      <>
        {GetTodoPageButton}
        <div>
          <table style={{ border: '1px solid black' }}>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Create time</th>
                <th>Plan time</th>
              </tr>
              {todoRows}
            </tbody>
          </table>

          <div>
            Page: {todoPage.page} &nbsp;
            Per Page:
            <select value={perPage} onChange={handlePerPageChange}>
              {perPageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            &nbsp;
            Total: {todoPage.total_items}
            {PrevPageButton}
            {NextPageButton}
            <div>
              <label htmlFor="addItemName">newItemName: </label>
              <input type="text" value={addTodoItem} onChange={handleTodoItemChange} name="item"></input>

              <label htmlFor="addItemName">newPlanTime: </label>
              <input type="datetime-local" value={addTodoPlanTime} onChange={handleTodoPlanTimeChange} name="item"></input>
              <button onClick={createTodo}>summit</button>
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
    )


  return (
    <>
      {GetTodoPageButton}
    </>
  )
}

export default TodoPage