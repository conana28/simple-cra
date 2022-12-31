import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
// components
import TestSearchInput from './testSearchInput';
import { TestSearchDisplay } from './testSearchDisplay';

// ----------------------------------------------------------------------

GridTestLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
  setSetEdit: PropTypes.func,
  setSetMove: PropTypes.func,
  setBottleSelected: PropTypes.func,
  bottleSelected: PropTypes.object,
  setSetConsume: PropTypes.func,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
  handleToggle: PropTypes.func,
};

export default function GridTestLayout({
  children,
  illustration,
  title,
  setSetEdit,
  setSetMove,
  setBottleSelected,
  bottleSelected,
  setSetConsume,
  checked,
  setChecked,
  handleToggle,
}) {
  const [searchData, setSearchData] = useState({
    bottleSearchString: '',
    vintageSearchString: 0,
  });

  return (
    <>
      {/* <Typography variant="h3" sx={{ mb: 10, maxWidth: 480, textAlign: 'center', bgcolor: 'blue' }}>
        Grid Test
      </Typography> */}

      {/* <Box sx={{ flexGrow: 1, bgcolor: 'dodgerblue', height: '80vh' }}> */}
      <Grid container spacing={5}>
        <Grid xs={12} sm={6} sx={{ bgcolor: 'orangea' }}>
          {searchData.bottleSearchString === '' && (
            <TestSearchInput setSearchData={setSearchData} />
          )}

          {searchData.bottleSearchString !== '' && (
            <TestSearchDisplay
              searchData={searchData}
              setSearchData={setSearchData}
              setSetEdit={setSetEdit}
              setSetMove={setSetMove}
              bottleSelected={bottleSelected}
              setBottleSelected={setBottleSelected}
              setSetConsume={setSetConsume}
              checked={checked}
              setChecked={setChecked}
              handleToggle={handleToggle}
            />
          )}
        </Grid>

        <Grid xs={12} sm={6} sx={{ bgcolor: 'greena' }}>
          {children}
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
}
