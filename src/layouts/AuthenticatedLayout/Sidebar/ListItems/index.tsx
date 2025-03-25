import React from 'react';
import { IconHome, IconTableSpark, IconUsersGroup } from '@tabler/icons-react';
import { List } from '@mui/material';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  return (
    <List sx={{ 
      display: 'flex',
      flexDirection: 'column',
      rowGap: 1,
      padding: 0,
      height: '100%'
    }}>
      {items.map((item, index) => {
        const isActive = location.pathname.includes(item.to);
        if (!item.adminProtected || (item.adminProtected && user?.role === 'admin')) {
          return <ListItemCustom key={index} {...item} isActive={isActive} />
        }
      })}
    </List>
  )
}

export default ListItems;