import { Avatar, Typography, Box, Card, Stack, IconButton, ButtonGroup } from '@mui/material';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { formatDistance } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUserById } from '../reducers/usersReducer';
import { Note, NotePayload } from '../types';
import { editNote, deleteNote } from '../reducers/issuesReducer';
import NoteForm from './NoteForm';

export default function NoteCard(note: Note) {
  const dispatch = useAppDispatch();
  const { id, summary, userId, createdAt, issueId } = note;
  const selectedUser = useAppSelector((state) => selectUserById(state, userId));
  const result = formatDistance(new Date(createdAt), new Date());
  const handleDelete = async () => {
    dispatch(deleteNote(issueId, id));
  };
  const handleEdit = async (values: NotePayload) => {
    dispatch(editNote(values));
  };
  return (
    <Card key={id} sx={{ m: 1 }}>
      <Box sx={{ m: 2 }}>
        <Stack alignItems="start" spacing={2}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>{selectedUser?.username.charAt(0)}</Avatar>
            <Typography fontWeight="bold">{selectedUser?.username}</Typography>
            <Typography>{result} ago</Typography>
          </Stack>
          <Stack>
            <Typography>{summary}</Typography>
          </Stack>
          <ButtonGroup>
            <IconButton
              color="primary"
              aria-label="delete"
              onClick={() => {
                handleDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>

            <NoteForm
              issueId={issueId}
              onSubmit={handleEdit}
              currentValues={note}
              edit
              menu={false}
            />
          </ButtonGroup>
        </Stack>
      </Box>
    </Card>
  );
}
