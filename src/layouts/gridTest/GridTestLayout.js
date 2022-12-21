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
  setBottleSelected: PropTypes.func,
  bottleSelected: PropTypes.object,
  setSetConsume: PropTypes.func,
};

export default function GridTestLayout({
  children,
  illustration,
  title,
  setSetEdit,
  setBottleSelected,
  bottleSelected,
  setSetConsume,
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
              bottleSelected={bottleSelected}
              setBottleSelected={setBottleSelected}
              setSetConsume={setSetConsume}
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
