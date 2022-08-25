/* eslint-disable no-param-reassign */
import { CircularProgress, Typography, Box } from '@mui/material';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { createNote, selectIssueById } from '../reducers/issuesReducer';
import NoteForm from '../components/NoteForm';
import { Note, NotePayload } from '../types';
import { selectAuthState } from '../reducers/authReducer';
import NoteCard from '../components/NoteCard';

export default function IssuePage() {
  const dispatch = useAppDispatch();
  const { issueId }: any = useParams();
  const { user } = useAppSelector(selectAuthState);

  const selectedIssue = useAppSelector((state) => selectIssueById(state, +issueId));

  const handleNote = (values: NotePayload) => {
    values.userId = user?.userId || 0;
    dispatch(createNote(values));
  };

  return !selectedIssue ? (
    <CircularProgress />
  ) : (
    <Box>
      <Typography>{selectedIssue.summary}</Typography>
      <Typography>{selectedIssue.priority}</Typography>
      <Typography>{selectedIssue.status}</Typography>
      {selectedIssue.notes.map((note: Note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          summary={note.summary}
          userId={note.userId}
          createdAt={note.createdAt}
          issueId={note.issueId}
        />
      ))}
      <NoteForm
        issueId={issueId}
        onSubmit={handleNote}
        edit={false}
        currentValues={{ summary: '' }}
        menu={false}
      />
    </Box>
  );
}
