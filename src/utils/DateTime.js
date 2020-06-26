const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getToday = () => {
  let now = new Date();
  now.setSeconds(0, 0);
  return now;
};

export const getWeekDates = () => {
  let now = new Date();
  now.setHours(0, 0, 0, 0);

  let end = new Date(now);
  end.setDate(now.getDate() + 7);

  return [now, end];
};

export const isToday = time => {
  let today = getToday();
  return time.getFullYear() === today.getFullYear() 
    && time.getMonth() === today.getMonth() 
    && time.getDate() === today.getDate();
};

export const getNameOfDay = time => {
  let day = time.getDay();
  return DAYS[day].toUpperCase();
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

export const extractDate = time => {
  let dd = ("0" + time.getDate()).slice(-2)
  let mm = ("0" + (time.getMonth() + 1)).slice(-2)
  let yyyy = time.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};




