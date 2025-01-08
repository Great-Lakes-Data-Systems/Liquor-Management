export const jsxFilter = (filterState) => {
  const text = [];
  // If no filter put No Filter header, else put Current Filter header
  text.push(isEmpty(filterState) ? <h2>No Filter</h2> : <h2>Current Filter</h2>);
  // Loop through each column in the filterState object
  for (const [columnKey] of Object.entries(filterState)) {
    // Add the name of the column to the "stringbuilder"
    text.push(<h3 key={columnKey}>{camelToTitleCase(columnKey)}</h3>);
    // Loop through the filter descriptions
    for (const [filterDescriptionKey, filterDescriptionValue] of Object.entries(filterState[columnKey])) {
      // If the column has a property named operator meaning there are 2 conditions
      if (Object.hasOwn(filterState[columnKey], 'operator')) {
        // Loop through the first condition
        for (const [filterDescriptionKey, filterDescriptionValue] of Object.entries(filterState[columnKey]['conditions'][0])) {
          if (filterDescriptionKey !== 'filterType')
            text.push(<span key={filterDescriptionValue}>{camelToTitleCase(filterDescriptionValue)} </span>);
        }
        // Add the operator to the "stringbuilder"
        text.push(<div key={filterState[columnKey]['operator']}>{filterState[columnKey]['operator']}</div>);
        // Loop through the second condition
        for (const [filterDescriptionKey, filterDescriptionValue] of Object.entries(filterState[columnKey]['conditions'][1])) {
          if (filterDescriptionKey !== 'filterType')
            text.push(<span key={filterDescriptionValue}>{camelToTitleCase(filterDescriptionValue)} </span>);
        }
        break;
      }
      else if (filterDescriptionKey !== 'filterType')
        text.push(<span key={filterDescriptionValue}>{camelToTitleCase(filterDescriptionValue)} </span>);
    }
  }
  return text;
};

// Function to check for empty object
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

function camelToTitleCase(str) {
  str = String(str);
  return str.replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase words
    .split(' ') // Split into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back together
}

export const logFilter = (filterState) => {
  console.log('filterState', filterState);
  const text = [];
  // Loop through each column in the filterState object
  for (const [columnKey] of Object.entries(filterState)) {
    // Add the name of the column to the "stringbuilder"
    text.push(`${camelToTitleCase(columnKey)}: \n`);
    // Loop through the filter descriptions
    for (const [filterDescriptionKey, filterDescriptionValue] of Object.entries(filterState[columnKey])) {
      // If the column has a property named operator meaning there are 2 conditions
      if (Object.hasOwn(filterState[columnKey], 'operator')) {
        // Loop through the first condition
        for (const [filterDescriptionKey, filterDescriptionValue] of Object.entries(filterState[columnKey]['conditions'][0])) {
          if (filterDescriptionKey !== 'filterType')
            text.push(`${camelToTitleCase(filterDescriptionValue)} `);
        }
        // Add the operator to the "stringbuilder"
        text.push(`\n${filterState[columnKey]['operator']} \n`);
        // Loop through the second condition
        for (const [filterDescriptionKey, filterDescriptionValue] of Object.entries(filterState[columnKey]['conditions'][1])) {
          if (filterDescriptionKey !== 'filterType')
            text.push(`${camelToTitleCase(filterDescriptionValue)} `);
        }
        break;
      }
      else if (filterDescriptionKey !== 'filterType')
        text.push(`${camelToTitleCase(filterDescriptionValue)} `);
    }
    text.push('\n');
  }
  console.log(text.join(''));
};


// export const jsxLog = ({filterState}) => {
//   return (
//     <div>
//       <h2>Current Filter</h2>
//       {/* Convert the object of filter state columns into an array and map the array */}
//       {Object.entries(filterState).map(([columnKey]) => {
//         return (
//           <div key={columnKey}>
//             <h3>{columnKey} column:</h3>
//             {/* Convert the object of individual column filter state into an array and map the array */}
//             {Object.entries(filterState[columnKey]).map(([filterDescriptionKey, filterDescriptionValue]) => {
//               // If the column has a property named operator meaning there are 2 conditions
//               if (Object.hasOwn(filterState[columnKey], 'operator')) {
//                 // Map the first condition
//                 Object.entries(filterState[columnKey]['conditions'][0]).map(([filter1DescriptionKey, filter1DescriptionValue]) => {
//                   if (filter1DescriptionKey !== 'filterType')
//                     return(<span key={filter1DescriptionKey}>{filter1DescriptionValue}</span>);
//                 });
//               } else if (filterDescriptionKey !== 'filterType') 
//                 return (<span key={filterDescriptionValue}> {filterDescriptionValue} </span>);
//             })}
//           </div>
//         );
//       })}
//     </div>
//   );
// };