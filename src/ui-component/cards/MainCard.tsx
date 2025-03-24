import React, { forwardRef } from 'react';

// material-ui
import Card, { CardProps } from '@mui/material/Card';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// constant
const headerStyle = {
  '& .MuiCardHeader-action': { mr: 0 }
};

export interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  headerSX?: CardHeaderProps['sx'];
  darkTitle?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(function MainCard(
  {
    border = false,
    boxShadow,
    children,
    content = true,
    contentClass = '',
    contentSX = {},
    headerSX = {},
    darkTitle,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  },
  ref
) {

  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: 'divider',
        ':hover': {
          boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
        },
        ...sx
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={{ ...headerStyle, ...headerSX }} title={title} action={secondary} />}
      {darkTitle && title && (
        <CardHeader sx={{ ...headerStyle, ...headerSX }} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
});

export default MainCard;
