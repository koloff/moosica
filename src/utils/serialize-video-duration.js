export default function serializeVideoDuration(str) {

  let indexHours = str.indexOf('H');
  let indexMinutes= str.indexOf('M');
  let indexSeconds = str.indexOf('S');

  function extractNumber(index) {
    if (index < 0) {
      return 0;
    }

    let i = index - 1;

    let result = '';
    while (i > -1 && !isNaN(str[i])) {
      result += str[i];
      i--;
    }

    return result.split('').reverse().join('') | 0;
  }

  return {
    hours: extractNumber(indexHours),
    minutes: extractNumber(indexMinutes),
    seconds: extractNumber(indexSeconds)
  }
}