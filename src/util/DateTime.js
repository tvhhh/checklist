const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getToDay = () => {
  let today = new Date();
  let day = DAYS[today.getDay()];
  let date = today.getDate();
  let month = MONTHS[today.getMonth()];
  let year = today.getFullYear();
  let hour = String(today.getHours()).padStart(2, '0');
  let minute = String(today.getMinutes()).padStart(2, '0');
  return {
    date: `${day}, ${month} ${date}, ${year}`,
    time: `${hour}:${minute}`,
  }
};

export const extractDate = date => {
  let ddd = DAYS[date.getDay()];
  let dd = date.getDate();
  let mmm = MONTHS[date.getMonth()];
  let yyyy = date.getFullYear();
  return `${ddd}, ${mmm} ${dd}, ${yyyy}`;
}

export const extractTime = time => {
  let hh = String(time.getHours()).padStart(2, '0');
  let mm = String(time.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}
