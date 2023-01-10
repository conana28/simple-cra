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
import { getBottlesByWine } from '../../https/bottles';
import { useWinetrakContext } from '../../components/winetrak/WinetrakContext';
import Scrollbar from '../../components/scrollbar';

const ShowBottles = () => {
  const { selected, setSelected, setMenuSelect } = useWinetrakContext();
  const [page, setPage] = useState(1);
  const isXs = useMediaQuery('(max-width:600px)');

  const { isError, isSuccess, isLoading, data, error } = useQuery({
    // queryKey: ['bottlesbywine', { wine: '6301ff4b3fccf1ba01ce8792' }, page, isXs ? 4 : 7],
    queryKey: ['bottlesbywine', selected._id],
    queryFn: getBottlesByWine,
    staleTime: 30000,
  });

  return (
    // eslint-disable-next-line no-nested-ternary
    <Paper sx={{ height: selected.bottles.length > 5 ? (isXs ? 250 : 620) : null, mb: 2 }}>
      <Scrollbar>
        <List>
          {data &&
            data.map((bb) => (
              <ListItem
                key={bb._id}
                dense={isXs}
                disablePadding
                // onContextMenu={handleContextMenu}
                style={{ cursor: 'context-menu' }}
              >
                <ListItemButton role={undefined} selected={bb._id === selected._id}>
                  <ListItemText
                    //   primary={` ${bb.wineText} `}
                    primary={`${bb.vintage} : ${bb.rack} ${bb.shelf ? bb.shelf : ''} ${
                      bb.cost ? ',' : ''
                    }
                  ${bb.cost ? '$' : ''}${bb.cost ? bb.cost : ''} (...${bb._id.substr(
                      bb._id.length - 5
                    )})`}
                    secondaryTypographyProps={{ color: 'primary' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>

        <Stack direction="row" justifyContent="center">
          <IconButton
            color="primary"
            onClick={() => {
              setMenuSelect(''); // Close consume
              setSelected({}); // Reset bottle selectwineText: '', vintage: 0 ed
            }}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
      </Scrollbar>

      {isLoading && (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="primary" />
        </Stack>
      )}
    </Paper>
  );
};

export default ShowBottles;
