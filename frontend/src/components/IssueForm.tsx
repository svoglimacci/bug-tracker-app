/* eslint-disable no-param-reassign */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Priority, Status } from '../types';

type Props = {
  onSubmit: (values: {
    summary: string;
    priority: Priority;
    status: Status;
    userId: number;
    projectId: number;
    id?: number;
  }) => void;
  edit: boolean;
  currentValues: { summary: string; priority: Priority; id?: number; status: Status };
  open: boolean;
  onClose: () => void;
};

export default function IssueForm({ onSubmit, edit, currentValues, open, onClose }: Props) {
  const handleClose = () => {
    onClose();
  };
  type StatusOption = { value: Status; label: string };
  const statusOptions: StatusOption[] = [
    { value: Status.Open, label: 'Open' },
    { value: Status.Closed, label: 'Closed' },
    { value: Status.InProgress, label: 'In Progress' },
    { value: Status.Resolved, label: 'Resolved' },
    { value: Status.Invalid, label: 'Invalid' },
    { value: Status.Feedback, label: 'Feedback' },
  ];

  type PriorityOption = { value: Priority; label: string };

  const priorityOptions: PriorityOption[] = [
    { value: Priority.Urgent, label: 'Urgent' },
    { value: Priority.High, label: 'High' },
    { value: Priority.Medium, label: 'Medium' },
    { value: Priority.Low, label: 'Low' },
  ];
  type FormValues = {
    summary: string;
    priority: Priority;
    status: Status;
    userId: number;
    projectId: number;
    id?: number;
  };
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues:
      edit === true
        ? {
            summary: currentValues.summary,
            priority: currentValues.priority,
            id: currentValues.id,
            status: currentValues.status,
          }
        : { summary: '', priority: Priority.Low, status: Status.Open },
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          pb: 0,
        }}
      >
        {edit === true ? 'Edit issue' : 'Create new issue'}
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
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select margin="dense" fullWidth variant="outlined" {...field}>
                {priorityOptions.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {edit === true ? (
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select margin="dense" fullWidth variant="outlined" {...field}>
                  {statusOptions.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClose}>
            {edit === true ? 'Edit' : 'Create '}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
