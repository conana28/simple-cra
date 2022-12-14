import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

import { fetchBottles, searchBottles } from '../../https/bottles';

export const BottleSearchDisplay = ({ searchData, setSearchData }) => {
  let searchObj = {};
  if (searchData.vintage === 0) {
    searchObj.wineText = searchData.wineText;
  } else {
    searchObj = { ...searchData };
  }

  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ['bottles', searchObj],
    // fetchBottles,
    searchBottles,
    {
      staleTime: 60000,
    }
  );

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

  return (
    <>
      Display Bottles for search text = {searchData.wineText} , vintage ={' '}
      {searchData.vintage === 0 ? 'N/a' : searchData.vintage}
      {/* display bottles returned  */}
      {data &&
        data.map((bb) => (
          <p key={bb._id}>
            {bb.wineText} {bb.vintage}
          </p>
        ))}
      <Button
        onClick={() => setSearchData({ bottleSearchString: '', vintageSearchString: 0 })}
        variant="contained"
      >
        Search again
      </Button>
    </>
  );
};

BottleSearchDisplay.propTypes = {
  searchData: PropTypes.object,
  setSearchData: PropTypes.func,
};
