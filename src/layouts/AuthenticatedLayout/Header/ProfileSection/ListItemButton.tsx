import { alpha, ListItemIcon, ListItemText, useTheme, ListItemButton as ListItemButtonMUI } from "@mui/material";

type ListItemButtonProps = {
  text: string;
  icon: React.ReactNode;
  action?: () => void;
};

const ListItemButton = ({text, icon, action}: ListItemButtonProps) => {
  const theme = useTheme();
  
  return (
    <ListItemButtonMUI
      onClick={action} 
      sx={{ 
        borderRadius: 1,
        ".MuiListItemIcon-root, .MuiListItemText-root": {
          minWidth: 'inherit',
          marginRight: '10px',
          color: theme.palette.primary.main,
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut,
          }),
        },
        "&:hover": { 
          bgcolor: alpha(theme.palette.primary.main, 0.08) 
        },
      }}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text}/>
    </ListItemButtonMUI>
  )
}

export default ListItemButton;