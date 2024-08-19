import React, { useState, useRef, ChangeEvent } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Search } from 'lucide-react';
import { getTodosByItemNameGetTodosByItemNameItemNameGet, GetTodosByItemNameGetTodosByItemNameItemNameGetData, PaginateModel_Todo_ } from './client';
import { useDebounceFn } from 'ahooks';
import TodoItem from './TodoItem';
import { useNavigate } from 'react-router-dom';



interface SearchComponentProps {

  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [searchTodoPage, setSearchTodoPage] = useState<PaginateModel_Todo_>()
  const navigate = useNavigate()

  const { run: runSearchTodo } = useDebounceFn(
    async (newSearchTerm: string) => {
      handleSearchTodo(newSearchTerm)
    },
    {
      wait: 500,
    },
  );

  const handleSearchTodo = async (searchTerm: string) => {
    const data: GetTodosByItemNameGetTodosByItemNameItemNameGetData = {
      itemName: searchTerm,
      page: page,
      perPage: perPage
    }
    const data2 = await getTodosByItemNameGetTodosByItemNameItemNameGet(data)
    setSearchTodoPage(data2);
  }
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
    runSearchTodo(e.target.value);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Search className="h-4 w-4 cursor-pointer transition-transform duration-200 hover:scale-110 m-5" />
      </DialogTrigger>
      <DialogContent className="w-[460px] p-0">
        <Command>
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input placeholder="Search todos..." value={searchTerm} onChange={handleValueChange} className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50' />
          </div>
          <CommandList>
            {searchTerm && searchTodoPage ? (
              searchTodoPage.items.length > 0 ? (
                searchTodoPage.items.map((item) => (
                  <TodoItem
                    key={item.id}
                    item={item}
                    timeVisible={false}
                    isSelected={false}
                    onDelete={() => { }} // Pass a function to handle deletion
                    onCheck={() => { }} // Pass a function to handle toggle
                    onUpdate={() => { }}
                    onClick={() => navigate(`/search?${searchTerm}`)}
                    onTimeUpdate={() => { }} />
                ))
              ) : (
                <CommandItem className="justify-center text-sm italic">
                  No results found
                </CommandItem>
              )
            ) : (
              <div className="py-6">
                <CommandSeparator />
                <CommandItem className={cn("justify-center text-sm italic", searchTerm && "hidden")}>
                  Type to search
                </CommandItem>
              </div>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchComponent;