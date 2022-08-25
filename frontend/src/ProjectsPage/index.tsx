/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import Grid from '@mui/material/Grid';

import { Box } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { useAppSelector, useAppDispatch } from '../hooks';

import { createProject, selectProjects } from '../reducers/projectsReducer';
import { Project, ProjectPayload } from '../types';
import ProjectForm from '../components/ProjectForm';

function ProjectsPage() {
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector(selectProjects);
  const handleProject = (values: ProjectPayload) => {
    dispatch(createProject(values));
  };

  return (
    <Box>
      <ProjectForm
        onSubmit={handleProject}
        buttonType="button"
        edit={false}
        currentValues={{ title: '', description: '', users: [] }}
      />
      <Grid container m={2} spacing={2}>
        {projects.map((project: Project) => (
          <Grid key={project.id} item>
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
    </Box>
  );
}

export default ProjectsPage;
