// @mui
import { useState } from 'react';
import { Button, Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
// import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import BottleLayout from '../../layouts/bottle';
import BottleConsume from '../../layouts/bottle/BottleConsume';
//

// ----------------------------------------------------------------------

export default function Bottle() {
  // const { method } = useAuthContext();
  const [setEdit, setSetEdit] = useState('');
  console.log('setEDIT: ', setEdit);
  return (
    <BottleLayout setSetEdit={setSetEdit}>
      {setEdit && <BottleConsume setEdit={setEdit} setSetEdit={setSetEdit} />}
    </BottleLayout>
  );
}
