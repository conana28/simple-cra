import { useState } from 'react';
// This import will add Additional methods for yup validation library
// https://availity.github.io/sdk-js/resources/yup
// import '@availity/yup';
import * as yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Paper, Stack, Alert, Button, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function BottleSearchInput({ setSearchData }) {
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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const onSubmit = async (data) => {
    console.log(data);
    setSearchData(data);
    await delay(2000);

    reset();
    // try {
    //   await login(data.email, data.password);
    // } catch (error) {
    //   console.error(error);

    //   reset();

    //   setError('afterSubmit', {
    //     ...error,
    //     message: error.message,
    //   });
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1} direction="row" component={Paper} sx={{ p: 1 }} alignItems="center">
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="wineText" label="Search for bottle" size="small" />
        <RHFTextField name="vintage" type="number" label="Vintage" size="small" />
        {/* <Button variant="contained" size="small">
          A
        </Button> */}
        <LoadingButton
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
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
