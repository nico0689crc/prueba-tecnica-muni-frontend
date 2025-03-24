import { IconButton, useMediaQuery, Theme, Box} from "@mui/material";
import { IconMenu2 } from '@tabler/icons-react';
import useConfig from "@/hooks/useConfig";
import ProfileSection from "./ProfileSection";

const Header = () => {
  const { handleToggleSidebarMobile } = useConfig();
  const isDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  
  return (
    <Box 
      color="inherit"
      component='header' 
      sx={{
        display: 'flex',
        bgcolor: 'background.default',
        gridColumn: '1 / 3',
        height: '100%',
        alignItems: 'center',
        justifyContent: isDownMd ? 'space-between' : 'flex-end',
        paddingX: { xs: 2, sm: 3 },
        ...(isDownMd && { 
          borderBottom: 1,
          borderColor: theme => theme.palette.primary.main,
        })
      }}
    >
      {isDownMd && (
        <IconButton onClick={handleToggleSidebarMobile} color="primary">
          <IconMenu2 />
        </IconButton>
      )}
      <ProfileSection />
    </Box>
  );
}

export default Header;