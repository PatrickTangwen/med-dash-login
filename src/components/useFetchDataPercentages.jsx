import { useEffect, useState } from "react";
import useFetchAndDisplayCSV from "./useFetchAndDisplayCSV";
import fetchDataEndPoint from './FetchDataEndPoint';
import * as config_data from '../../config.json'
import { day } from '@/utils/day'

function useFetchDataPercentages(csv){
    
    let [firstDate,setFirstDate] = useState("");
    let [lastDate,setLastDate] = useState("");
    let [dates, setDates] = useState([]);
    let [percentage, setPercentage] = useState("");
    
    useEffect(() => {
        async function fetchData(){
            
            try{
                console.log("Fetching Data", csv)
                const data = await fetchDataEndPoint(csv);
                setDates(data.labels);
                
                // This gets the first and last date so we can compare to the numbers in our config.
                if (csv === "analysis_heart.csv") { //change to "heartrate" for deployment
                    setFirstDate(dates.slice(0)[0])
                    setLastDate(dates.slice(-2)[0])
                }else{
                setFirstDate(dates.slice(0)[0])
                setLastDate((dates.slice(-1)[0]).split(" ")[0])
                }
                console.log("The data you want to see")

                console.log("Imported First Date: ", firstDate)
                console.log("Imported Last Date: ", lastDate)

                // console.log("Imported dates")
                // console.log(day(lastDate).subtract(day(firstDate)))

               
                // console.log(lastDate)
                // console.log("Config dates")
                // console.log("Imported First Date: ", config_data.start_date)
                // console.log("Imported Last Date: ", config_data.end_date)
                // console.log(day(config_data.end_date).subtract(day(config_data.start_date)))
                


                // This will return true if the subtraction between the imported dates (end - start) is the same as the one between the configured dates
                
                let isSameDates = day(lastDate).subtract(day(firstDate)).isSame(day(config_data.end_date).subtract(day(config_data.start_date))) 
                console.log("Are they the same", isSameDates)
                if (isSameDates){
                    setPercentage(100);
                }else{
                    // will set the percentage 
                    const importedStart = day(firstDate).unix()
                    const importedEnd = day(lastDate).unix()

                    const configStart = day(config_data.start_date).unix()
                    const configEnd = day(config_data.end_date).unix()

                    console.log("Config Timestamp Sub: ",csv , configEnd - configStart)
                    console.log("Imported Timestamp Sub: ", csv , importedEnd - importedStart)

                    setPercentage(Math.round(((importedEnd - importedStart) / (configEnd - configStart)) * 100),2);
                }
                
            }
            catch (error) {
                console.log('Failed to import the data', error)
            }

        }
        fetchData()

    }, [firstDate])
    
    return (
        percentage
    );
}
 
export default useFetchDataPercentages;