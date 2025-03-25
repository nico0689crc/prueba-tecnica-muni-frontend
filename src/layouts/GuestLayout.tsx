import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

const GuestLayout = () => {
  return(
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', 
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: theme.shadows[10],
        borderRadius: '12px',
      })}
    >
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Box>
  )
}

export default GuestLayout;