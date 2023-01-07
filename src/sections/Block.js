import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Paper, CardHeader, Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

Block.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.node,
};

export function Block({ title, sx, children }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {/* {title && <CardHeader title={title} titleTypographyProps={{ color: 'secondary.main' }} />} */}
      {title && (
        // <Typography variant="h6" sx={{ p: 1, color: 'primary.main' }}>

        <Typography variant="h6" sx={{ p: 1, color: 'primary.light' }}>
          {title}
        </Typography>
      )}

      <Box
        sx={{
          pt: 0,
          px: 2,
          pb: 0,
          // p: 5,
          // minHeight: 180,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

// ----------------------------------------------------------------------

Label.propTypes = {
  title: PropTypes.string,
};

export function Label({ title }) {
  return (
    <Typography variant="overline" component="p" gutterBottom sx={{ color: 'text.secondary' }}>
      {title}
    </Typography>
  );
}
