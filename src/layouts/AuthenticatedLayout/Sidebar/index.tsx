import { Box, Drawer, IconButton, Stack, Theme, useMediaQuery,  } from '@mui/material';
import ListItems from './ListItems';
import useConfig from '@/hooks/useConfig';
import { IconX } from '@tabler/icons-react';

const Sidebar = () => {
  const { layout, isSidebarMobileOpen, handleToggleSidebarMobile } = useConfig();
  const isDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const content = isDownMd ? (
    <Drawer 
      anchor="left" 
      open={isSidebarMobileOpen} 
      onClose={handleToggleSidebarMobile}
      sx={{
        width: layout.sidebarWidth,
        "& .MuiPaper-root": {
          width: layout.sidebarWidth,
        }
      }}
    >
      <Stack>
        <Stack alignItems={'flex-end'} p={1}>
          <IconButton onClick={handleToggleSidebarMobile} color='primary'>
            <IconX/>
          </IconButton>
        </Stack>
        <ListItems />
      </Stack>
    </Drawer>
  ) : (
    <Box 
      sx={{ 
        width: layout.sidebarWidth,
      }} 
      component='nav'
    >
      <ListItems />
    </Box>
  );

  return content;
};

export default Sidebar;