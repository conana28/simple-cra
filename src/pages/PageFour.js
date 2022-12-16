import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Box, Paper, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { BottleSearchDisplay } from '../components/winetrak/BottleSearchDisplay';
import BottleSearchInput from '../components/winetrak/BottleSearchInput';
import { useSettingsContext } from '../components/settings';

// ----------------------------------------------------------------------

export default function PageFour() {
  const { themeStretch } = useSettingsContext();
  const [searchData, setSearchData] = useState({
    bottleSearchString: '',
    vintageSearchString: 0,
  });

  return (
    <>
      <Helmet>
        <title> WT | Consume a bottle</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h3" paragraph>
          Consume Bottle
        </Typography>

        {searchData.bottleSearchString === '' && (
          <BottleSearchInput setSearchData={setSearchData} />
        )}

        {searchData.bottleSearchString !== '' && (
          <BottleSearchDisplay searchData={searchData} setSearchData={setSearchData} />
        )}
      </Container>
    </>
  );
}
