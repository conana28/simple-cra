import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
// layouts
import GridTest from '../sections/gridTest/GridTest';

// ----------------------------------------------------------------------

export default function PageSix() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Page Six | Grid Test</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* <Typography variant="h3" component="h1" paragraph>
          Page Six
        </Typography> */}

        <GridTest />
      </Container>
    </>
  );
}
