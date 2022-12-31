import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Alert, Stack, Typography, Paper } from '@mui/material';
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
BtlMove.propTypes = {
  setMove: PropTypes.array,
  bottleSelected: PropTypes.object,
  setSetMove: PropTypes.func,
  setChecked: PropTypes.func,
  setBottleSelected: PropTypes.func,
};

function BtlMove({ setMove, setSetMove, bottleSelected, setBottleSelected, setChecked }) {
  const queryClient = useQueryClient();

  // Get the bottle details - expects an arry
  console.log('setMove: ', bottleSelected, setMove);
  // const id = getKey(setEdit, '_id');
  // const vintage = getKey(setEdit, 'vintage');
  // const wineText = getKey(setEdit, 'wineText');
  // const rack = getKey(setEdit, 'rack');
  // const shelf = getKey(setEdit, 'shelf') ? getKey(setEdit, 'shelf') : '';
  // const wineId = getKey(setEdit, 'wineId') ? getKey(setEdit, 'wineId') : 'n/a';
  const { rack } = bottleSelected;
  const shelf = bottleSelected.shelf;
  // Form
  const BottleEditSchema = yup.object().shape({
    vintage: yup.number().required('Vintage is required'),
    rack: yup.string().required('Rack is required'),
  });

  const defaultValues = {
    rack,
    shelf,
  };

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
    // mutationFn: (data) =>
    //   axios.patch(`https://fancy-hem-bull.cyclic.app/api/bottles/${id}`, {
    //     // vintage: data.data.vintage,
    //     rack: data.data.rack,
    //     shelf: data.data.shelf,
    //     cost: data.data.cost,
    //   }),
    // onSuccess: (s) => {
    //   // console.log('on SUCCESS');
    //   queryClient.invalidateQueries({ queryKey: ['bottles'] }); // Force refresh
    // },
    // onError: (e) => console.log(e),
  });

  const onSubmit = async (data) => {
    console.log('On Submit: ', data);
    // Update the record
    // updateBottle.mutate({ data }); // Force refresh
    // reset(defaultValues);
    setSetMove([]); // Close input
    setBottleSelected({});
  };

  useEffect(() => {
    console.log('Use Effect');
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMove]);

  return (
    <Paper elevation={12}>
      <Stack spacing={1} sx={{ mb: 0, position: 'relative', border: 0, p: 3 }} direction="column">
        <Typography variant="h5" align="center" sx={{ mt: -2, mb: -2 }}>
          Move {setMove.length} Bottle{setMove.length === 1 ? '' : 's'}
        </Typography>

        <Typography variant="body2" align="center" sx={{ mt: -1, color: 'primary.main' }}>
          {bottleSelected.wineText} ({bottleSelected.wineId})
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1.5} direction="column">
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <Stack spacing={2} direction="row">
              <RHFTextField name="rack" type="string" label="Rack" size="small" />
              <RHFTextField name="shelf" type="string" label="Shelf" size="small" />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Button
                sx={{ mt: 0, bgcolor: 'error.main' }}
                variant="contained"
                size="small"
                onClick={() => {
                  setSetMove([]);
                  setBottleSelected({});
                  setChecked([]);
                }}
              >
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
              >
                Move
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
    </Paper>
  );
}

export default BtlMove;
