import { ListItem, ListItemButton, ListItemIcon, ListItemText, alpha } from "@mui/material";
import { Link } from "react-router-dom";

type ListItemCustomProps = {
  icon: React.ReactNode;
  text: string;
  to: string;
  isActive: boolean;
};

const ListItemCustom = ({ icon, text, to, isActive }: ListItemCustomProps) => {
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
            color: isActive ? theme.palette.primary.dark : theme.palette.primary.main,
            transition: theme.transitions.create('color', {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
          },
          "span": {
            color: isActive ? theme.palette.primary.dark : theme.palette.primary.main,
            fontWeight: isActive ? 'bold' : 'normal',
            transition: theme.transitions.create('color', {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
          },
          bgcolor: isActive ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
          borderRadius: 1,
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
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