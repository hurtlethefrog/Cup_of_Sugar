
export default function convertTime(unix){
 
  // Months array
  var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 
  var date = new Date(unix + 14400000);

  // Year
  var year = date.getFullYear();
 
  // Month
  var month = months_arr[date.getMonth()];
 
  // Day
  var day = date.getDate();
 
  // Hours
  var hours = date.getHours();
 
  // Minutes
  var minutes = "00" + date.getMinutes();
 
  // Seconds
  var seconds = "00" + date.getSeconds();
 
  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = year+'-'+month+'-'+day+'T'+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ".369Z";
  
  return convdataTime;
  
 }