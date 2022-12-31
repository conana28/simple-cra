import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TestConsume from '../../layouts/gridTest/TestConsume';
import BtlConsume from '../../layouts/gridTest/BtlConsume';
import BtlMove from '../../layouts/gridTest/BtlMove';
// layouts
// layouts
import GridTestLayout from '../../layouts/gridTest';

export default function GridTest() {
  const [setEdit, setSetEdit] = useState([]);
  const [setMove, setSetMove] = useState([]); // array of bids
  const [setConsume, setSetConsume] = useState(''); // bid
  const [bottleSelected, setBottleSelected] = useState({}); // remember bottle details
  const [checked, setChecked] = useState([]); // Check multiple bottles

  const handleToggle = (value) => () => {
    console.log(value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <GridTestLayout
      setSetEdit={setSetEdit}
      setSetMove={setSetMove}
      bottleSelected={bottleSelected}
      // setSetEdit={setSetEdit}
      setBottleSelected={setBottleSelected}
      setSetConsume={setSetConsume}
      checked={checked}
      setChecked={setChecked}
      handleToggle={handleToggle}
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
      {setMove.length > 0 && (
        <BtlMove
          setMove={setMove} // bid array
          setSetMove={setSetMove}
          bottleSelected={bottleSelected}
          setBottleSelected={setBottleSelected}
          setChecked={setChecked}
        />
      )}
    </GridTestLayout>
  );
}
