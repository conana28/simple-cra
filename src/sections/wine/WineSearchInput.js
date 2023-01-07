import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';

// form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Paper, Stack, Alert, Button, IconButton, Tooltip, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';

WineSearchInput.propTypes = {
  wineSearchData: PropTypes.object,
  setWineSearchData: PropTypes.func,
};
// ----------------------------------------------------------------------

export default function WineSearchInput({ wineSearchData, setWineSearchData }) {
  const { enqueueSnackbar } = useSnackbar(); // SnackBar on/off
  // form
  const defaultValues = {
    producer: '',
    wineName: '',
    country: '',
    region: '',
    subRegion: '',
  };
  const WineSearchSchema = yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(WineSearchSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = methods;

  const onSubmit = async (formdata) => {
    console.log(formdata);
    const searchObj = {
      ...(formdata.producer && { producer: formdata.producer }),
      ...(formdata.wineName && { wineName: formdata.wineName }),
      ...(formdata.country && { country: formdata.country }),
      ...(formdata.region && { region: formdata.region }),
      ...(formdata.subRegion && { subRegion: formdata.subRegion }),
    };
    console.log('SearchObj: ', searchObj);

    if (Object.entries(searchObj).length > 0) {
      console.log('GET WINES...');
      setWineSearchData(searchObj);
      // reset();
      // setShowWineSelect(false); // Close this
      // setShowWines(true); // Open show results
    } else {
      // Replace with error message
      enqueueSnackbar('No search criteria entered', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
      });
    }

    // const response = await axios.post(
    //   `https://fancy-hem-bull.cyclic.app//api/bottles/bottlesearch?limit=5&page=1`,
    //   searchObj
    // );

    // if (response.data.count > 0) {
    //   // bottles found
    // //   setSearchData(searchObj); // trigger search results
    // }
  };

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <RHFTextField name="producer" label="Producer" size="small" />
          <RHFTextField name="wineName" label="Wine Name" size="small" />
          <RHFTextField name="country" label="Country" size="small" />
          <RHFTextField name="region" label="Region" size="small" />
          <RHFTextField name="subRegion" label="Sub Region" size="small" />

          <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title="Clear" placement="left-end" arrow>
              <IconButton
                sx={{ color: 'primary.light' }}
                onClick={() => {
                  // navigate('/dashboard/two');
                }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Search" placement="right-end" arrow>
              <IconButton sx={{ color: 'secondary.light' }} type="submit">
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </FormProvider>
      {isSubmitted && isSubmitSuccessful && <p>No matching bottles</p>}
      {isSubmitting && <LinearProgress color="primary" sx={{ mt: 4 }} />}
    </Paper>
  );
}

// export default WineSearchInput;
