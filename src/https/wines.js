import axios from 'axios';

const URL = 'https://fancy-hem-bull.cyclic.app/api/bottles/';

export const searchWines = async (key) => {
  console.log('SEARCH WINES HTTP', key);
  const response = await axios.post(
    `${URL}winesearch?limit=${key.queryKey[3]}&page=${key.queryKey[2]}`,
    key.queryKey[1]
  );
  console.log(response);
  const wines = response.data;
  return wines;
};
