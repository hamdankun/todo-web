export const isAuthenticated = () => {
  return validCredentail();
}

const validCredentail = () => {
  if (localStorage.getItem('credentails')) {
    let credentails = JSON.parse(localStorage.getItem('credentails'));
    let diffHours = Math.round((new Date().getTime() - credentails.created_at) / 3600000);

    if (diffHours > 1) {
      localStorage.removeItem('credentails');
    }

    return diffHours <= 1 ? true : false;
  } else {
    return false;
  }
}
