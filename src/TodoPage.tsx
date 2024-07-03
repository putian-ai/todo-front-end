import { useEffect, useState } from 'react'
import { PaginateModel_Todo_, Todo, readTodosGetTodosGet } from './client'
import { Button } from '@mui/material'
import dayjs from 'dayjs'

function TodoPage() {

  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)

  const fetchTodos = async (page: number, perpage: number) => {
    const data = await readTodosGetTodosGet({ page: page, perPage: perPage })
    setTodoPage(data)
  }
  const nextPageTodos = async () => {
    setPage(page + 1)
  }

  const hasNext = false


  useEffect(() => {
    fetchTodos(page, perPage)
  }, [page, perPage])


  const NextPageButton = <Button onClick={nextPageTodos}>Next page</Button>


  const GetTodoPageButton = <Button onClick={() => fetchTodos(page, perPage)}>get todo page</Button>

  const todoRows = todoPage?.items.map(item => (
    <tr key={item.id}>
      <td>{item.item}</td>
      <td>{dayjs(item.create_time).format('YYYY-MM-DD HH:mm')}</td>
      <td>{dayjs(item.plan_time).format('YYYY-MM-DD HH:mm')}</td>
    </tr>
  ))



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
            Per Page: {todoPage.per_page} &nbsp;
            Total: {todoPage.total_items}
            {hasNext ? NextPageButton : ''}
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