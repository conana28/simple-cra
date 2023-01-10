import axios from 'axios';

const URL = 'https://fancy-hem-bull.cyclic.app/api/';

export const searchWines = async (key) => {
  console.log('SEARCH WINES HTTP', key);
  const response = await axios.post(
    `${URL}wines/winesearch?limit=${key.queryKey[3]}&page=${key.queryKey[2]}`,
    key.queryKey[1]
  );
  console.log(response);
  const wines = response.data;
  return wines;
};

export const addBottle = async (data) => {
  console.log('ADD BOTTLE/WINE HTTP', data);
  const payLoad = {
    vintage: data.formdata.vintage,
    rack: data.formdata.rack,
    shelf: data.formdata.shelf,
    cost: data.formdata.cost,
    country: data.selected.country,
    wineText: `${data.selected.producer}-${data.selected.wineName}`,
    wineId: data.selected.wineId,
    wId: data.selected._id,
  };
  console.log('Load: ', payLoad);
  const response = await axios.post(`${URL}bottles`, payLoad);
  console.log(response);
  const wines = response.data;
  return wines;
};
