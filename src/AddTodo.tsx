import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTodoCreateTodoPost, CreateTodoCreateTodoPostData, Todo } from './client';
import dayjs from 'dayjs';
import { DateTimePickerForm } from './components/ui/date-time-picker-form';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TodoItemProps {
  onCreated: (item: Todo) => void
}

const AddTodo: React.FC<TodoItemProps> = ({
  onCreated,
}

) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(dayjs().toDate());




  const handleSubmit = async (todoName: string, todoDate: string) => {
    const data: CreateTodoCreateTodoPostData = {
      body: {
        todoDto: {
          item: todoName,
          plan_time: todoDate,
          content: '',
          importance: 0
        }
      }
    }
    const res = await createTodoCreateTodoPost(data)
    onCreated(res.data!)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              TodoName: {name}
            </Label>
            <Input id="name"
              value={name}
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              TodoDate
            </Label>
            <div
              className="text-gray-500 text-[12px] cursor-pointer"
            >
              {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <DateTimePickerForm onSubmit={
              (date: Date) => {
                setDate(date)
              }
            } initialDateTime={date}
            />

          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => handleSubmit(name, dayjs(date).format('YYYY-MM-DD HH:mm:ss'))}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default AddTodo;