import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axios';

// eslint-disable-next-line react/prop-types, arrow-body-style
export const BottleSearchDisplay = ({ searchData }) => {
  const [bottles, setBottles] = useState(null);

  //   const fetchBottles = async () => {
  //     console.log('started fetching');
  //     // const response = await axios.get('https://courageous-tuna-shirt.cyclic.app/api/bottles');
  //     const response = await axios.get('https://fancy-hem-bull.cyclic.app/api/bottles');
  //     const b = response.data.bottles1x;
  //     console.log('Bottles: ', b);
  //     if (b) setBottles(b);
  //   };

  // Minimal template approach
  const fetchBottles = useCallback(async () => {
    try {
      const response = await axios.get('https://fancy-hem-bull.cyclic.app/api/bottles');

      setBottles(response.data.bottles1x);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log('Component mounted');
    fetchBottles();
  }, [fetchBottles]);

  return (
    <>
      Display Bottles for search text = {searchData.bottleSearchString} , vintage ={' '}
      {searchData.vintageSearchString === 0 ? 'N/a' : searchData.vintageSearchString}
      {/* display bottles returned  */}
      {bottles && bottles.map((bb) => <p key={bb._id}>{bb.wineText}</p>)}
    </>
  );
};

BottleSearchDisplay.propTypes = {
  searchData: PropTypes.object,
};
