

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export type TodoTableData = {
    id: number
    item: string
    planTime: string
}

export const columns: ColumnDef<TodoTableData>[] = [
    {
        accessorKey: "item",
        header: "Item",
    },
    {
        accessorKey: "plantime",
        header: "PlanTime",
    },

]
