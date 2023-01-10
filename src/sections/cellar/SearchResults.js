import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
import { useWinetrakContext } from '../../components/winetrak/WinetrakContext';
import MenuPopover from '../../components/MenuPopover';

SearchResults.propTypes = {
  searchData: PropTypes.object,
  setSearchData: PropTypes.func,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
};

function SearchResults({ searchData, setSearchData, checked, setChecked }) {
  const isXs = useMediaQuery('(max-width:600px)');
  const [page, setPage] = useState(1);
  // const [checked, setChecked] = useState([]); // Check multiple bottles
  const { enqueueSnackbar } = useSnackbar(); // SnackBar on/off
  const [openMenu, setOpenMenu] = useState(false); // Menu on/off
  const { setMenuSelect, selected, setSelected } = useWinetrakContext();

  let searchObj = {};
  if (searchData.vintage === 0) {
    searchObj.wineText = searchData.wineText;
  } else {
    searchObj = { ...searchData };
  }

  // Fetch Bottles that match query
  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ['bottles', searchObj, page, isXs ? 4 : 7],
    queryFn: searchBottles,
    staleTime: 30000,
    // refetchOnWindowFocus: true,
  });

  // Checked = array of bottle id numbers
  // const handleToggle = (value, vint) => () => {
  //   console.log('Toggle Value', value, vint);
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  // Checked = array of objects {bottle id , vintage}
  const handleToggle = (value, vint) => () => {
    console.log('Toggle Value', value, vint);
    const currentIndex = checked.findIndex(({ bid }) => bid === value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push({ bid: value, vint });
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Menus (action icon)
  const handleOpenMenu = (event, bottle) => {
    console.log(bottle, Object.keys(selected));
    // // Disable action menu when RH is shown
    if (Object.keys(selected).length !== 0) {
      enqueueSnackbar('Bottle already selected', { variant: 'error' });
      return;
    }
    // setBottleSelected(bottle); // Store bottle selected for actions
    setSelected(bottle); // Store bottle selected for actions
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = (e) => {
    console.log('Close...', e.type, selected);
    // If menu closed by clicking outside then an event is passed
    if (e.type) setSelected({});
    setOpenMenu(null);
  };

  const handleEditDelete = () => {
    console.log('Edit/Delete', selected);
    handleCloseMenu('e');
    // if (checked.length > 0) {
    //   setBottleSelected({});
    //   enqueueSnackbar('Checked not supported for edit', { variant: 'error' });
    //   return;
    // }
    setMenuSelect('e'); // Open edit screen
  };

  const handleConsume = () => {
    console.log('Consume', selected);
    handleCloseMenu('c');
    if (checked.length > 0) {
      setSelected({});
      enqueueSnackbar('Checked not supported for consume', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
      });
      return;
    }
    setMenuSelect('c'); // Open consume screen
    // setSetConsume(bottleSelected._id); //  form (expects bid)
  };
  const handleMove = () => {
    console.log('Move', selected, checked);
    if (checked.length > 0) {
      // Check that bottleselected is one of the checked bottles
      let i = 0;
      let inc = false;
      while (i < checked.length) {
        if (selected._id === checked[i].bid) {
          inc = true;
          break;
        }
        i += 1;
      }

      if (!inc) {
        enqueueSnackbar('Move must be called from a selected bottle', { variant: 'error' });
        setSelected({}); // reset selected bottle
        handleCloseMenu('m');
        return;
      }
    }

    handleCloseMenu('m');
    setMenuSelect('m'); // Open dialog/screen with move form (expects array of bottle ids to move)
  };

  return (
    <Paper sx={{ mb: 2 }}>
      <List>
        {data &&
          data.data.map((bb) => (
            // data.map((bb) => (
            <ListItem
              key={bb._id}
              dense={isXs}
              secondaryAction={
                // <IconButton edge="end" onClick={(event) => handleOpenMenu(event, bb)}>
                <IconButton edge="end" onClick={(event) => handleOpenMenu(event, bb)}>
                  <Iconify icon="eva:more-vertical-fill" width={18} height={18} />
                </IconButton>
              }
              disablePadding
              // onContextMenu={handleContextMenu}
              style={{ cursor: 'context-menu' }}
            >
              <ListItemButton
                role={undefined}
                selected={bb._id === selected._id}
                onClick={handleToggle(bb._id, bb.vintage)}
              >
                <ListItemIcon>
                  {/* {checked.indexOf(bb._id) !== -1 && ( */}
                  {checked.findIndex(({ bid }) => bid === bb._id) !== -1 && (
                    <Checkbox
                      size="small"
                      edge="start"
                      // checked={checked.indexOf(bb._id) !== -1}

                      checked={checked.findIndex(({ bid }) => bid === bb._id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`${bb.vintage} ${bb.wineText} `}
                  secondary={`${bb.rack} ${bb.shelf} ${bb.cost ? ',' : ''}
                  ${bb.cost ? '$' : ''}${bb.cost ? bb.cost : ''} (...${bb._id.substr(
                    bb._id.length - 5
                  )})`}
                  secondaryTypographyProps={{ color: 'primary' }}
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
        <MenuItem onClick={() => handleConsume()}>Consume</MenuItem>
        <MenuItem onClick={() => handleMove()}>Move</MenuItem>
        <MenuItem onClick={() => handleEditDelete()}>Edit/Delete</MenuItem>
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
            setSearchData({ wineText: '', vintage: 0 }); // reset search display
            setMenuSelect(''); // Close consume
            setSelected({}); // Reset bottle selected
            setChecked([]);
            //   setSetEdit([]); // Controls display of RH
            //   setSetConsume('');
            //   setSetMove([]);
            // }}
          }}
        >
          <ClearIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default SearchResults;
