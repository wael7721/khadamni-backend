const time=()=>{
  var currentdate = new Date();
  var datetime =
    currentdate.getDay() +
    "/" +
    currentdate.getMonth() +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
}
module.export={time: time}