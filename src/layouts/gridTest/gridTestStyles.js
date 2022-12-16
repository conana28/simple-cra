// @mui
import { styled, alpha } from '@mui/material/styles';
// utils
import { bgGradient } from '../../utils/cssStyles';

// ----------------------------------------------------------------------

// sets up a flex container for the page
export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  // A Flexible Layout must have a parent element with the display property set to flex.
  // Direct child elements(s) of the flexible container automatically becomes flexible items.
  position: 'relative', //  is positioned relative to its normal position
  backgroundColor: 'DodgerBlue',
}));

// Left hand section of page
export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none', // hide and show elements without deleting and recreating them.
  position: 'relative',
  // [theme.breakpoints.up('md')]: {
  [theme.breakpoints.up('sm')]: {
    // flexGrow: 1,  // fill up the remaining area left by RH Box
    width: '60%',
    display: 'flex',
    alignItems: 'start',
    // alignItems: 'center',
    // justifyContent: 'start',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(0, 0, 0, 5), // t,r,b,l
    backgroundColor: 'Orange',
  },
}));

// Right Hand side
export const StyledContent = styled('div')(({ theme }) => ({
  width: 480,
  // width: '40%',
  margin: 'auto', // the browser calculates the margin
  display: 'flex',
  minHeight: '100vh',
  // justifyContent: 'end',
  padding: theme.spacing(15, 2), // tb, lr
  // [theme.breakpoints.up('md')]: {
  [theme.breakpoints.up('sm')]: {
    flexShrink: 0, // A number specifying how much the item will shrink relative to the rest of the flexible items
    // padding: theme.spacing(30, 8, 0, 8),
  },
}));
