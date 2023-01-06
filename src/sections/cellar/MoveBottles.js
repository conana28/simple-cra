import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// mui
import { Button, Alert, Stack, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MoveIcon from '@mui/icons-material/MoveDown';
// form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useCellarContext } from './CellarContext';
import { moveBottle } from '../../https/bottles';

const MoveBottles = ({ checked, setChecked }) => {
  console.log('Checked ', checked);
  const qC = useQueryClient();
  const { setMenuSelect, bottleSelected, setBottleSelected } = useCellarContext();
  const { rack, shelf } = bottleSelected;
  // const shelf = bottleSelected.shelf;
  // Form
  const BottleEditSchema = yup.object().shape({
    // vintage: yup.number().required('Vintage is required'),
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
  // return <div>MoveBottles {bottleSelected.wineText} </div>;

  const mBottle = useMutation({
    mutationFn: (data) => moveBottle(data.bid, data.data, data.vintage),
    onSuccess: (s) => {
      console.log('MOVE SUCCESS', s);
      qC.invalidateQueries({ queryKey: ['bottles'] }); // Force refresh
    },
    onError: (e) => console.log(e),
  });

  const onSubmit = async (data) => {
    console.log('On Submit: ', data);
    if (checked.length > 1) {
      for (let i = 0; i < checked.length; i += 1) {
        console.log(checked[i]);
        mBottle.mutate({ data, bid: checked[i].bid, vintage: checked[i].vint });
      }
    } else {
      console.log('bottleSelected._id', bottleSelected._id);
      mBottle.mutate({ data, bid: bottleSelected._id, vintage: bottleSelected.vintage }); //
    }
    // reset(defaultValues);
    // setSetMove([]); // Close input
    handleCancel();
  };

  const handleCancel = () => {
    setMenuSelect(''); // Close consume
    setBottleSelected({});
    setChecked([]);
  };
  return (
    <Paper elevation={12} sx={{ mb: 2 }}>
      <Stack spacing={1} sx={{ mb: 0, position: 'relative', border: 0, p: 3 }} direction="column">
        {/* <Typography variant="h5" align="center" sx={{ mt: -2, mb: -2 }}>
          Move {setMove.length} Bottle{setMove.length === 1 ? '' : 's'}
        </Typography> */}

        <Typography variant="body2" align="center" sx={{ mt: -1, mb: 2, color: 'primary.main' }}>
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
              <Tooltip title="Clear" placement="left-start" followCursor arrow>
                <IconButton color="error" onClick={handleCancel}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Move" placement="right" followCursor arrow>
                <IconButton color="primary" type="submit">
                  <MoveIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
    </Paper>
  );
};

export default MoveBottles;

MoveBottles.propTypes = {
  checked: PropTypes.array,
  setChecked: PropTypes.func,
};
