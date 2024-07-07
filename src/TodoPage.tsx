<<<<<<< HEAD
import "./TodoPage.css";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  PaginateModel_Todo_,
  readTodosGetTodosGet,
  createTodoCreateTodosPost,
  TodoDto,
} from "./client";

import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
=======
import { useEffect, useMemo, useState } from 'react'
import { CreateTodoCreateTodosPostData, DeleteTodosDeleteTodosTodoIdDeleteData, PaginateModel_Todo_, Todo, TodoDto, UpdateTodosUpdateTodosTodoIdPostData, createTodoCreateTodosPost, deleteTodosDeleteTodosTodoIdDelete, readTodosGetTodosGet, updateTodosUpdateTodosTodoIdPost } from './client'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import Pagination from './Pagination'
>>>>>>> origin/main

function TodoPage() {
  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [todoItem, setTodoItem] = useState<string>("");
  const [todoPlanTime, setTodoPlanTime] = useState<string>("");

<<<<<<< HEAD
  const userId = 1;

  const fetchTodos = async (page: number, perPage: number) => {
    const data = await readTodosGetTodosGet({ page: page, perPage: perPage });
    setTodoPage(data);
  };

  //change to useMemo() for immunity
  const hasNext = useMemo(() => {
    return todoPage === undefined || todoPage.total_items - page * perPage < 0
  }, [perPage, page, todoPage])

  //change to useMemo() for immunity
  const hasPrev = useMemo(() => {
    return todoPage === undefined || page < 2
  }, [page, todoPage])


  const nextPageTodos = () => {
    setPage(page + 1);
  };

  const prevPageTodos = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };




  //update createTodo with twice fetch
  const createTodo = async () => {
    if (todoItem.trim() && todoPlanTime.trim()) {
      try {
        const response = await createTodoCreateTodosPost({
          requestBody: {
            item: todoItem,
            //Edit the format of selecting time
            plan_time: dayjs(todoPlanTime).format('YYYY-MM-DD HH:mm:ss'),
            user_id: userId,
          },
        });

        fetchTodos(page, perPage)

      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };
=======
  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [userId, setUserId] = useState<number>(1)
  const [addTodoItem, setAddtodoItem] = useState<string>('')
  const [addTodoPlanTime, setAddtodoPlanTime] = useState<string>('')
  const [updateTodoItem, setUpdatetodoItem] = useState<string>('')
  const [updateTodoPlanTime, setUpdatetodoPlanTime] = useState<string>('')

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
  }
>>>>>>> origin/main

  useEffect(() => {
    fetchTodos(page, perPage);
  }, [page, perPage]);

  const NextPageButton = (
    <Button onClick={nextPageTodos} disabled={hasNext}>
      Next page
    </Button>
  );

<<<<<<< HEAD
  const PreviousPageButton = (
    <Button onClick={prevPageTodos} disabled={hasPrev}>
      Previous page
    </Button>
  );

  const GetTodoPageButton = (
    <Button onClick={() => fetchTodos(page, perPage)}>Get Todo Page</Button>
  );

  const todoRows = todoPage?.items.map((item) => (
    <tr key={item.id}>
      <td>{item.item}</td>
      <td>{dayjs(item.create_time).format("YYYY-MM-DD HH:mm")}</td>
      <td>{dayjs(item.plan_time).format("YYYY-MM-DD HH:mm")}</td>
=======
  const GetTodoPageButton = <Button onClick={() => fetchTodos(page, perPage)}>get todo page</Button>

  const todoRows = todoPage?.items.map(item => (
    <tr key={item.id}>
      <td className="border border-gray-200 px-4 py-2">
        {item.item}
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
>>>>>>> origin/main
    </tr>
  ));

  const perPageOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ]

  //handle Date Time change
  const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoPlanTime(event.target.value);
  }

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

<<<<<<< HEAD
  const handleTodoItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoItem(event.target.value);
  }
=======
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
            </div>

          </div>

        </div>


      </>
    )

>>>>>>> origin/main

  return (
    <>
      {GetTodoPageButton}
      {todoPage && (
        <div>
          <table style={{ border: "1px solid black" }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Create Time</th>
                <th>Plan Time</th>
              </tr>
            </thead>
            <tbody>{todoRows}</tbody>
          </table>
          <div>
            Page: {todoPage.page} &nbsp;
            Per Page: {todoPage.per_page} &nbsp;
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
            
            {PreviousPageButton}
            {NextPageButton}
          </div>
        </div>
      )}
      
      <div style={{ marginTop: "30px" }}>

        <label htmlFor="addItemName">newItemName: </label>
        <input type="text" value={todoItem} onChange={handleTodoItemChange} name="item">
        </input>

        <div>
          <label htmlFor="datetime-input">Select a date and time: </label>
          {/* Step 3: Set up the input element */}
          <input
            type="datetime-local"
            id="datetime-input"
            value={todoPlanTime}
            onChange={handleDateTimeChange}
          />
        </div>

        <Button
          onClick={createTodo}
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default TodoPage;
