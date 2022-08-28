/* eslint-disable no-param-reassign */
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { CardHeader } from '@mui/material';
import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { editProject, deleteProject } from '../reducers/projectsReducer';
import { Project, ProjectPayload } from '../types';
import ProjectForm from './ProjectForm';

function MenuButton(projectId: number, currentValues: any) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openForm, setOpenForm] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleSelect = async () => {
    localStorage.setItem('project', `${projectId}`);
    navigate(`../Projects/${projectId}`, { replace: true });
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleProject = (values: ProjectPayload) => {
    values.projectId = projectId;
    console.log('edit values', values);
    dispatch(editProject(values));
  };

  const handleDelete = async () => {
    dispatch(deleteProject(projectId));
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
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
        <MenuItem
          onClick={() => {
            handleOpenForm();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleSelect();
          }}
        >
          Select
        </MenuItem>
      </Menu>
      <ProjectForm
        onSubmit={handleProject}
        currentValues={currentValues}
        edit
        open={openForm}
        onClose={handleCloseForm}
      />
    </div>
  );
}
export default function ProjectCard(props: Project) {
  const { id, title, description, updatedAt, users } = props;
  const result = formatDistance(new Date(updatedAt), new Date());
  const currentValues = {
    title,
    description,
    users: users?.map((u) => u.id),
  };
  return (
    <Card sx={{ width: 300, height: '100%' }}>
      <CardHeader title={title} action={MenuButton(id, currentValues)} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2">Last Update: {result} ago</Typography>
      </CardContent>
      <CardContent>
        <AvatarGroup max={4}>
          {users?.map((i: any) => (
            <Avatar key={i.id}>{i.username.charAt(0).toUpperCase()}</Avatar>
          ))}
        </AvatarGroup>
      </CardContent>
    </Card>
  );
}
