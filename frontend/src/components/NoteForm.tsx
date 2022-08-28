/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

type Props = {
  onSubmit: (values: { summary: string; userId: number; issueId: number }) => void;
  issueId: number;
  edit: boolean;
  currentValues: { summary: string; id?: number };
  onClose: any;
  open: any;
};

export default function NoteForm({ issueId, onSubmit, edit, currentValues, onClose, open }: Props) {
  const handleClose = () => {
    onClose();
  };
  const issue = issueId;

  type FormValues = {
    summary: string;
    userId: number;
    issueId: number;
    id?: number;
  };
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues:
      edit === true
        ? { summary: currentValues.summary, issueId, id: currentValues.id }
        : { summary: '', issueId: issue },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
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
            {edit === true ? 'Save' : 'Create '}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
