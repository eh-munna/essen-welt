export default function convertToDayDate(utcString) {
  const dateObj = new Date(utcString);

  const date = dateObj.toISOString().split('T')[0];

  const time = new Date(utcString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { date, time };
}
