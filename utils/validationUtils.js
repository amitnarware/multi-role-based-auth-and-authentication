const validateUsername = (username) => {
    return /^[a-zA-Z0-9_.-]*$/.test(username);
  };
  
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  module.exports = { validateUsername, validatePassword };
  