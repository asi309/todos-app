const getFullDate = () => {
  const todayDate = new Date();

  let date = todayDate.getDate();
  let month = todayDate.getMonth() + 1;
  let year = todayDate.getFullYear();

  if (date < 10) {
    date = '0' + date;
  }

  if (month < 10) {
    month = '0' + month;
  }

  return `${year}-${month}-${date}`;
};

const monthMap = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const dayMap = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

const dateString = (fullDate) => {
  const newDate = new Date(fullDate);

  const day = dayMap[newDate.getDay()];
  const month = monthMap[newDate.getMonth()];
  const date = newDate.getDate();

  return `${day}, ${month} ${date}`;
};

const dateUtils = {
  getFullDate,
  dateString,
};

export default dateUtils;
