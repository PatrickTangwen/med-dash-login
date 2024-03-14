// import Papa from 'papaparse';
// const fetchDataEndPoint = async (endpoint) => {
//   try {
//     const url_str = "https://med-dash-backend-server.vercel.app/api/data/"
//     const lcoal_url_str = "http://localhost:3000/api/data/"
//     const response = await fetch(`${url_str}${endpoint}`); 
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const csvText = await response.text();
//     return new Promise((resolve, reject) => {
//       Papa.parse(csvText, {
//         header: true,
//         dynamicTyping: true,
//         complete: function(results) {
//           // console.log('Parsed results:', results.data);
//           resolve({
//             labels: results.data.map(item => item.timestamp).filter(item => item !== undefined),
//             data: results.data.map(item => item.value).filter(item => item !== undefined)
//           });
//         },
//         error: function(error) {
//           console.log('Parse error:', error);
//           reject(error);
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Error reading the CSV file:', error);
//   }
// };
// export default fetchDataEndPoint;

import Papa from 'papaparse';

const fetchDataEndPoint = async (endpoint) => {
  try {
    const url_str = "https://med-dash-backend-server.vercel.app/api/data/";
    const local_url_str = "http://localhost:3000/api/data/";
    const response = await fetch(`${url_str}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          let filteredData = results.data.filter(item => item.timestamp !== null && item.timestamp !== undefined && item.value !== null && item.value !== undefined);
          let labels = [];
          let data = [];
          // Transform timestamp column to date format and add to labels array
          filteredData.forEach(item => {
            const date = new Date(item.timestamp);
            const formattedDate = date.toISOString().split('T')[0];
            if (!labels.includes(formattedDate)) {
              labels.push(formattedDate);
            }
          });
          if (endpoint === "heartrate") {
            // Group all values by date and take the average, rounding to 2 decimals
            data = labels.map(date => {
              const values = filteredData.filter(item => {
                const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
                return itemDate === date;
              }).map(item => item.value);
              const average = parseFloat((values.reduce((acc, curr) => acc + curr, 0) / values.length).toFixed(2));
              return average;
            });
          } else if (endpoint === "distance" || endpoint === "steps") {
            // Scale the value column by 1000 and round to 2 decimals
            data = filteredData.map(item =>  parseFloat((item.value / 1000).toFixed(2)));
          }else{
            data = filteredData.map(item => parseFloat(item.value /10))
          }
          resolve({
            labels: labels,
            data: data
          });
        },
        error: function(error) {
          console.log('Parse error:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error reading the CSV file:', error);
  }
};

export default fetchDataEndPoint;
