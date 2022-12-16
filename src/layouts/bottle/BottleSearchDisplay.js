/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Button, Pagination, Stack } from '@mui/material';

import { fetchBottles, searchBottles } from '../../https/bottles';

export const BottleSearchDisplay = ({ searchData, setSearchData, setSetEdit }) => {
  const queryClient = useQueryClient();

  let searchObj = {};
  if (searchData.vintage === 0) {
    searchObj.wineText = searchData.wineText;
  } else {
    searchObj = { ...searchData };
  }
  const [page, setPage] = useState(1);

  const updateBottle = useMutation({
    mutationFn: ({ id, vintage, rack }) => {
      console.log('PATCH ', id, vintage, rack);
      return axios.patch(`https://fancy-hem-bull.cyclic.app/api/bottles/${id}`, {
        // eslint-disable-next-line object-shorthand
        vintage: vintage,
        // eslint-disable-next-line object-shorthand
        rack: rack,
        // shelf: 'BBC',
      });
    },
    onSuccess: (s) => {
      console.log(s);
      // setSetEdit(true);
      queryClient.invalidateQueries({ queryKey: ['bottles'] });
      //   queryClient.invalidateQueries(["bottles"]);
    },
    onError: (e) => console.log(e),
  });

  const { isError, isSuccess, isLoading, data, error } = useQuery({
    // fetchBottles,
    queryKey: ['bottles', searchObj, page],
    queryFn: searchBottles,
    staleTime: 60000,
    // queryFn: ({ queryKey }) =>
    //   axios
    //     .post(
    //       `https://fancy-hem-bull.cyclic.app//api/bottles/bottlesearch?page=${queryKey[2]}`,
    //       queryKey[1]
    //     )
    //     .then((res) => res.data),
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

  const editBottle = (id, vintage, rack) => {
    console.log('Edit bottle with id: = ', id, vintage, rack);
    // updateBottle.mutate({ id, vintage, rack }); // Force refresh
    setSetEdit(id);
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
              editBottle(bb._id, bb.vintage, bb.rack);
            }}
          >
            {bb.wineText} {bb.vintage} {bb.rack} {bb.shelf}
          </h5>
        ))}
      <Stack direction="row">
        <Pagination count={data.pages} page={page} onChange={handleChange} sx={{ mb: 2 }} />
        <Button>aaaa</Button>
        <Button
          onClick={() => {
            setSearchData({ bottleSearchString: '', vintageSearchString: 0 });
            setSetEdit(false);
          }}
          variant="contained"
        >
          Search again
        </Button>
      </Stack>
    </>
  );
};

BottleSearchDisplay.propTypes = {
  searchData: PropTypes.object,
  setSearchData: PropTypes.func,
  setSetEdit: PropTypes.func,
};
