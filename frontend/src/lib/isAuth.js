const isAuth = () => {
  return localStorage.getItem("EazilyHired-user");
};
//give all export access to


export const userType = () => {

  var user = []
  user = JSON.parse(localStorage.getItem("EazilyHired-user"))  
  const type = user?.type;
  return type;
};

//user login token
export const Token = () => {

  var user = []
  user = JSON.parse(localStorage.getItem("EazilyHired-user"))  
  const token = user?.token;
  return token;
};

//general app user
export const EazyUser = () => {
  var user = []
  user = JSON.parse(localStorage.getItem("EazilyHired-user"))
  return user;
};

//recruiter logo/display photo
export const displayPic = () => {

  var user = []
  user = JSON.parse(localStorage.getItem("EazilyHired-user"))  
  const profile = user?.profileImage;
  return profile;
};

export const resumeFile = () => {

  var userResume = []
  userResume = JSON.parse(localStorage.getItem("EazilyHired-userResume"))  
  
  return userResume;
};


export default isAuth;
