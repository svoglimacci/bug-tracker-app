import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, selectMessageState } from '../reducers/messageReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { message, type } = useSelector(selectMessageState);

  const clearMsg = () => {
    dispatch(clearMessage());
  };

  if (!message || !type) return null;

  return (
    <Snackbar open={!!message} onClose={clearMsg}>
      <Alert onClose={clearMsg} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
