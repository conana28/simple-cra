/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Button, Pagination, Stack } from '@mui/material';

import { searchBottles } from '../../https/bottles';

export const TestSearchDisplay = ({ searchData, setSearchData, setSetEdit }) => {
  const queryClient = useQueryClient();

  let searchObj = {};
  if (searchData.vintage === 0) {
    searchObj.wineText = searchData.wineText;
  } else {
    searchObj = { ...searchData };
  }
  const [page, setPage] = useState(1);

  // const updateBottle = useMutation({
  //   mutationFn: ({ id, vintage, rack }) => {
  //     console.log('PATCH ', id, vintage, rack);
  //     return axios.patch(`https://fancy-hem-bull.cyclic.app/api/bottles/${id}`, {
  //       // eslint-disable-next-line object-shorthand
  //       vintage: vintage,
  //       // eslint-disable-next-line object-shorthand
  //       rack: rack,
  //       // shelf: 'BBC',
  //     });
  //   },
  //   onSuccess: (s) => {
  //     console.log(s);
  //     // setSetEdit(true);
  //     queryClient.invalidateQueries({ queryKey: ['bottles'] });
  //     //   queryClient.invalidateQueries(["bottles"]);
  //   },
  //   onError: (e) => console.log(e),
  // });

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

  // console.log('Data: ', data);

  // Select bottle for further action
  // const editBottle = (id, vintage, rack) => {
  const editBottle = (b) => {
    console.log(b);
    console.log('Edit bottle with id: = ', b._id, b.vintage, b.rack);
    // updateBottle.mutate({ id, vintage, rack }); // Force refresh
    // setSetEdit(id);
    setSetEdit(Object.entries(b));
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      Display Bottles for search text = {searchData.wineText} , vintage ={' '}
      {searchData.vintage === 0 ? 'N/a' : searchData.vintage}
      {/* display bottles returned  */}
      {data &&
        data.data.map((bb) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <h5
            key={bb._id}
            onClick={() => {
              // editBottle(bb._id, bb.vintage, bb.rack);
              editBottle(bb);
            }}
          >
            {bb.vintage} {bb.wineText}, {bb.rack} {bb.shelf} , {bb.cost}
          </h5>
        ))}
      <Stack direction="row" justifyContent="space-between">
        <Pagination count={data.pages} page={page} onChange={handleChange} sx={{ mb: 2 }} />
        <Button
          onClick={() => {
            setSearchData({ bottleSearchString: '', vintageSearchString: 0 });
            setSetEdit(false);
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
};
