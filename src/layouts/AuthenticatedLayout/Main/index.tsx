import { Box, Theme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

const Main = () => {
  const isUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Box component="main" sx={{ 
      width: '100%',
      overflowY: 'scroll', 
      backgroundColor: (theme: Theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      borderTopLeftRadius: 8,
      padding: 5,
      ...(isUpMd && { 
        borderLeft: 1,
        borderTop: 1,
        borderLeftColor: theme => theme.palette.primary.main,
        borderTopColor: theme => theme.palette.primary.main,
      }) 
    }}>
        <Outlet />
    </Box>
  );
}

export default Main;