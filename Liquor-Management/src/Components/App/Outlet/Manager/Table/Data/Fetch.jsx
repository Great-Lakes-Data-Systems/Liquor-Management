import { useState, useEffect } from 'react';

const renameKey = (json, oldKey, newKey) => {
  return JSON.parse(JSON.stringify(json).split(oldKey).join(newKey));
};

const randomPriceChangeFromLastPrcbk = (item, percentChange, direction) => {
  const change = (item * percentChange).toFixed(2);
  const num = direction ? (+item + +change) : (+item - +change);
  return num.toFixed(2);
};

function Fetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8080/pricebook');
        if (!response.ok) {
          throw new Error(`Failed to fetch pricebook. status: ${response.status}`);
        }
        let json = await response.json();          
        json = renameKey(json, 'upc1', 'UPC');
        json = renameKey(json, 'shelfPrice', 'MSRP'); // Price
        json = renameKey(json, 'offPremisePrice', 'cost'); // Cost
        
        // Finding all costs in PriceBook
        json = json.map((item) => {
          const percentChange = (Math.random() * 0.2 ).toFixed(2);
          const direction = Boolean(Math.round(Math.random()));  // var to decide if price was raised or lowered
          return {
            ...item, 
            CostChange: {
              dollar: randomPriceChangeFromLastPrcbk(item.cost, percentChange, direction),
              percent: percentChange,
              direction: direction
            },  
            MsrpChange: {
              dollar: randomPriceChangeFromLastPrcbk(item.MSRP, percentChange, direction),
              percent: percentChange,
              direction: direction
            },
            Margin: {
              dollar: (item.MSRP - item.cost).toFixed(2),
              percent: Math.round(((item.MSRP - item.cost) / item.MSRP) * 100),
            },
            custom: item.MSRP,
            priceChanged: false
          };
        });
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default Fetch;

// Finding all sizes in PriceBook

// const size = json.map((item) => {
//   return item.size;
// });

// const uniq = [...new Set(size)];

// console.log(uniq);

['1000 ML', '750 ML', '1750 ML', '50 ML', '200 ML', '375 ML', '100 ML', '700 ML'];