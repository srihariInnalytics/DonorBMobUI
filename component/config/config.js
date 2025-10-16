export const colors = {
    primary: '#137175',
    success: '#28a745',
    error: '#dc3545',
    textLight: '#ffffff',
    textDark: '#333333',
    background: 'white',
    header: 'white',
    data: '#137175',
    divider: '#560374',
    filter:'#f5fff3',
    icon: '#137175',
    card:'#ffffff',
    button: '#538847'
  };

export const toastConfig = {
    success: {
      type: 'success',
      position: 'top',
      text1Style: {
        color: '#366b36',
      },
      visibilityTime: 1000,
      autoHide: true,
      topOffset: 30,
      textStyle: {
        numberOfLines: 2,
      },
      style: {
        backgroundColor: colors.success,
      },
    },
    error: {
      type: 'error',
      position: 'top',
      text1Style: {
        color: 'red',
      },
      visibilityTime: 1000,
      autoHide: true,
      topOffset: 30,
      textStyle: {
        numberOfLines: 2,
      },
      style: {
        backgroundColor: colors.error,
      },
    },
  };
