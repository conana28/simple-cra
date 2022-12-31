/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  Pagination,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import MenuPopover from '../../components/MenuPopover';
import Iconify from '../../components/Iconify';
import { useSnackbar } from '../../components/snackbar';

import { searchBottles } from '../../https/bottles';

export const TestSearchDisplay = ({
  searchData,
  setSearchData,
  setSetEdit,
  bottleSelected,
  setBottleSelected,
  setSetConsume,
  checked,
  setChecked,
  handleToggle,
}) => {
  const queryClient = useQueryClient();
  const isXs = useMediaQuery('(max-width:600px)');

  const { enqueueSnackbar } = useSnackbar();
  // Action Menu - When three dots clicked
  const [openMenu, setOpenMenuActions] = useState(null);
  // const [menuSelect, setMenuSelect] = useState(false);
  // const [bottleSelected, setBottleSelected] = useState({}); // remember bottle details
  // Pagination
  const [page, setPage] = useState(1);

  let searchObj = {};
  if (searchData.vintage === 0) {
    searchObj.wineText = searchData.wineText;
  } else {
    searchObj = { ...searchData };
  }

  // Fetch Bottles that match query
  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ['bottles', searchObj, page],
    queryFn: searchBottles,
    staleTime: 30000,
  });

  // useEffect(() => {
  //   console.log('Component mounted');
  // }, [bottleSelected]);

  if (isLoading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log('Error: ', error);
    return <div>Error... {error.message} Check console</div>;
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Menus (action icon)
  const handleOpenMenu = (event, bottle) => {
    console.log(bottleSelected, Object.keys(bottleSelected));
    // Disable action menu when RH is shown
    if (Object.keys(bottleSelected).length !== 0) {
      enqueueSnackbar('Bottle already selected', { variant: 'error' });
      return;
    }
    if (!match) {
      enqueueSnackbar('No matchig bottles', { variant: 'error' });
      return;
    }
    setBottleSelected(bottle); // Remember bottle selected for actions
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = (e) => {
    console.log('Close...', e.type, bottleSelected);
    // If menu closed by clicking outside then an ecent is passed
    if (e.type) setBottleSelected({});
    setOpenMenuActions(null);
  };

  const handleEditDelete = () => {
    console.log('Edit/Delete', bottleSelected);
    handleCloseMenu('e');
    setSetEdit(Object.entries(bottleSelected)); // Open dialog/screen with edit form (expects an array)
  };
  const handleConsume = () => {
    console.log('Consume', bottleSelected);
    handleCloseMenu('c');
    setSetConsume(bottleSelected._id); // Open dialog/screen with consume form (expects bid)
  };
  const handleMove = () => {
    console.log('Move', bottleSelected, checked);
    handleCloseMenu('m');
    // setSetMove(bottleSelected._id); // Open dialog/screen with consume form (expects bid)
  };
  const match = data.data[0].wineText !== 'No bottles match criteria';
  console.log(match, data.data[0]);

  return (
    <Paper>
      <Typography sx={{ pl: 1, pt: 1, pb: 1, mb: 0 }}>
        Selected Bottles for text = {searchData.wineText} , vint ={' '}
        {searchData.vintage === 0 ? 'n/a' : searchData.vintage}
      </Typography>
      <Divider />
      {/* display bottles returned  */}
      {/* https://smartdevpreneur.com/5-mui-sx-breakpoint-examples/ */}
      <List>
        {data &&
          data.data.map((bb) => (
            <ListItemButton
              selected={bb._id === bottleSelected._id}
              key={bb._id}
              onClick={handleToggle(bb._id)}
              dense={isXs}
              // Uesful in light mode
              // sx={{
              //   '&.Mui-selected': {
              //     // backgroundColor: '#b388ff',
              //     backgroundColor: 'secondary.light',
              //   },
              //   '&.Mui-focusVisible': {
              //     backgroundColor: '#51ec94',
              //   },
              //   ':hover': {
              //     // backgroundColor: '#b388ff',
              //     backgroundColor: 'primary.light',
              //   },
              // }}
            >
              <ListItemIcon>
                {checked.indexOf(bb._id) !== -1 && (
                  <Checkbox
                    size="small"
                    edge="start"
                    checked={checked.indexOf(bb._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    // inputProps={{ 'aria-labelledby': labelId }}
                  />
                )}
              </ListItemIcon>

              <ListItem
                // selected={bb._id === bottleSelected._id}
                // selected={bb._id === setEdit._id}

                key={bb._id}
                disableGutters
                secondaryAction={
                  <IconButton onClick={(event) => handleOpenMenu(event, bb)}>
                    <Iconify icon="eva:more-vertical-fill" width={18} height={18} />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={match ? `${bb.vintage} ${bb.wineText}` : `${bb.wineText}`}
                  secondary={
                    match
                      ? `${bb.rack} ${bb.shelf} ${bb.cost ? ',' : ''} ${bb.cost ? bb.cost : ''}`
                      : ''
                  }
                  secondaryTypographyProps={{ color: 'primary' }}
                />
              </ListItem>
            </ListItemButton>
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
        <MenuItem onClick={() => handleConsume()}>Consume</MenuItem>
        <MenuItem onClick={() => handleMove()}>Move</MenuItem>
        <MenuItem onClick={() => handleEditDelete()}>Edit/Delete</MenuItem>
      </MenuPopover>

      <Stack direction="row" justifyContent="space-between">
        {match && (
          <Pagination count={data.pages} page={page} onChange={handleChange} sx={{ mb: 2 }} />
        )}
        <Button
          sx={{ mr: 2 }}
          onClick={() => {
            setSearchData({ bottleSearchString: '', vintageSearchString: 0 }); // reset search display
            setBottleSelected({});
            setSetEdit([]); // Controls display of RH
            setSetConsume('');
          }}
          variant="contained"
          size="small"
        >
          Search again
        </Button>
      </Stack>
    </Paper>
  );
};

TestSearchDisplay.propTypes = {
  searchData: PropTypes.object,
  setSearchData: PropTypes.func,
  setSetEdit: PropTypes.func,
  bottleSelected: PropTypes.object,
  setBottleSelected: PropTypes.func,
  setSetConsume: PropTypes.func,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
  handleToggle: PropTypes.func,
};
