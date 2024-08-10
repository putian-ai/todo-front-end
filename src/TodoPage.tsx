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
import { TextField, Box, Container } from '@mui/material'
import dayjs from 'dayjs'
import Pagination from './Pagination'
import InlineTimeEdit from './InLineTimeEdit'
import InlineTextEdit from './InLineTextEdit'
import { useDebounceEffect, useDebounceFn } from 'ahooks'
import InlineMarkDownEdit from './InLineMarkDownEdit'
import { createRoot } from 'react-dom/client'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Markdown from 'react-markdown'
import InlineSelectEdit from './InlineSelectEdit'
import InlineTagEdit from './InLineTagEdit'
import { Button } from './components/ui/button'


function TodoPage() {

  const [todoPage, setTodoPage] = useState<PaginateModel_Todo_>()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)

  const [userId, setUserId] = useState<number>(1)

  const [addTodoItem, setAddtodoItem] = useState<string>('')
  const [addTodoPlanTime, setAddtodoPlanTime] = useState<string>('')

  const [updateTodoItem, setUpdatetodoItem] = useState<string>('')
  const [updateTodoPlanTime, setUpdatetodoPlanTime] = useState<string>('')
  const [updateTodoContent, setUpdatetodoContent] = useState<string>('')
  const [updateTodoImportance, setUpdatetodoImportance] = useState<Importance>(0)



  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [selectedTodo, setSelectedTodo] = useState<Todo>()
  const selectedTodoItem = selectedTodo ? `

  # **${selectedTodo!.item}**

`: null

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


  const createTodo = async () => {
    const data: CreateTodoCreateTodosPostData = {
      requestBody: {
        item: addTodoItem,
        plan_time: dayjs(addTodoPlanTime).format('YYYY-MM-DD HH:mm:ss'),
        user_id: userId,
        content: updateTodoContent,
        importance: updateTodoImportance,
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
        content: todoItem.content ?? '',
        importance: todoItem.importance ?? 0
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

  const handleClickUpdateTodoImportanceChange = async (updateTodoImportance: Importance, todoItem: Todo) => {
    setUpdatetodoImportance(updateTodoImportance)
    const data: UpdateTodosUpdateTodosTodoIdPostData = {
      todoId: todoItem.id!,
      requestBody: {
        item: todoItem.item,
        plan_time: dayjs(todoItem.plan_time).format('YYYY-MM-DD HH:mm:ss'),
        content: todoItem.content ?? '',
        importance: updateTodoImportance
      }
    }
    await updateTodosUpdateTodosTodoIdPost(data)
    await fetchTodos(page, perPage)
  }

  const handleClickDeleteTodoTag = async (deleteTodoTagId: number) => {
    const data: DeleteTagsDeleteTagTagIdDeleteData = {
      tagId: deleteTodoTagId
    }
    const data2: GetTodoByTodoIdGetTodoByTodoIdTodoIdGetData = {
      page: 1,
      perPage: 1,
      todoId: selectedTodo?.id ?? -1
    }

    await deleteTagsDeleteTagTagIdDelete(data)
    // await fetchTodos(page, perPage)
    const selectedDeleteTagTodo = await getTodoByTodoIdGetTodoByTodoIdTodoIdGet(data2)
    setSelectedTodo(selectedDeleteTagTodo.items[0])
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

    const data2: GetTodoByTodoIdGetTodoByTodoIdTodoIdGetData = {
      page: 1,
      perPage: 1,
      todoId: selectedTodo?.id ?? -1
    }

    await createTagCreateTagPost(data)
    // await fetchTodos(page, perPage)
    const selectedAddTagTodo = await getTodoByTodoIdGetTodoByTodoIdTodoIdGet(data2)
    setSelectedTodo(selectedAddTagTodo.items[0])
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

  const todoRows = todoPage?.items.map(item => (
    <tr key={`${item.id}-${item.content}`}>
      <td className="border border-gray-200 px-4 py-2">
        <InlineTextEdit
          item={item}
          value={item.item}
          onChange={(newValue) => runUpdateTodoItem(newValue, item)}
          onClick={clickItem}
        ></InlineTextEdit>
      </td>
      <td className="border border-gray-200 px-4 py-2">{dayjs(item.create_time).format('YYYY-MM-DD HH:mm')}</td>
      <td className="border border-gray-200 px-4 py-2">
        <InlineTimeEdit value={dayjs(item.plan_time).format('YYYY-MM-DD HH:mm')} onChange={(newValue) => runUpdateTodoPlanTime(newValue, item)}>
        </InlineTimeEdit>
      </td>
      <td className="border border-gray-200 px-4 py-2 flex space-x-2">
        <Button onClick={() => deleteTodo(item.id!)} variant="destructive">
          Delete
        </Button>
      </td>
      <td className="border border-gray-200 px-4 py-2">
        <InlineSelectEdit
          value={item.importance ?? 0}
          options={[
            { value: 0, label: 'None' },
            { value: 1, label: 'Low' },
            { value: 2, label: 'Middle' },
            { value: 3, label: 'High' }
          ]}

          //got issues on the type of importance
          onChange={(newImportance) => handleClickUpdateTodoImportanceChange(newImportance, item)}
        ></InlineSelectEdit>
      </td>
    </tr>
  ))

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddtodoItem(event.target.value);
  };

  const handleTodoPlanTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddtodoPlanTime(event.target.value);
  };


  const handleUpdateTodoImportanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(event.target.value, 10) as Importance;
    setUpdatetodoImportance(newValue);
  };


  if (todoPage)
    return (

      <div>
        <div className="flex flex-row w-full">
          <div className='h-screen overflow-y-auto p-10 flex-none w-[1000px]'>
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
                  <th className="px-4 py-2 bg-gray-100 text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Importance
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

                <label htmlFor="addImportance" className="text-gray-700">Importance: </label>
                <select value={updateTodoImportance} onChange={handleUpdateTodoImportanceChange} className="border rounded-md px-2 py-1">
                  <option value={0}>None</option>
                  <option value={1}>Low</option>
                  <option value={2}>Middle</option>
                  <option value={3}>High</option>
                </select>



                <button onClick={createTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
              </div>
            </div>

          </div>
          <div className='h-screen overflow-y-auto p-10 flex-none w-[1000px]'>
            {selectedTodo ?
              <div >

                <InlineTagEdit value={selectedTodo.tags ?? []} item={selectedTodo} onDelete={(index) => handleClickDeleteTodoTag(index)} onAddition={(newTagName, newTodoUserId) => handleClickAdditionTodoTag(newTagName, newTodoUserId)}></InlineTagEdit>

                <Markdown className='text-4xl flex justify-start'>
                  {selectedTodoItem}
                </Markdown>
                <InlineMarkDownEdit value={selectedTodo.content ?? ''} onChange={(newContent) => runUpdateTodoContent(newContent, selectedTodo)}></InlineMarkDownEdit>
              </div> :
              <span>Pick one!</span>
            }
          </div>
        </div>
      </div>
    );


  return (
    <>
      {GetTodoPageButton}
    </>
  )

}

export default TodoPage
