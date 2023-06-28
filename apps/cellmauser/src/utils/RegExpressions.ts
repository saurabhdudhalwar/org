/* Password must be minimum 8-characters long, 
   must contain one upper case letter, 
   one lower case letter, 
   one digit and one special character(Symbol) */
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default PASSWORD_REGEX;
