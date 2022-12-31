import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Box, Paper, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Masonry } from '@mui/lab';
// components
import { Block } from '../sections/Block';
import { BottleSearchDisplay } from '../components/winetrak/BottleSearchDisplay';
import BottleSearchInput from '../components/winetrak/BottleSearchInput';
import { useSettingsContext } from '../components/settings';
// ----------------------------------------------------------------------

const StyledListContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`,
}));

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
      <Helmet>
        <title>Cellar | Masonry Test</title>
      </Helmet>

      <Container>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block title="Search">
            {/* <StyledListContainer> */}
            <p>aaaaaaaaaaaaaaa</p>
            {/* </StyledListContainer> */}
          </Block>
          <Block title="Search results">
            <StyledListContainer>
              <p>bbbbbbb</p>
            </StyledListContainer>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
