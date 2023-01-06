import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Box, Paper, styled } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import { Block } from '../Block';
import BottleSearchInput from './SearchInput';
import BottleSearchResults from './SearchResults';
import { CellarContextProvider, useCellarContext } from './CellarContext';
import MoveBottles from './MoveBottles';
import ConsumeBottle from './ConsumeBottle';
import EditBottle from './EditBottle';

// ----------------------------------------------------------------------

const StyledListContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`,
}));

function Cellar() {
  const { menuSelect } = useCellarContext();
  const [checked, setChecked] = useState([]); // Check multiple bottles

  const [searchData, setSearchData] = useState({
    wineText: '',
    vintage: 0,
  });

  const title = ` ${
    searchData.wineText === '' ? 'Search cellar' : ` Bottles matching: ${searchData.wineText}`
  }`;

  const vintage =
    searchData.vintage === 0 || searchData.vintage === undefined
      ? ''
      : ` ,vintage ${searchData.vintage}`;

  return (
    <>
      <Helmet>
        <title>Cellar | Masonry Test</title>
      </Helmet>
      {/* <CellarContextProvider> */}
      <Container>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          {/* Left hand / top  */}
          <Block title={`${title} ${vintage}`}>
            {searchData.wineText.length === 0 && (
              <BottleSearchInput
                setSearchData={setSearchData} // Update data to search
              />
            )}
            {searchData.wineText.length !== 0 && (
              <BottleSearchResults
                searchData={searchData} // Data to search
                setSearchData={setSearchData} // To reset
                checked={checked} //
                setChecked={setChecked} //
              />
            )}
          </Block>

          {/* Right hand / bottom */}
          {menuSelect === 'm' && (
            <Block
              title={`Move ${checked.length > 1 ? checked.length : ''} bottle${
                checked.length > 1 ? 's' : ''
              } `}
            >
              <MoveBottles checked={checked} setChecked={setChecked} />
            </Block>
          )}

          {menuSelect === 'c' && (
            <Block title="Consume Bottle">
              <ConsumeBottle />
            </Block>
          )}

          {menuSelect === 'e' && (
            <Block
              title={`Edit ${checked.length > 1 ? checked.length : ''} bottle${
                checked.length > 1 ? 's' : ''
              } `}
            >
              <EditBottle checked={checked} setChecked={setChecked} />
            </Block>
          )}
        </Masonry>
      </Container>
      {/* </CellarContextProvider> */}
    </>
  );
}

export default Cellar;
