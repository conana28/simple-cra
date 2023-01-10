import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// mui
import { Button, Alert, Stack, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
// form
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useWinetrakContext } from '../../components/winetrak/WinetrakContext';
import { updateBottle } from '../../https/bottles';

const EditBottles = ({ checked, setChecked }) => {
  console.log('Checked ', checked);
  const qC = useQueryClient();
  const { setMenuSelect, selected, setSelected } = useWinetrakContext();
  const { vintage, rack, shelf } = selected;
  let { cost } = selected;
  if (cost === undefined || cost === null) {
    cost = 0;
  }
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

  const mBottle = useMutation({
    mutationFn: (data) => updateBottle(data.bid, data.data),
    onSuccess: (s) => {
      console.log('UPDATE SUCCESS', s);
      qC.invalidateQueries({ queryKey: ['bottles'] }); // Force refresh
    },
    onError: (e) => console.log(e),
  });

  const onSubmit = async (data) => {
    console.log('On Submit: ', data);
    if (checked.length > 1) {
      for (let i = 0; i < checked.length; i += 1) {
        console.log(checked[i]);
        mBottle.mutate({ data, bid: checked[i].bid });
      }
    } else {
      console.log('selected._id', selected._id);
      mBottle.mutate({ data, bid: selected._id }); //
    }
    // reset(defaultValues);
    // setSetMove([]); // Close input
    handleCancel();
  };

  const handleCancel = () => {
    setMenuSelect(''); // Close consume
    setSelected({});
    setChecked([]);
  };
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Paper elevation={12} sx={{ mb: 2 }}>
      <Stack spacing={1} sx={{ mb: 0, position: 'relative', border: 0, p: 3 }} direction="column">
        <Typography variant="body2" align="center" sx={{ mt: -1, color: 'primary.main' }}>
          {selected.wineText} ({selected.wineId})
        </Typography>

        <Stack spacing={1} direction="row" justifyContent="center">
          {checked.length > 0 &&
            checked.map((bb) => <Item key={bb.bid}>..{bb.bid.substr(bb.bid.length - 5)}</Item>)}
          {checked.length === 0 && <Item>..{selected._id.substr(selected._id.length - 5)}</Item>}
        </Stack>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1.5} direction="column">
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <Stack spacing={2} direction="row">
              <RHFTextField name="vintage" type="number" label="Vintage" size="small" />
              <RHFTextField name="cost" type="number" label="Cost" size="small" />
            </Stack>

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
              <Tooltip title="Edit" placement="right" followCursor arrow>
                <IconButton color="primary" type="submit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
    </Paper>
  );
};

export default EditBottles;

EditBottles.propTypes = {
  checked: PropTypes.array,
  setChecked: PropTypes.func,
};
