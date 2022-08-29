/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, Typography } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { useAppSelector, useAppDispatch } from '../hooks';

import { createProject, selectProjects } from '../reducers/projectsReducer';
import { Project, ProjectPayload } from '../types';
import ProjectForm from '../components/ProjectForm';

function ProjectsPage() {
  const dispatch = useAppDispatch();
  const [openForm, setOpenForm] = React.useState(false);
  const { projects } = useAppSelector(selectProjects);
  const handleProject = (values: ProjectPayload) => {
    dispatch(createProject(values));
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleClick = () => {
    setOpenForm(true);
  };

  return (
    <Box>
      <Paper sx={{ padding: 2, mt: 3 }}>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleClick} sx={{ my: 2 }}>
          New Project
        </Button>
        <ProjectForm
          onSubmit={handleProject}
          edit={false}
          currentValues={{ title: '', description: '', users: [] }}
          open={openForm}
          onClose={handleCloseForm}
        />
        {projects.length === 0 ? (
          <Typography variant="h3" align="center" p={4}>
            No project yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project: Project) => (
              <Grid key={project.id} item lg={4} md={6} sm={12}>
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  updatedAt={project.updatedAt}
                  users={project.users}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default ProjectsPage;
