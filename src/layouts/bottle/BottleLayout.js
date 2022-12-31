import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Box } from '@mui/material';
// components
import { BottleSearchDisplay } from './BottleSearchDisplay';
import BottleSearchInput from './BottleSearchInput';
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

BottleLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
  setSetEdit: PropTypes.func,
};

export default function BottleLayout({ children, illustration, title, setSetEdit }) {
  const [searchData, setSearchData] = useState({
    bottleSearchString: '',
    vintageSearchString: 0,
  });

  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>
        <Typography
          variant="h3"
          sx={{ mb: 10, maxWidth: 480, textAlign: 'center', bgcolor: 'blue' }}
        >
          {title || 'Consume bottle'}
        </Typography>

        {searchData.bottleSearchString === '' && (
          <Box sx={{ bgcolor: 'green' }}>
            <BottleSearchInput setSearchData={setSearchData} />
          </Box>
        )}

        {searchData.bottleSearchString !== '' && (
          <Box sx={{ bgcolor: 'green' }}>
            <BottleSearchDisplay
              searchData={searchData}
              setSearchData={setSearchData}
              setSetEdit={setSetEdit}
            />
          </Box>
        )}

        {/* <StyledSectionBg /> */}
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1, bgcolor: 'red' }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
