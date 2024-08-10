

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export type TodoTableData = {
    id: number
    item: string | null
    planTime: string | null
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

]
