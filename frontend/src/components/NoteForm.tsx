/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  onSubmit: (values: { summary: string; userId: number; issueId: number }) => void;
  issueId: number;
  edit: boolean;
  menu: boolean;
  currentValues: { summary: string; id?: number };
};

export default function NoteForm({ issueId, onSubmit, edit, currentValues, menu }: Props) {
  const [openForm, setOpenForm] = React.useState(false);
  const issue = issueId;
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  type FormValues = {
    summary: string;
    userId: number;
    issueId: number;
    id?: number;
  };
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues:
      edit === true
        ? { summary: currentValues.summary, issueId, id: currentValues.id }
        : { summary: '', issueId: issue },
  });

  return (
    <>
      {edit === true ? (
        <IconButton
          color="primary"
          aria-label="delete"
          onClick={() => {
            handleOpenForm();
          }}
        >
          <EditIcon />
        </IconButton>
      ) : menu ? (
        <MenuItem
          onClick={() => {
            handleOpenForm();
          }}
        >
          Add Note
        </MenuItem>
      ) : (
        <Button
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          New note
        </Button>
      )}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle
          sx={{
            pb: 0,
          }}
        >
          Create new note
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Summary"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit" onClick={handleCloseForm}>
              {edit === true ? 'Edit' : 'Create '}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
