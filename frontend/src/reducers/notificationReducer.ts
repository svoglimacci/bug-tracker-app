import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    resetNotification() {
      return null;
    },
  },
});

let timeoutID: NodeJS.Timeout;
export const { showNotification, resetNotification } = notificationSlice.actions;

export const setNotification =
  (notification: string, time: number) =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(showNotification(notification));
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
  };

export default notificationSlice.reducer;
