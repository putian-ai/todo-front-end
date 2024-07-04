import { useEffect, useMemo, useState } from 'react'
import { CreateTodoCreateTodosPostData, PaginateModel_Todo_, Todo, TodoDto, createTodoCreateTodosPost, readTodosGetTodosGet } from './client'
import { Button } from '@mui/material'
import dayjs from 'dayjs'

function TodoPage() {

  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [userId, setUserId] = useState<number>(1)
  const [todoItem, settodoItem] = useState<string>('')
  const [todoPlanTime, settodoPlanTime] = useState<string>('')

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
        item: todoItem,
        plan_time: dayjs(todoPlanTime).format('YYYY-MM-DD HH:mm:ss'),
        user_id: userId
      }
    }
    await createTodoCreateTodosPost(data)
    fetchTodos(page, perPage)
  }

  const deleteTodo = async (id: number) => {
    console.log(`Delete: ${id}`)
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
      </td>
    </tr>
  ))

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settodoItem(event.target.value);
  };

  const handleTodoPlanTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settodoPlanTime(event.target.value);
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
              <input type="text" value={todoItem} onChange={handleTodoItemChange} name="item"></input>

              <label htmlFor="addItemName">newPlanTime: </label>
              <input type="datetime-local" value={todoPlanTime} onChange={handleTodoPlanTimeChange} name="item"></input>
              <button onClick={createTodo}>summit</button>
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