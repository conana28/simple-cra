import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TestConsume from '../../layouts/gridTest/TestConsume';
import BtlConsume from '../../layouts/gridTest/BtlConsume';
// layouts
import GridTestLayout from '../../layouts/gridTest';

export default function GridTest() {
  const [setEdit, setSetEdit] = useState([]);
  const [setConsume, setSetConsume] = useState(''); // bid
  const [bottleSelected, setBottleSelected] = useState({}); // remember bottle details

  return (
    <GridTestLayout
      setSetEdit={setSetEdit}
      bottleSelected={bottleSelected}
      // setSetEdit={setSetEdit}
      setBottleSelected={setBottleSelected}
      setSetConsume={setSetConsume}
    >
      {setEdit.length > 0 && (
        <TestConsume
          setEdit={setEdit}
          setSetEdit={setSetEdit}
          bottleSelected={bottleSelected}
          setBottleSelected={setBottleSelected}
        />
      )}
      {setConsume.length > 0 && (
        <BtlConsume
          setConsume={setConsume} // bid
          setSetConsume={setSetConsume}
          bottleSelected={bottleSelected}
          setBottleSelected={setBottleSelected}
        />
      )}
    </GridTestLayout>
  );
}
