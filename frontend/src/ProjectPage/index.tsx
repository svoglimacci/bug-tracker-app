/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import { useParams, Link as RouterLink } from 'react-router-dom';
import IssueForm from '../components/IssueForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  createIssue,
  selectIssues,
  createNote,
  deleteIssue,
  editIssue,
} from '../reducers/issuesReducer';
import { selectProjectById } from '../reducers/projectsReducer';
import { selectAuthState } from '../reducers/authReducer';
import { IssuePayload, NotePayload, Priority, Status } from '../types';
import NoteForm from '../components/NoteForm';

export default function ProjectPage() {
  const { projectId }: any = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const { user }: any = useAppSelector(selectAuthState);

  const handleIssue = (values: IssuePayload) => {
    values.projectId = projectId;
    values.userId = user?.userId || user.userId;
    dispatch(createIssue(values));
  };

  const handleEdit = async (values: IssuePayload) => {
    dispatch(editIssue(values));
  };

  const handleDelete = async (issueId: number) => {
    dispatch(deleteIssue(issueId));
  };

  const handleNote = (values: NotePayload) => {
    values.userId = user?.userId;
    dispatch(createNote(values));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { issues } = useAppSelector(selectIssues);

  const selectedProject = useAppSelector((state) => selectProjectById(state, +projectId));

  const issuesToRender = issues.filter((issue) => issue.projectId === +projectId);

  return !selectedProject ? (
    <CircularProgress />
  ) : (
    <Box>
      <Typography variant="h3">{selectedProject.title}</Typography>

      <Divider />

      <Typography variant="h4">Issues</Typography>
      <IssueForm
        onSubmit={handleIssue}
        edit={false}
        currentValues={{ summary: '', priority: Priority.Low, status: Status.Open }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuesToRender.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={`/projects/${issue.projectId}/issues/${issue.id}`}
                    color="secondary"
                  >
                    {issue.summary}
                  </Link>
                </TableCell>
                <TableCell>
                  <Chip label={issue.priority} />
                </TableCell>
                <TableCell>
                  <Chip label={issue.status} />
                </TableCell>
                <TableCell>
                  <Chip label={issue.notes?.length || 0} />
                </TableCell>
                <TableCell>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <NoteForm
                      issueId={issue.id}
                      onSubmit={handleNote}
                      edit={false}
                      currentValues={{ summary: '' }}
                      menu
                    />
                    <MenuItem
                      onClick={() => {
                        handleDelete(issue.id);
                      }}
                    >
                      Delete
                    </MenuItem>
                    <IssueForm onSubmit={handleEdit} currentValues={issue} edit />
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
