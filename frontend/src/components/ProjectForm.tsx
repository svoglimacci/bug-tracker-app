/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { User } from '../types';
import { useAppSelector } from '../hooks';
import { selectUsers } from '../reducers/usersReducer';

type Props = {
  onSubmit: (values: { title: string; description: string; users: Array<number> }) => void;
  edit: boolean;
  currentValues: { title: string; description: string; users: number[] };
  onClose: any;
  open: any;
};

export default function ProjectForm({ onSubmit, edit, currentValues, onClose, open }: Props) {
  const handleClose = () => {
    onClose();
  };
  const { users } = useAppSelector(selectUsers);

  type FormValues = {
    title: string;
    description: string;
    users: Array<number>;
  };
  const { handleSubmit, setValue, control, reset } = useForm<FormValues>({
    defaultValues:
      edit === true
        ? {
            title: currentValues.title,
            description: currentValues.description,
            users: currentValues.users,
          }
        : { title: '', description: '', users: [] },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            pb: 0,
          }}
        >
          {edit ? 'Edit Project' : 'New Project'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Autocomplete
              multiple
              options={users}
              getOptionLabel={(user: User) => user.username}
              filterSelectedOptions
              defaultValue={users.filter((u) => currentValues.users?.includes(u.id))}
              onChange={(e, users) =>
                setValue(
                  'users',
                  users.map((u) => u.id),
                )
              }
              renderInput={(params) => (
                <TextField autoFocus margin="dense" label="Members" type="text" {...params} />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleClose();
              }}
            >
              {edit ? 'Save' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
