import { parse } from 'date-fns';

const dateOrFalse = (date) => date && date != null ? parse(date) : false;
export default dateOrFalse;
