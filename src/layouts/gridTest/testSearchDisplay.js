/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Button, Pagination, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import MenuPopover from '../../components/MenuPopover';
import Iconify from '../../components/Iconify';

import { searchBottles } from '../../https/bottles';

export const TestSearchDisplay = ({
  searchData,
  setSearchData,
  setSetEdit,
  bottleSelected,
  setBottleSelected,
}) => {
  const queryClient = useQueryClient();
  // Action Menu - When three dots clicked
  const [openMenu, setOpenMenuActions] = useState(null);
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
    staleTime: 60000,
  });

  useEffect(() => {
    console.log('Component mounted');
  }, []);

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

  // Menus
  const handleOpenMenu = (event, bottle) => {
    setBottleSelected(bottle); // Remember bottle selected for actions
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleEditDelete = () => {
    console.log('Edit/Delete', bottleSelected);
    handleCloseMenu();
    setSetEdit(Object.entries(bottleSelected)); // Open dialog/screen with new form (expects an array)
    // setShowEditDelete(true);
    // setShowBottles(''); // Close bottles
  };

  return (
    <>
      Display Bottles for search text = {searchData.wineText} , vintage ={' '}
      {searchData.vintage === 0 ? 'N/a' : searchData.vintage}
      {/* display bottles returned  */}
      <List>
        {data &&
          data.data.map((bb) => (
            <ListItemButton key={bb._id}>
              <ListItem
                selected={bb._id === bottleSelected._id}
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
                  primary={`${bb.vintage} ${bb.wineText}`}
                  secondary={`${bb.rack} ${bb.shelf} , ${bb.cost}`}
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
        <MenuItem>Consume</MenuItem>
        <MenuItem>Move</MenuItem>
        {/* <MenuItem>Edit/Delete</MenuItem> */}
        {/* <MenuItem onClick={() => handleConsume()}>Consume</MenuItem>
        <MenuItem onClick={() => handleMove()}>Move</MenuItem> */}
        <MenuItem onClick={() => handleEditDelete()}>Edit/Delete</MenuItem>
      </MenuPopover>
      <Stack direction="row" justifyContent="space-between">
        <Pagination count={data.pages} page={page} onChange={handleChange} sx={{ mb: 2 }} />
        <Button
          onClick={() => {
            setSearchData({ bottleSearchString: '', vintageSearchString: 0 }); // reset search display
            setSetEdit([]); // Controls display of RH
          }}
          variant="contained"
          size="small"
        >
          Search again
        </Button>
      </Stack>
    </>
  );
};

TestSearchDisplay.propTypes = {
  searchData: PropTypes.object,
  setSearchData: PropTypes.func,
  setSetEdit: PropTypes.func,
  bottleSelected: PropTypes.object,
  setBottleSelected: PropTypes.func,
};
