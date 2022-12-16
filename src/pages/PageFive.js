import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
// layouts
import Bottle from '../sections/bottles/Bottle';
// ----------------------------------------------------------------------

export default function PageFive() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Page Five | Minimal UI</title>
      </Helmet>

      <Bottle />
    </>
  );
}
