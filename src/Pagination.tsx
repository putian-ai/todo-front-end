import React from "react"

interface PaginationProps {
    currentPage: number
    perPage: number
    totalItems: number
    onPageChange: (newPage: number) => void
    onPerPageChange: (newPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    perPage,
    totalItems,
    onPageChange,
    onPerPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / perPage)
    const hasNext = currentPage < totalPages
    const hasPrev = currentPage > 1

    const perPageOptions = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 20, label: '20' },
    ]

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center text-gray-700">
                <span className="mr-2">TotalPage: {totalPages}</span>
                <span className="mr-2">Page: {currentPage}</span>
                <span className="mr-2">Per Page:</span>
                <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(parseInt(e.target.value))}
                    className="border rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    {perPageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center">
                <span className="mr-2 text-gray-700">Total: {totalItems}</span>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={!hasPrev}>Prev page</button>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext}>Next page</button>
            </div>
        </div>
    )
}

export default Pagination