import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';

// mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';

// components
import { searchBottles } from '../../https/bottles';
import Iconify from '../../components/Iconify';
import { useSnackbar } from '../../components/snackbar';
// import { useCellarContext } from './CellarContext';
import MenuPopover from '../../components/MenuPopover';

WineSearchResults.propTypes = {
  setWid: PropTypes.func,
};

function WineSearchResults({ setWid }) {
  return <div>WineSearchResults</div>;
}

export default WineSearchResults;
