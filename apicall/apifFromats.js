//get fromat
export const getAPIFormat = (params) => {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
  };