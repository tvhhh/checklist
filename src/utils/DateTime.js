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

export const extractDate = time => {
  let dd = time.getDate();
  let mm = time.getMonth();
  let yyyy = time.getFullYear();
  return yyyy+'-'+mm+'-'+dd;
}

export const isToday = time => {
  let today = getToday();
  return time.getFullYear() === today.getFullYear() && time.getMonth() === today.getMonth() && time.getDate() === today.getDate();
};

export const getWeekDates = () => {
  let now = new Date();
  let dayOfWeek = now.getDay();
  let numDay = now.getDate();

  let start = new Date(now);
  start.setDate(numDay - dayOfWeek);
  start.setHours(0, 0, 0, 0);
  
  let end = new Date(now);
  end.setDate(numDay + (7 - dayOfWeek));
  end.setHours(0, 0 ,0 ,0);

  return [start, end];
}

export const getNameOfDay = time => {
  let day = time.getDay();
  switch(day) {
    case 0:
      return DAYS[0];
    case 1:
      return DAYS[1];
    case 2: 
      return DAYS[2];
    case 3: 
      return DAYS[3];  
    case 4: 
      return DAYS[4];
    case 5: 
      return DAYS[5];
    case 6: 
      return DAYS[6];
  }
}
