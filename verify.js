

const typeofuser = (input) => {
  switch (input) {
    case "admin":
      return 0;
    case "jobseeker":
      return 1;
    case "jobber":
      return 2;
    default :
      return "user doesnt have a role"
  }
};

const auth=()=>{}


module.exports={auth,typeofuser}


