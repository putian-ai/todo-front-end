import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
    currentPage: number
    perPage: number
    totalItems: number
    onPageChange: (newPage: number) => void
    onPerPageChange: (newPage: number) => void
}

const MyPagination: React.FC<PaginationProps> = ({
    currentPage,
    perPage,
    totalItems,
    onPageChange,
    onPerPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / perPage)
    const hasNext = currentPage < totalPages
    const hasPrev = currentPage > 1
    // const perPageOptions = [
    //   { value: 5, label: "5" },
    //   { value: 10, label: "10" },
    //   { value: 20, label: "20" },
    // ]

    return (
        <div className="flex items-center justify-between py-4">
            {/* ... (Per-page selection remains the same) ... */}

            <Pagination
            >
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} ></PaginationPrevious>
                    </PaginationItem>

                    {/* Loop through page numbers */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index + 1}>
                            <PaginationLink
                                href="#" // Update with actual route
                                onClick={() => onPageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext onClick={() => onPageChange(currentPage + 1)} ></PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default MyPagination