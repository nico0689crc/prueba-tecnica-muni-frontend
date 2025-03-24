import React from 'react';
import { IconHome, IconTableSpark, IconUsersGroup } from '@tabler/icons-react';
import { List } from '@mui/material';
import ListItemCustom from './ListItem';
import useAuth from '@/hooks/useAuth';

type Item = {
  icon: React.ReactNode;
  text: string;
  to: string;
  adminProtected: boolean;
}

const items: Item[] = [
  {
    icon: <IconHome />,
    text: "Inicio",
    to: '/inicio',
    adminProtected: false
  },
  {
    icon: <IconTableSpark />,
    text: "Tareas",
    to: '/tareas',
    adminProtected: false
  },
  {
    icon: <IconUsersGroup />,
    text: "Usuarios",
    to: '/usuarios',
    adminProtected: true
  }
]

const ListItems = () => {
  const { user } = useAuth(); 
  return (
    <List sx={{ 
      display: 'flex',
      flexDirection: 'column',
      rowGap: 1,
      padding: 0,
      height: '100%'
    }}>
      {items.map((item, index) => {
        if (!item.adminProtected || (item.adminProtected && user?.role === 'admin')) {
          return <ListItemCustom key={index} {...item} />
        }
      })}
    </List>
  )
}

export default ListItems;