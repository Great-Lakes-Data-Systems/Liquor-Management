import webData from './webprbk';

const renameKey = (json, oldKey, newKey) => {
  return JSON.parse(JSON.stringify(json).split(oldKey).join(newKey));
};

let json = webData;
json = renameKey(json, 'upc1', 'UPC');
json = renameKey(json, 'shelfPrice', 'MSRP');
json = renameKey(json, 'offPremisePrice', 'cost');

export default json;

// Finding all sizes in PriceBook

// const size = json.map((item) => {
//   return item.size;
// });

// const uniq = [...new Set(size)];

// console.log(uniq);

['1000 ML', '750 ML', '1750 ML', '50 ML', '200 ML', '375 ML', '100 ML', '700 ML'];