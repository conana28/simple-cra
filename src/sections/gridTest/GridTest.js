import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TestConsume from '../../layouts/gridTest/TestConsume';
// layouts
import GridTestLayout from '../../layouts/gridTest';

export default function GridTest() {
  const [setEdit, setSetEdit] = useState([]);
  return (
    <GridTestLayout setSetEdit={setSetEdit}>
      {setEdit.length > 0 && <TestConsume setEdit={setEdit} setSetEdit={setSetEdit} />}
    </GridTestLayout>
  );
}
