export default function convertToDayDate(utcString) {
  const dateObj = new Date(utcString);

  const date = dateObj.toISOString().split('T')[0];

  const time = dateObj.toISOString().split('T')[1].substring(0, 5);
  return { date, time };
}
