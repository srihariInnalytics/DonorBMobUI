export const colors = {
    primary: '#1b87aa',
    success: '#28a745',
    error: '#dc3545',
    textLight: '#ffffff',
    textDark: '#333333',
    background: 'white',
    header: '#1b87aa',
    data: '#58afcb',
    divider: '#9d9c1e',
    filter:'#b3ebfe',
    icon: '#105166',
    card:'#ffffff',
    button: '#1b87aa',
    grad:['#f4fff8','#fff', ],

  };

export const toastConfig = {
    success: {
      type: 'success',
      position: 'top',
      text1Style: {
        color: '#366b36',
      },
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      textStyle: {
        numberOfLines: 2,
      },
      style: {
        backgroundColor: colors.button,
      },
    },
    error: {
      type: 'error',
      position: 'top',
      text1Style: {
        color: 'red',
      },
      visibilityTime: 3000,
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
