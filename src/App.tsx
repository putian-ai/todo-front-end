import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Heading from './Headings'
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { ButtonBase } from '@mui/material'
import { createClient } from '@hey-api/client-fetch';
import { OpenAPI, PaginateModel_Todo_, readTodosGetTodosGet } from './client'
import TodoPage from './TodoPage'

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Todo_item', width: 200 },
  { field: 'col2', headerName: 'create_time', width: 200 },
  { field: 'col3', headerName: 'plan_time', width: 200 },

];


function sayHello() {
  console.log('Hello')
}


function App() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('Harry')

  const handleClick = () => {
    setOpen(!open);
  };

  const changeName = () => {
    setName("Charles")
  }

  return (
    <>
      <TodoPage></TodoPage>
    </>
  );
}

export default App
