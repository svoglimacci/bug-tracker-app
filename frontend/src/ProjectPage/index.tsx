/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import BugReport from '@mui/icons-material/BugReport';
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
import AddIcon from '@mui/icons-material/Add';
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
    <Box sx={{ height: '100%' }}>
      <Paper sx={{ padding: 2, mt: 3 }}>
        <Typography mt={3} mb={1} variant="h3">
          {selectedProject.title}
        </Typography>
        <Divider />
        <Stack direction="row" mt={3} sx={{ alignItems: 'center' }}>
          <BugReport fontSize="large" color="primary" sx={{ mr: 1 }} />
          <Typography variant="h4">Issues</Typography>
        </Stack>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenIssue}
          sx={{ my: 2 }}
        >
          New Issue
        </Button>
        <IssueForm
          open={openIssue}
          onClose={handleCloseIssue}
          onSubmit={handleIssue}
          edit={false}
          currentValues={{ summary: '', priority: Priority.Low, status: Status.Open }}
        />
      </Paper>
      <Paper sx={{ padding: 2, mt: 3 }}>
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
            {issuesToRender.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h3" p={4}>
                      No issues yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
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
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
