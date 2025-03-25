import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const CustomBreadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" sx={{ color: theme => theme.palette.primary.main }} />}
      aria-label="breadcrumb"
      sx={{ marginBottom: 2 }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index !== items.length - 1 ? (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ "svg": { color: theme => theme.palette.primary.main } }}>
              {item.icon}
              <Link to={item.to} style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: theme => theme.palette.primary.main }}>{item.label}</Typography>
              </Link>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ "svg": { color: theme => theme.palette.primary.main } }}>
              {item.icon}
              <Typography sx={{ color: theme => theme.palette.primary.main }}>{item.label}</Typography>
            </Stack>
          )}
        </React.Fragment>
      ))}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
