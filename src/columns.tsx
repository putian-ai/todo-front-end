import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { deleteTodosDeleteTodosTodoIdDelete, DeleteTodosDeleteTodosTodoIdDeleteData } from "./client"

// This type is used to define the shape of our data.
export type TodoTableData = {
    id: number
    item: string | null
    planTime: string | null
}

const deleteTodo = async (id: number) => {
    console.log(`Delete: ${id}`)
    const data: DeleteTodosDeleteTodosTodoIdDeleteData = {
        todoId: id
    }
    await deleteTodosDeleteTodosTodoIdDelete(data)
}

export const columns: ColumnDef<TodoTableData>[] = [
    {
        accessorKey: "item",
        header: "Item",
        cell: ({ row }) => {
            const item: string = row.getValue("item")
            return <div className="text-left font-medium">{item}</div>
        },
    },
    {
        accessorKey: "plantime",
        header: "PlanTime",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const TodoTableData = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => deleteTodo(TodoTableData.id!)}
                        >Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
