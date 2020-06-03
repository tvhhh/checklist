const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getToday = () => {
  return new Date();
};

export const extractDateTime = time => {
  let ddd = DAYS[time.getDay()];
  let dd = time.getDate();
  let mmm = MONTHS[time.getMonth()];
  let yyyy = time.getFullYear();
  let hh = String(time.getHours()).padStart(2, '0');
  let mm = String(time.getMinutes()).padStart(2, '0');
  return {
    date: `${ddd}, ${mmm} ${dd}, ${yyyy}`,
    time: `${hh}:${mm}`,
  };
};

export const isToday = time => {
  let today = getToday();
  return time.getFullYear() === today.getFullYear() && time.getMonth() === today.getMonth() && time.getDate() === today.getDate();
};
