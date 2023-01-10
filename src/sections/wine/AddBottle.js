import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// mui
import { Button, Alert, Stack, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
// form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useWinetrakContext } from '../../components/winetrak/WinetrakContext';
import { addBottle } from '../../https/wines';

const AddBottleWine = ({ wid }) => {
  const qC = useQueryClient();
  const { setMenuSelect, selected, setSelected } = useWinetrakContext();
  // Form
  const BottleEditSchema = yup.object().shape({
    vintage: yup.number().required('Vintage is required').min(1990, 'Vintage must be > 1990'),
    rack: yup.string().required('Rack is required'),
    qty: yup.number().required('Qty needed').min(1),
  });

  const defaultValues = {
    vintage: 20,
    rack: '',
    shelf: '',
    cost: '',
    qty: 1,
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

  const mWine = useMutation({
    mutationFn: (data) => addBottle(data, data.wid),
    onSuccess: (s) => {
      console.log('ADD BOTTLE/WINE SUCCESS', s);
      qC.invalidateQueries({ queryKey: ['wines'] }); // Force refresh
    },
    onError: (e) => console.log(e),
  });

  const onSubmit = async (formdata) => {
    console.log('On Submit: ', formdata);
    for (let i = 0; i < formdata.qty; i += 1) {
      mWine.mutate({ formdata, selected });
    }
    // mWine.mutate({ formdata, wid: selected._id });

    // reset(defaultValues);
    // setSetMove([]); // Close input
    handleCancel();
  };

  const handleCancel = () => {
    setMenuSelect(''); // Close consume
    setSelected({});
  };

  return (
    <Paper elevation={12} sx={{ mb: 2 }}>
      <Stack spacing={1} sx={{ mb: 0, position: 'relative', border: 0, p: 3 }} direction="column">
        <Typography variant="body2" align="center" sx={{ mt: -1, mb: 1, color: 'primary.light' }}>
          {selected.producer} {selected.wineName} ...{selected._id.substr(selected._id.length - 5)}
        </Typography>

        {/* <Stack spacing={1} direction="row" justifyContent="center">
        <Item>..{selected._id.substr(selected._id.length - 5)}</Item>}
        </Stack> */}

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {/* <Stack spacing={1.5} direction="column">
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <Stack spacing={2} direction="row">
              <RHFTextField name="vintage" type="number" label="Vintage" size="small" />
              <RHFTextField name="cost" type="number" label="Cost" size="small" />
            </Stack>

            <Stack spacing={2} direction="row">
              <RHFTextField name="rack" type="string" label="Rack" size="small" />
              <RHFTextField name="shelf" type="string" label="Shelf" size="small" />
            </Stack>

            <RHFTextField name="qty" type="number" label="Quantity" size="small" />

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Tooltip title="Clear" placement="left-start" followCursor arrow>
                <IconButton color="error" onClick={handleCancel}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" placement="right" followCursor arrow>
                <IconButton color="primary" type="submit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack> */}
          <Grid container rowSpacing={{ xs: 1, sm: 2 }} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid xs={6}>
              <RHFTextField name="vintage" type="number" label="Vintage" size="small" />
            </Grid>
            <Grid xs={6}>
              <RHFTextField name="cost" type="number" label="Cost" size="small" />
            </Grid>
            <Grid xs={6}>
              <RHFTextField name="rack" type="string" label="Rack" size="small" />
            </Grid>
            <Grid xs={6}>
              <RHFTextField name="shelf" type="string" label="Shelf" size="small" />
            </Grid>
            <Grid xs={6}>
              <RHFTextField name="qty" type="number" label="Quantity" size="small" />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            <Tooltip title="Clear" placement="left-start" followCursor arrow>
              <IconButton color="error" onClick={handleCancel}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="right" followCursor arrow>
              <IconButton color="primary" type="submit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </FormProvider>
      </Stack>
    </Paper>
  );
};

export default AddBottleWine;

AddBottleWine.propTypes = {
  wid: PropTypes.string,
};
