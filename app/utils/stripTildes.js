const stripTildes = (input = '') => input.replace(/〜~/gi, '');
export default stripTildes;
