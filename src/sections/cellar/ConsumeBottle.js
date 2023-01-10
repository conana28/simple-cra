import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  IconButton,
  Alert,
  Stack,
  Typography,
  Paper,
  Box,
  TextField,
  Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ClearIcon from '@mui/icons-material/Clear';
// form
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';

import SvgColor from '../../components/svg-color';

import { useWinetrakContext } from '../../components/winetrak/WinetrakContext';
import { consumeBottle } from '../../https/bottles';

const ConsumeBottles = () => {
  const qC = useQueryClient();
  const { setMenuSelect, selected, setSelected } = useWinetrakContext();
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

  const onSubmit = async (data) => {
    console.log('On Submit: ', data);
    const d = data.consume;
    const dd = `${d.substring(11, 15)}/${monthsShort[d.substring(4, 7)]}/${d.substring(8, 10)}`;
    // Consume the bottle
    await updateBottle.mutate({ consume: dd });
    // reset(defaultValues);
    setMenuSelect(''); // Close consume
    setSelected({}); // Reset bottle selected
    // setUserInfo((prev) => !prev);
  };
  const updateBottle = useMutation({
    mutationFn: (data) => consumeBottle(selected._id, data),
    onSuccess: (s) => {
      console.log('on CONSUME SUCCESS', s.data.message);
      qC.invalidateQueries({ queryKey: ['bottles'] });
    },
    onError: (e) => console.log(e),
  });

  const handleCancel = () => {
    setMenuSelect(''); // Close consume
    setSelected({});
  };

  return (
    <Paper elevation={12}>
      <Stack spacing={1} sx={{ mb: 2, position: 'relative', border: 0, p: 2 }} direction="column">
        {/* <Typography variant="h5" align="center">
          Consume Bottle
        </Typography> */}

        <Typography variant="body2" align="center" color="primary">
          {selected.wineText} ({selected.wineId})
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
            {/* <Button size="small" variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button> */}
            <Tooltip title="Clear" placement="left-start" followCursor arrow>
              <IconButton color="error" onClick={handleCancel}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Consume" placement="right-start" arrow>
              <IconButton color="primary" type="submit">
                <SvgColor src="/assets/icons/winetrak/corkscrew.svg" />
              </IconButton>
            </Tooltip>

            {/* <Button size="small" type="submit" variant="contained">
              Consume
            </Button> */}
          </Stack>
        </FormProvider>
      </Stack>
    </Paper>
  );
};

export default ConsumeBottles;

ConsumeBottles.propTypes = {
  setMenuSelect: PropTypes.string,
  setSetMenuSelected: PropTypes.func,
  setSelected: PropTypes.func,
  selected: PropTypes.object,
};

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
