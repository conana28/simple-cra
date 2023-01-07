import { useState, createContext } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Box, Paper, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Masonry } from '@mui/lab';
// components
import Wine from '../sections/wine/Wine';
import { useSettingsContext } from '../components/settings';
// ----------------------------------------------------------------------

export default function PageThree() {
  // const { themeStretch } = useSettingsContext();
  const { ...a } = useSettingsContext();

  const [searchData, setSearchData] = useState({
    bottleSearchString: '',
    vintageSearchString: 0,
  });

  console.log(a);

  return (
    <>
      <Wine />
    </>
  );
}
