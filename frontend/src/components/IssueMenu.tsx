/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { createNote, deleteIssue, editIssue } from '../reducers/issuesReducer';
import { IssuePayload, NotePayload, Issue } from '../types';
import NoteForm from './NoteForm';
import IssueForm from './IssueForm';

export default function IssueMenu({ issue, user }: any) {
  const issueRendered: Issue = issue;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const [openNote, setOpenNote] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (issueId: number) => {
    dispatch(deleteIssue(issueId));
  };
  const handleEdit = async (values: IssuePayload) => {
    dispatch(editIssue(values));
  };
  const handleNote = (values: NotePayload) => {
    values.userId = user?.userId;
    dispatch(createNote(values));
  };
  const handleOpenNote = () => {
    setOpenNote(true);
  };
  const handleCloseNote = () => {
    setOpenNote(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  return (
    <>
      <IconButton id="basic-button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleDelete(issueRendered.id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenNote();
            handleClose();
          }}
        >
          New Note
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenEdit();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
      </Menu>
      <NoteForm
        issueId={issueRendered.id}
        onSubmit={handleNote}
        edit={false}
        currentValues={{ summary: '' }}
        open={openNote}
        onClose={handleCloseNote}
      />
      <IssueForm
        open={openEdit}
        onClose={handleCloseEdit}
        onSubmit={handleEdit}
        edit
        currentValues={{
          summary: issueRendered.summary,
          priority: issueRendered.priority,
          id: issueRendered.id,
          status: issueRendered.status,
        }}
      />
    </>
  );
}
