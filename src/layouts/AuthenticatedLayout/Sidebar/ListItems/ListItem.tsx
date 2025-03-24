import { ListItem, ListItemButton, ListItemIcon, ListItemText, alpha } from "@mui/material";
import { Link } from "react-router-dom";

type ListItemCustomProps = {
  icon: React.ReactNode;
  text: string;
  to: string;
};

const ListItemCustom = ({ icon, text, to }: ListItemCustomProps) => {
  return (
    <ListItem sx={{ py: 0 }}>
      <ListItemButton 
        component={Link} 
        to={to}
        sx={(theme) => ({
          display: 'flex',
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          ".MuiListItemIcon-root": {
            minWidth: 'inherit',
            marginRight: '10px',
            color: theme.palette.primary.main,
            transition: theme.transitions.create('color', {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
          },
          "span": {
            color: theme.palette.primary.main,
            transition: theme.transitions.create('color', {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
          },
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            borderRadius: 1,
          },
        })}
      >
        <ListItemIcon 
          sx={{ 
            minWidth: 'inherit', 
            marginRight: '10px' 
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemCustom;