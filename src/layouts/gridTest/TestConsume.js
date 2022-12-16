import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Alert, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { format } from 'date-fns';

// form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';

function getKey(array, key) {
  // console.log(array);
  const value = array.find((element) => element[0] === key);
  if (value) {
    return value[1];
  }
  return null;
}

function TestConsume({ setEdit, setSetEdit }) {
  const queryClient = useQueryClient();

  // Get the bottle details
  console.log('setEdit: ', setEdit);
  const id = getKey(setEdit, '_id');
  const vintage = getKey(setEdit, 'vintage');
  const wineText = getKey(setEdit, 'wineText');
  const rack = getKey(setEdit, 'rack');
  const shelf = getKey(setEdit, 'shelf') ? getKey(setEdit, 'shelf') : '';
  const cost = getKey(setEdit, 'cost') ? getKey(setEdit, 'cost') : 0;

  console.log('Cost: ', cost);

  const [consumeDate, setConsumeDate] = React.useState(
    format(new Date(), 'dd/MM/yy') // Date in string format for text input
  );

  // Form
  const BottleEditSchema = yup.object().shape({
    vintage: yup.number().required('Vintage is required'),
    rack: yup.string().required('Rack is required'),
  });

  const defaultValues = {
    vintage,
    rack,
    shelf,
    cost,
  };

  // const a = useMemo(()=> {wineText: wineText, rack: rack, shelf: shelf},[])

  const methods = useForm({
    resolver: yupResolver(BottleEditSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const updateBottle = useMutation({
    mutationFn: (data) =>
      axios.patch(`https://fancy-hem-bull.cyclic.app/api/bottles/${id}`, {
        vintage: data.data.vintage,
        rack: data.data.rack,
        shelf: data.data.shelf,
        cost: data.data.cost,
      }),
    onSuccess: (s) => {
      // console.log('on SUCCESS');
      queryClient.invalidateQueries({ queryKey: ['bottles'] }); // Force refresh
    },
    onError: (e) => console.log(e),
  });

  const onSubmit = async (data) => {
    console.log('On Submit: ', data);
    // Update the record
    updateBottle.mutate({ data }); // Force refresh
    // reset(defaultValues);
    // setSetEdit([]); // Close input
  };

  useEffect(() => {
    console.log('Use Effect');
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEdit]);

  return (
    <Stack spacing={1} sx={{ mb: 5, position: 'relative', border: 1, p: 1 }} direction="column">
      <Typography variant="h5" align="center">
        Edit Bottle
      </Typography>

      <Typography variant="body2" align="center">
        {wineText} {rack} {shelf}
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="column">
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <Stack spacing={2} direction="row">
            <RHFTextField name="vintage" type="number" label="Vintage" />
            <RHFTextField name="cost" type="number" label="Cost" />
          </Stack>
          <Stack spacing={2} direction="row">
            <RHFTextField name="rack" type="string" label="Rack" />
            <RHFTextField name="shelf" type="string" label="Shelf" />
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Button onClick={() => setSetEdit([])} variant="contained" size="small">
              Cancel
            </Button>
            <LoadingButton
              // fullWidth
              //   color="inherit"
              size="small"
              type="submit"
              variant="contained"
              //   loading={isSubmitSuccessful || isSubmitting}
              loading={isSubmitting}
              sx={{
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                },
              }}
            >
              Edit
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  );
}

export default TestConsume;

TestConsume.propTypes = {
  setEdit: PropTypes.array,
  setSetEdit: PropTypes.func,
};
