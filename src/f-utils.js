import {ref} from "vue";
import { date } from 'quasar'

const { extractDate, formatDate } = date

function formatName (isSurnameFirst, { givenName, familyName, middleName, suffix }) {
  const middleInitial = middleName ? ` ${middleName.charAt(0)}.` : '';
  const nameSuffix = suffix?.trim() ? ` ${suffix}` : '';
  return isSurnameFirst
    ? `${familyName}, ${givenName}${middleInitial}${nameSuffix}`
    : `${givenName}${middleInitial} ${familyName}${nameSuffix}`;
}
function toTitleCase (str) {
  return str?.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
function splitStringWithParentheses (text) {
  const indexOpenP = text.indexOf('(');
  if (indexOpenP === -1) return [text, null];

  const indexCloseP = text.indexOf(')', indexOpenP);
  if (indexCloseP === -1 || indexCloseP <= indexOpenP) return [text, null];

  return [
    text.slice(0, indexOpenP),
    text.slice(indexOpenP, indexCloseP + 1),
  ];
}
const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

function getMaxDateOfMonth(year, month) {
  if (month < 0 || month > 11) return { error: 'Invalid month' }
  const date = new Date(year, (month + 1), 0)
  return date.getDate() // Return the day of the last day of the month (which will be the maximum date)
}

function padLeadingZero (n) {
  const original = typeof n === 'string' ? n : n.toString()
  return `${original.length === 1? '0':''}${original}`
}

function splitArray (arr, firstHalfLength) {
  // Check for invalid input
  if (firstHalfLength < 0 || firstHalfLength >= arr.length) {
    return [arr, []]
  }
  const firstHalf = [...arr].slice(0, firstHalfLength);
  const secondHalf = [...arr].slice(firstHalfLength);
  return [firstHalf, secondHalf];
}

function logError (e) {
  console.error(e.message || 'Something went wrong')
}

function initStore (apiCall) {
  const loading = ref(false);
  ( async function () {
    loading.value = true
    await apiCall()
    loading.value = false
  } )();
  return { loading };
}

export {
  formatName,
  toTitleCase,
  splitStringWithParentheses,
  monthNames,
  getMaxDateOfMonth,
  padLeadingZero,
  splitArray,
  logError,
  initStore,
};

export function createDate (date) {
  const isDate = date instanceof Date;
  let format; let isValid;
  const dateFormats = {
    'MM/DD/YYYY': /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/, // mm/dd/yyyy
    'YYYY-MM-DD': /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,   // yyyy-mm-dd
  };
  Object.entries(dateFormats).forEach(([key, value]) => {
    if (value.test(date)) {
      format = key;
      isValid = isValid || true;
    }
  });
  isValid = isValid || isDate;
  const _date = isDate? date: extractDate(date, format);

  return {
    date: !isValid? date: _date,
    get values () {
      return !isValid? { date, error: 'Invalid date' } : {
        month: _date.getMonth(),
        date: _date.getDate(),
        year: _date.getFullYear(),
      };
    },
    get str() {
      return !isValid? date: formatDate(date, 'MM/DD/YYYY');
    },
    get shortStr() {
      return !isValid? date: formatDate(date, 'MMM D, YYYY');
    },
    get longStr() {
      return !isValid? date: formatDate(date, 'MMMM D, YYYY');
    },
  }
}
