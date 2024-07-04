import "./TodoPage.css";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [newTaskItem, setNewTaskItem] = useState<string>("");
  const [newTaskPlanTime, setNewTaskPlanTime] = useState<string>("");
  const userId = 1; // Assume you have the user ID from your authentication context

  const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskPlanTime(event.target.value);
  };

  const fetchTodos = async (page: number, perPage: number) => {
    const data = await readTodosGetTodosGet({ page: page, perPage: perPage });
    setTodoPage(data);
  };

  const nextPageTodos = () => {
    setPage(page + 1);
  };

  const prevPageTodos = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const hasNext = () => {
    if (!todoPage) return false;
    return page < Math.ceil(todoPage.total_items / perPage);
  };

  const addTask = async () => {
    if (newTaskItem.trim() && newTaskPlanTime.trim()) {
      try {
        const response = await createTodoCreateTodosPost({
          requestBody: {
            item: newTaskItem,
            plan_time: dayjs(newTaskPlanTime).format("YYYY-MM-DD HH:mm:ss"),
            user_id: userId,
          },
        });

        // Assuming response contains the created task
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
        setNewTaskItem("");
        setNewTaskPlanTime("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  useEffect(() => {
    fetchTodos(page, perPage);
  }, [page, perPage]);

  const NextPageButton = (
    <Button onClick={nextPageTodos} disabled={!hasNext()}>
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
          value={newTaskItem}
          onChange={(e) => setNewTaskItem(e.target.value)}
          variant="outlined"
        />
        <div>
          <label htmlFor="datetime-input">Select a date and time: </label>
          {/* Step 3: Set up the input element */}
          <input
            type="datetime-local"
            id="datetime-input"
            value={newTaskPlanTime}
            onChange={handleDateTimeChange}
          />
        </div>
        <Button
          onClick={addTask}
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
