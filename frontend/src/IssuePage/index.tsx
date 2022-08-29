/* eslint-disable no-param-reassign */
import {
  CircularProgress,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NotesIcon from '@mui/icons-material/Notes';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { createNote, selectIssueById } from '../reducers/issuesReducer';
import NoteForm from '../components/NoteForm';
import { Note, NotePayload } from '../types';
import { selectAuthState } from '../reducers/authReducer';
import NoteCard from '../components/NoteCard';

export default function IssuePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { issueId }: any = useParams();
  const { user } = useAppSelector(selectAuthState);
  const [openForm, setOpenForm] = React.useState(false);
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleClick = () => {
    setOpenForm(true);
  };
  const selectedIssue = useAppSelector((state) => selectIssueById(state, +issueId));

  const handleNote = (values: NotePayload) => {
    values.userId = user?.userId || 0;
    dispatch(createNote(values));
  };

  return !selectedIssue ? (
    <CircularProgress />
  ) : (
    <Box>
      <Paper sx={{ padding: 2, mt: 3 }}>
        <Stack direction="column" justifyContent="center" alignItems="flex-start">
          <Button onClick={() => navigate(-1)} startIcon={<KeyboardBackspaceIcon />} size="large">
            Back to Project
          </Button>
          <Typography py={2}>{selectedIssue.summary}</Typography>
          <Divider style={{ width: '100%' }} />

          <Stack direction="row" spacing={1} my={1}>
            <Typography sx={{ lineHeight: '2.3' }} variant="subtitle2">
              Status:
            </Typography>
            <Chip label={selectedIssue.status} />
          </Stack>
          <Stack direction="row" spacing={1} my={1}>
            <Typography sx={{ lineHeight: '2.3' }} variant="subtitle2">
              Priority:
            </Typography>
            <Chip label={selectedIssue.priority} />
          </Stack>
        </Stack>
      </Paper>
      <Paper sx={{ padding: 2, mt: 3 }}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <NotesIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
          <Typography variant="h4">Notes</Typography>
        </Stack>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleClick} sx={{ my: 2 }}>
          New Note
        </Button>
        {selectedIssue.notes.length === 0 ? (
          <Typography variant="h3" align="center" p={4}>
            No notes yet.
          </Typography>
        ) : (
          <div>
            {selectedIssue.notes?.map((note: Note) => (
              <div key={note.id}>
                <NoteCard
                  id={note.id}
                  summary={note.summary}
                  userId={note.userId}
                  createdAt={note.createdAt}
                  issueId={note.issueId}
                />
                <Divider />
              </div>
            ))}
          </div>
        )}
        <NoteForm
          issueId={issueId}
          onSubmit={handleNote}
          edit={false}
          currentValues={{ summary: '' }}
          open={openForm}
          onClose={handleCloseForm}
        />
      </Paper>
    </Box>
  );
}
