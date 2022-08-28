/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { Box, Button, Typography } from '@mui/material';

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
import { createIssue, selectIssues } from '../reducers/issuesReducer';
import { selectProjectById } from '../reducers/projectsReducer';
import { selectAuthState } from '../reducers/authReducer';
import { IssuePayload, Priority, Status } from '../types';
import IssueMenu from '../components/IssueMenu';

// TODO: separate MenuItems & Form to a different function. Each need a unique setOpen state.
export default function ProjectPage() {
  const { projectId }: any = useParams();

  const dispatch = useAppDispatch();

  const { user }: any = useAppSelector(selectAuthState);

  const [openIssue, setOpenIssue] = React.useState(false);

  const handleCloseIssue = () => {
    setOpenIssue(false);
  };

  const handleIssue = (values: IssuePayload) => {
    values.projectId = projectId;
    values.userId = user?.userId || user.userId;
    dispatch(createIssue(values));
  };

  const handleOpenIssue = () => {
    setOpenIssue(true);
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
      <Button variant="outlined" onClick={handleOpenIssue}>
        New Issue
      </Button>
      <IssueForm
        open={openIssue}
        onClose={handleCloseIssue}
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
                    color="inherit"
                    underline="none"
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
                  <IssueMenu issue={issue} user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
