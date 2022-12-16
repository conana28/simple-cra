import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';

const BottleConsume = ({ setEdit, setSetEdit }) => (
  <>
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Edit Bottle</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">{setEdit}</Typography>

        <Link variant="subtitle2">Create an account</Link>
      </Stack>
    </Stack>
    <Alert severity="info" sx={{ mb: 3 }}>
      Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
    </Alert>
    <Button onClick={() => setSetEdit('')}> Cancel</Button>
  </>
);

export default BottleConsume;

BottleConsume.propTypes = {
  setEdit: PropTypes.string,
  setSetEdit: PropTypes.func,
};
