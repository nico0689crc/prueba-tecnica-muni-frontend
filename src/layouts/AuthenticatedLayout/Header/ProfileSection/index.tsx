import { useCallback, useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MainCard from '@/ui-component/cards/MainCard';
import Transitions from '@/ui-component/extended/Transitions';
import useAuth from '@/hooks/useAuth';

import { IconLogout, IconUser, IconUserCircle } from '@tabler/icons-react';
import { IconButton } from '@mui/material';
import ListItemButton from './ListItemButton';
import { useNavigate } from 'react-router-dom';

export default function ProfileSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<any>(null);
  
  const handleLogout = useCallback(async () => {
    try {
      logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error(err);
    }
  }, [logout]);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = useCallback((event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }, []);

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]); 

  const handleProfile = useCallback(() => {
    navigate('/perfil');
  }, [navigate]);

  return (
    <>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography variant="subtitle1" 
          sx={{ 
            display: { xs: 'none', md: 'block' }, 
            color: (theme) => theme.palette.primary.main, 
            fontWeight: 500 
          }}
        >
          {user?.first_name} {user?.last_name}
        </Typography>
        <IconButton ref={anchorRef} color='primary'>
          <IconUserCircle stroke={1.5} size="24px" onClick={handleToggle}/>
        </IconButton>
      </Stack>

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Box
                      sx={{
                        p: 2,
                        py: 0,
                        height: '100%',
                        maxHeight: 'calc(100vh - 250px)',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': { width: 5 }
                      }}
                    >
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 200,
                          borderRadius: 12,
                        }}
                      >
                        <ListItemButton icon={<IconUser />} text='Perfil' action={handleProfile}/>
                        <ListItemButton icon={<IconLogout />} text='Salir' action={handleLogout}/>
                      </List>
                    </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
