
import { Box, Theme, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useConfig from "@/hooks/useConfig";
import Main from "./Main";

const AuthenticatedLayout = () => {
  const { layout } = useConfig();
  const isUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return(
    <Box sx={{ 
      display: 'grid',
      height: '100vh', 
      gridTemplateRows: `${layout.headerHeight}px 1fr`,
      gridTemplateColumns: '1fr',
      ...(isUpMd && { gridTemplateColumns: `${layout.sidebarWidth}px 1fr` }),
    }}>
      <Header/>
      <Sidebar/>
      <Main/>
    </Box>
  )
}

export default AuthenticatedLayout;