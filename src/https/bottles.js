// import { useCallback } from "react";
import axios from 'axios';

export const fetchBottles = async () => {
  const response = await axios.get('https://fancy-hem-bull.cyclic.app/api/bottles');
  const bottles = response.data.bottles1x;
  return bottles;
};

export const searchBottles = async (key) => {
  console.log('SEARCH BOTTLES HTTP', key);
  const response = await axios.post(
    `https://fancy-hem-bull.cyclic.app//api/bottles/bottlesearch?page=${key.queryKey[2]}`,
    key.queryKey[1]

    // 'https://fancy-hem-bull.cyclic.app/api/bottles/bottlesearch?limit=12',
    // key.queryKey[1]
    // {
    //   wineText: 'Bell',
    // }
  );
  console.log(response);
  const bottles = response.data;
  return bottles;
};
