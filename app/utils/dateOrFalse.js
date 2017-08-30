import parse from 'date-fns/parse';

const dateOrFalse = (date) => date && date != null ? parse(date) : false;
export default dateOrFalse;
