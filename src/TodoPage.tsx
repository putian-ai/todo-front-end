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

function TodoPage() {
  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [todoItem, setTodoItem] = useState<string>("");
  const [todoPlanTime, setTodoPlanTime] = useState<string>("");

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

  useEffect(() => {
    fetchTodos(page, perPage);
  }, [page, perPage]);

  const NextPageButton = (
    <Button onClick={nextPageTodos} disabled={hasNext}>
      Next page
    </Button>
  );

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


  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(event.target.value))
  };

  const handleTodoItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoItem(event.target.value);
  }

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
