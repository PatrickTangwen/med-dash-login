import Papa from 'papaparse';
const useFetchAndDisplayCSV = async (filename) => {
  try {
    const response = await fetch(`src/vital_csvs/${filename}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          // console.log('Parsed results:', results.data);
          resolve({
            labels: results.data.map(item => item.timestamp).filter(item => item !== undefined),
            data: results.data.map(item => item.value).filter(item => item !== undefined)
            
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
export default useFetchAndDisplayCSV;