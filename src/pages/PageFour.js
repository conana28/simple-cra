import { useState, createContext } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Box, Paper, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Masonry } from '@mui/lab';
// components
import Cellar from '../sections/cellar/Cellar';
import { Block } from '../sections/Block';
import { BottleSearchDisplay } from '../components/winetrak/BottleSearchDisplay';
import BottleSearchInput from '../components/winetrak/BottleSearchInput';
import { useSettingsContext } from '../components/settings';
// ----------------------------------------------------------------------

export default function PageFour() {
  // const { themeStretch } = useSettingsContext();
  const { ...a } = useSettingsContext();

  const [searchData, setSearchData] = useState({
    bottleSearchString: '',
    vintageSearchString: 0,
  });

  console.log(a);

  return (
    <>
      {/* <Helmet>
        <title>Cellar | Masonry Test</title>
      </Helmet> */}

      <Cellar />
    </>
  );
}
