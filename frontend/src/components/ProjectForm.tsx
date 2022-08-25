/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { User } from '../types';
import { useAppSelector } from '../hooks';
import { selectUsers } from '../reducers/usersReducer';

type Props = {
  onSubmit: (values: { title: string; description: string; users: Array<number> }) => void;
  edit: boolean;
  buttonType: 'menu' | 'button';
  currentValues: { title: string; description: string; users: number[] };
};

export default function ProjectForm({ onSubmit, edit, currentValues }: Props) {
  const [openForm, setOpenForm] = React.useState(false);
  const { users } = useAppSelector(selectUsers);
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  type FormValues = {
    title: string;
    description: string;
    users: Array<number>;
  };
  const { handleSubmit, setValue, control } = useForm<FormValues>({
    defaultValues:
      edit === true
        ? {
            title: currentValues.title,
            description: currentValues.description,
            users: currentValues.users,
          }
        : { title: '', description: '', users: [] },
  });

  function btnType() {
    return edit === true ? (
      <MenuItem
        onClick={() => {
          handleOpenForm();
        }}
      >
        Edit
      </MenuItem>
    ) : (
      <Button
        startIcon={<AddIcon />}
        onClick={handleOpenForm}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        New Project
      </Button>
    );
  }

  return (
    <div>
      {btnType()}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle
          sx={{
            pb: 0,
          }}
        >
          Create New Project
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
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit" onClick={handleCloseForm}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
