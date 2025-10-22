export const colors = {
    primary: 'red',
    success: '#28a745',
    error: '#dc3545',
    textLight: '#ffffff',
    textDark: '#333333',
    background: 'white',
    header: 'white',
    filter:'#f5fff3',
    card:'#ffffff',
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
