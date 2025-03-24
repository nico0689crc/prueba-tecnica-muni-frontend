import { IconHome, IconTableSpark } from '@tabler/icons-react';
import { List } from '@mui/material';
import ListItemCustom from './ListItem';

const items = [
  {
    icon: <IconHome />,
    text: "Inicio",
    to: '/inicio'
  },
  {
    icon: <IconTableSpark />,
    text: "Tareas",
    to: '/tareas'
  }
]

const ListItems = () => { 
  return (
    <List sx={{ 
      display: 'flex',
      flexDirection: 'column',
      rowGap: 1,
      padding: 0,
      height: '100%'
    }}>
      {items.map((item, index) => (
        <ListItemCustom key={index} {...item} />
      ))}
    </List>
  )
}

export default ListItems;