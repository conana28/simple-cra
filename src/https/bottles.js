// import { useCallback } from "react";
import axios from 'axios';

const URL = 'https://fancy-hem-bull.cyclic.app/api/bottles/';

export const fetchBottles = async () => {
  const response = await axios.get('https://fancy-hem-bull.cyclic.app/api/bottles');
  const bottles = response.data.bottles1x;
  return bottles;
};

export const searchBottles = async (key) => {
  console.log('SEARCH BOTTLES HTTP', key);
  const response = await axios.post(
    `${URL}bottlesearch?limit=${key.queryKey[3]}&page=${key.queryKey[2]}`,
    key.queryKey[1]
  );
  console.log(response);
  const bottles = response.data;
  return bottles;
};

// Consume a bottle

export const consumeBottle = async (id, data) => {
  console.log('CONSUME BOTTLE HTTP', id, data);
  const response = await axios.delete(`${URL}${id}`, {
    data,
  });
  console.log(response);
  return response;
};

export const moveBottle = async (id, data, vintage) => {
  console.log('MOVE BOTTLE HTTP', id, data, vintage);
  const response = await axios.patch(`${URL}${id}`, {
    vintage, // Valid vintage required by api
    rack: data.rack, // Rack required by api
    shelf: data.shelf,
  });
  console.log(response);
  return response;
};

export const updateBottle = async (id, data) => {
  console.log('UPDATE BOTTLE HTTP', id, data);
  const response = await axios.patch(`${URL}${id}`, {
    vintage: data.vintage, // Valid vintage required by api
    rack: data.rack, // Rack required by api
    shelf: data.shelf,
    cost: data.cost,
  });
  console.log(response);
  return response;
};

export const getBottlesByWine = async (key) => {
  console.log('GET BOTTLEs BY WINE HTTP', key.queryKey[1]);
  const response = await axios.get(`${URL}wine/${key.queryKey[1]}`);
  // const response = 'AA';
  console.log(response.data.bottles);
  const sorted = response.data.bottles.sort((a, b) => a.vintage - b.vintage);
  return sorted;
};
