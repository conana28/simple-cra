import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Box, Paper, styled } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import { Block } from '../Block';
import WineSearchInput from './WineSearchInput';
import WineSearchResults from './WineSearchResults';
import AddBottle from './AddBottle';

function Wine() {
  const [wineSearchData, setWineSearchData] = useState({
    producer: '',
    wineName: '',
    country: '',
    region: '',
    subRegion: '',
  });
  const [wid, setWid] = useState('aaa'); // id of wine selected

  const title = ` ${
    wineSearchData.producer === '' ? 'Find wine' : ` Wines matching: ${wineSearchData.producer}`
  }`;

  return (
    <>
      <Helmet>
        <title>Wine | Masonry Test</title>
      </Helmet>

      <Container>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          {/* Left hand / top  */}
          <Block title={`${title} `}>
            {Object.values(wineSearchData).every((x) => x === '') && (
              <WineSearchInput
                setWineSearchData={setWineSearchData} // Update data to search
              />
            )}
            {Object.values(wineSearchData).some((x) => x !== '') && (
              <WineSearchResults
                wineSearchData={wineSearchData} // Data to search
                setWineSearchData={setWineSearchData} // To reset
                setWid={setWid}
              />
            )}
          </Block>

          {/* Right hand / bottom */}
          {/* {menuSelect === 'a' && ( */}
          <Block title="Add bottle(s)">
            <AddBottle wid={wid} />
          </Block>
          {/* )} */}
        </Masonry>
      </Container>
    </>
  );
}

export default Wine;
