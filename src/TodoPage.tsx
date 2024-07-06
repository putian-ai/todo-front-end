import "./TodoPage.css";
import { useEffect, useMemo, useState } from "react";
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

        const updatedItems = [response, ...(todoPage?.items || [])];
        if (todoPage) {
          const updatedTodoPage: PaginateModel_Todo_ = {
            ...todoPage,
            items: updatedItems,
          };
          setTodoPage(updatedTodoPage);
        } else {
          fetchTodos(page, perPage);
        }
        setTodoItem("");
        setTodoPlanTime("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  useEffect(() => {
    fetchTodos(page, perPage);
  }, [page, perPage]);

  const NextPageButton = (
    <Button onClick={nextPageTodos} disabled={!hasNext}>
      Next page
    </Button>
  );

  const PreviousPageButton = (
    <Button onClick={prevPageTodos} disabled={page <= 1}>
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
            Page: {todoPage.page} &nbsp; Per Page: {todoPage.per_page} &nbsp;
            Total: {todoPage.total_items}
            {PreviousPageButton}
            {NextPageButton}
          </div>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <TextField
          label="New Task Item"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Plan Time (YYYY-MM-DD HH:mm:ss)"
          value={todoPlanTime}
          onChange={(e) => setTodoPlanTime(e.target.value)}
          variant="outlined"
          style={{ marginLeft: "10px", width: "100%" }}
        />
        <Button
          onClick={createTodo}
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          Add Task
        </Button>
      </div>
    </>
  );
}

export default TodoPage;
