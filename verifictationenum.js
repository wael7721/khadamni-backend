type = ["jobSeeker", "jobber", "admin"];

const verifyauth = (temp) => {
  if (type.find((type) => type == temp)) {
    return true;
  }
  return false;
};

const authorised = (input) => {
  switch (input) {
    case "admin":
      return 0;
    case "jobSeeker":
      return 1;
    case "jobber":
      return 2;

      return -1;
  }
};
module.exports={authorised,verifyauth}
