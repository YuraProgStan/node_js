const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const startOfDay = dayjs().utc().startOf('day').add(2, 'days').format('dddd:HH - YYYY/MMM-DD');

console.log(startOfDay.toString());
