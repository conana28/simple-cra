import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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
import { searchBottles } from '../../https/bottles';
import { useWinetrakContext } from '../../components/winetrak/WinetrakContext';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function BottleSearchInput({ setSearchData }) {
  const [matchFound, setMatchFound] = useState(false);
  const { setSelected } = useWinetrakContext();
  // form
  const BottleSearchSchema = yup.object().shape({
    wineText: yup.string().required('Bottle name is required'),
  });

  const defaultValues = {
    wineText: '',
    vintage: 0,
  };

  const methods = useForm({
    resolver: yupResolver(BottleSearchSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = methods;

  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const onSubmit = async (formdata) => {
    let searchObj = {};
    if (formdata.vintage === 0) {
      searchObj.wineText = formdata.wineText;
    } else {
      searchObj = { ...formdata };
    }
    const response = await axios.post(
      `https://fancy-hem-bull.cyclic.app//api/bottles/bottlesearch?limit=5&page=1`,
      searchObj
    );

    if (response.data.count > 0) {
      // bottles found
      setSelected({});
      setMatchFound(true);
      setSearchData(searchObj); // trigger search results
    }
  };

  return (
    <Paper sx={{ p: 1, mb: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* <Stack spacing={1} direction="row" component={Paper} sx={{ p: 1 }} alignItems="center"> */}
        <Grid container spacing={0}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <Grid xs={6}>
            <RHFTextField name="wineText" label="Bottle text" size="small" />
          </Grid>
          <Grid xs={3}>
            <RHFTextField
              name="vintage"
              type="number"
              label="Vintage"
              size="small"
              sx={{ ml: 1 }}
            />
          </Grid>
          {/* <LoadingButton
          // fullWidth
          //   color="inherit"
          size="small"
          type="submit"
          variant="contained"
          //   loading={isSubmitSuccessful || isSubmitting}
          loading={isSubmitting}
          sx={{
            // alignContent: 'end',
            // justifyContent: 'center',
            // bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Search
        </LoadingButton> */}
          <Grid container xs={2} justifyContent="flex-end">
            {/* <LoadingButton
              color="primary"
              type="submit"
              variant="text"
              // variant="outlined"
              loadingPosition="center"
              startIcon={<SearchIcon />}
              loading={isSubmitting}
              sx={{ mt: 0.5, ml: 2 }}
            /> */}
            <IconButton color="primary" type="submit">
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid container xs={1} justifyContent="flex-end">
            <IconButton
              color="primary"
              onClick={() => {
                reset();
                setSearchData({ wineText: '', vintage: 0 });
                setMatchFound(false);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </FormProvider>
      {isSubmitted && isSubmitSuccessful && !matchFound && <p>No matching bottles</p>}
      {isSubmitting && <LinearProgress color="primary" sx={{ mt: 4 }} />}
    </Paper>
  );
}
