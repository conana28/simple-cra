import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Alert, Stack, Typography, Paper, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// form
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
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

function BtlConsume({ setConsume, setSetConsume, bottleSelected, setBottleSelected }) {
  const queryClient = useQueryClient();

  // Get the bottle details - expects an arry
  console.log('setConsume: ', setConsume);

  const [consumeDate, setConsumeDate] = useState(
    format(new Date(), 'dd/MM/yy') // Date in string format for text input
  );

  // Form
  const ConsumeSchema = yup.object().shape({
    consume: yup.string().nullable().required('Date is required'),
  });

  const defaultValues = {
    consume: new Date(),
  };

  const methods = useForm({
    resolver: yupResolver(ConsumeSchema),
    defaultValues,
  });
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const updateBottle = useMutation({
    mutationFn: (data) => {
      // console.log(data);
      axios.delete(`https://fancy-hem-bull.cyclic.app/api/bottles/${bottleSelected._id}`, {
        data,
      });
    },
    onSuccess: (s) => {
      console.log('on CONSUME SUCCESS');
      // refetch all active queries partially matching a query key:
      // await queryClient.refetchQueries({ queryKey: ['bottles'], type: 'active' });
      // console.log('on SUCCESS REFETCH');
      // await queryClient.invalidateQueries({ queryKey: ['bottles'], refetchType: 'all' }); // Force refresh
      queryClient.invalidateQueries({ queryKey: ['bottles'] }); // Force refresh
      // queryClient.removeQueries({ queryKey: ['bottles'] }); // Force refresh
    },
    onError: (e) => console.log(e),
  });

  const monthsShort = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  const onSubmit = async (data) => {
    console.log('On Submit: ', data);
    const d = data.consume;
    const dd = `${d.substring(11, 15)}/${monthsShort[d.substring(4, 7)]}/${d.substring(8, 10)}`;
    console.log(bottleSelected._id, dd);

    // Consume the record
    updateBottle.mutate({ consume: dd });
    // reset(defaultValues);
    setSetConsume(''); // Close input
    setBottleSelected({});
  };

  const handleCancel = () => {
    setSetConsume(''); // Close input
    setBottleSelected({});
  };

  // useEffect(() => {
  //   console.log('Use Effect');
  //   reset(defaultValues);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [setConsume]);

  return (
    <Paper elevation={12}>
      <Stack spacing={1} sx={{ mb: 5, position: 'relative', border: 0, p: 3 }} direction="column">
        <Typography variant="h5" align="center">
          Consume Bottle
        </Typography>

        <Typography variant="body2" align="center">
          {bottleSelected.wineText} ({bottleSelected.wineId})
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ p: 3 }}>
            <Controller
              name="consume"
              // defaultValue={new Date()}
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    {...field}
                    label="Consume date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                  <Typography color="red" sx={{ ml: 1, mt: 1 }}>
                    {errors.consume?.message}
                  </Typography>
                </LocalizationProvider>
              )}
            />
          </Box>

          {/* <Box sx={{ flexGrow: 1 }} /> */}

          <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="small" type="submit" variant="contained">
              Consume
            </Button>
            <Button size="small" variant="contained" color="info" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </Paper>
  );
}

export default BtlConsume;

BtlConsume.propTypes = {
  setConsume: PropTypes.string,
  setSetConsume: PropTypes.func,
  setBottleSelected: PropTypes.func,
  bottleSelected: PropTypes.object,
};
