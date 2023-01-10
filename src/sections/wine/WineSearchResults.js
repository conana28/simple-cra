import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';

// mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// components
import { searchWines } from '../../https/wines';
import Iconify from '../../components/Iconify';
import { useSnackbar } from '../../components/snackbar';
import { useWinetrakContext } from '../../components/winetrak/WinetrakContext';
import MenuPopover from '../../components/MenuPopover';

WineSearchResults.propTypes = {
  wineSearchData: PropTypes.object,
  setWineSearchData: PropTypes.func,
};

function WineSearchResults({ wineSearchData, setWineSearchData }) {
  console.log(wineSearchData);

  const { setMenuSelect, selected, setSelected } = useWinetrakContext();
  const [page, setPage] = useState(1);
  const isXs = useMediaQuery('(max-width:600px)');
  const { enqueueSnackbar } = useSnackbar(); // SnackBar on/off
  const [openMenu, setOpenMenu] = useState(false); // Menu on/off
  console.log('Selected ', selected);
  // setSelected({});
  // Fetch Bottles that match query
  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ['wines', wineSearchData, page, isXs ? 4 : 7],
    queryFn: searchWines,
    staleTime: 30000,
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -12,
      top: -4,
      color: '#F4F6F8',
      backgroundColor: '#84A9FF',
      width: 15,
      height: 18,
      borderRadius: '30%',
    },
  }));
  // Menus (action icon)
  const handleOpenMenu = (event, wine) => {
    console.log(wine, Object.keys(selected));
    // Disable action menu when RH is shown
    if (Object.keys(selected).length !== 0) {
      enqueueSnackbar('Wine already selected', { variant: 'error' });
      return;
    }
    setSelected(wine); // Store wine selected for actions
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = (e) => {
    console.log('Close...', e.type, selected);
    // If menu closed by clicking outside then an event is passed
    if (e.type) setSelected({});
    setOpenMenu(null);
  };

  const handleAddBottle = () => {
    console.log('Add bottle', selected);
    handleCloseMenu('a');
    setMenuSelect('a'); // Open edit screen
  };

  const showBottles = () => {
    console.log('Show bottles', selected);
    handleCloseMenu('s');
    if (selected.bottles.length === 0) {
      enqueueSnackbar('No current bottles', { variant: 'error' });
      setSelected({});
    } else {
      setMenuSelect('s'); // Open screen
    }
  };

  // console.log(data);
  return (
    <Paper sx={{ mb: 2 }}>
      <List>
        {data &&
          data.data.map((bb) => (
            <ListItem
              key={bb._id}
              dense={isXs}
              secondaryAction={
                <IconButton edge="end" onClick={(event) => handleOpenMenu(event, bb)}>
                  <Iconify icon="eva:more-vertical-fill" width={18} height={18} />
                </IconButton>
              }
              disablePadding
              style={{ cursor: 'context-menu' }}
            >
              <ListItemButton role={undefined} selected={bb._id === selected._id}>
                <ListItemText
                  primary={
                    <Typography>
                      {bb.producer}-{bb.wineName}
                      <StyledBadge badgeContent={bb.bottles?.length} />
                    </Typography>
                  }
                  secondary={`${bb.country}, ${bb.region}
                              ${bb.subRegion ? ', ' : ''}
                              ${bb.subRegion ? bb.subRegion : ''}
                              ..${bb._id.substr(bb._id.length - 5)}`}
                  secondaryTypographyProps={{ color: 'secondary.light' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <MenuPopover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        <MenuItem onClick={() => handleAddBottle()}>Add Bottle</MenuItem>
        <MenuItem onClick={() => showBottles()}>Show Bottle</MenuItem>
        <MenuItem>Add Note</MenuItem>
        <MenuItem>Edit Wine</MenuItem>
        {/* <MenuItem onClick={() => handleMove()}>Move</MenuItem> */}
        {/* <MenuItem onClick={() => handleEditDelete()}>Edit/Delete</MenuItem> */}
      </MenuPopover>

      <Stack direction="row" justifyContent="space-between">
        {data && (
          <Pagination
            count={data.pages}
            page={page}
            onChange={handleChange}
            sx={{ mb: 2 }}
            disabled={Object.keys(selected).length !== 0}
          />
        )}
        <IconButton
          color="primary"
          onClick={() => {
            setWineSearchData({
              producer: '',
              wineName: '',
              country: '',
              region: '',
              subRegion: '',
            }); // reset search display
            setMenuSelect(''); // Close consume
            setSelected({}); // Reset bottle selectwineText: '', vintage: 0 ed
          }}
        >
          <ClearIcon />
        </IconButton>
      </Stack>

      {isLoading && (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="primary" />
        </Stack>
      )}
    </Paper>
  );
}

export default WineSearchResults;
