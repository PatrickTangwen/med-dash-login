import React, { useState, useEffect } from 'react';
import { memo } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { formatDate} from '/src/utils/core.js';
import useFetchAndDisplayCSV from './useFetchAndDisplayCSV';
import fetchDataEndPoint from './FetchDataEndPoint';

const csvs = ['analysis_cal.csv','analysis_dist.csv','analysis_heart.csv','analysis_steps.csv']
const api_endpoints = ['calories','distance','heartrate','steps']
const Chart = memo(({ dateRange }) => {
  let [yOptions, setYOptions] = useState([
    {
      name: 'data1',
      data: getRandomData(),
      color: '#5ec9db'
    },
    {
      name: 'data2',
      data: getRandomData(),
      color: '#f5b97a'
    },
    {
      name: 'data3',
      data: getRandomData(),
      color: '#f57a7a'
    },
    {
      name: 'data4',
      data: getRandomData(),
      color: '#d5d97a'
    }
  ].map(({ name, color, type = 'line', data }) => ({
    name,
    data,
    color,
    seriesOption: getSeriesOption({ name, from: color, data, type })
  })));

  useEffect(() => {
      async function fetchData() {
        try {
          // const cal_data = await useFetchAndDisplayCSV(csvs[0]);
          // const dist_data = await useFetchAndDisplayCSV(csvs[1]);
          // const heart_data = await useFetchAndDisplayCSV(csvs[2]);
          // const steps_data = await useFetchAndDisplayCSV(csvs[3]);

          const cal_data = await fetchDataEndPoint(api_endpoints[0]);
          const dist_data = await fetchDataEndPoint(api_endpoints[1]);
          const heart_data = await fetchDataEndPoint(api_endpoints[2]);
          const steps_data = await fetchDataEndPoint(api_endpoints[3]);    
          setYOptions([
            {
              name: 'Calories Burned',
              data: cal_data.data,
              color: '#5ec9db'
            },
            {
              name: 'Distance Traveled',
              data: dist_data.data,
              color: '#f5b97a'
            },
            {
              name: 'Heart Rate',
              data: heart_data.data,
              color: '#f57a7a'
              
            },
            {
              name: 'Steps Taken',
              data: steps_data.data, // Assuming useFetchAndDisplayCSV resolves to the structure { labels: [...], data: [...] }
              color: '#d5d97a'
            }
          ].map(({ name, color, type = 'line', data }) => ({
            name,
            data,
            color,
            seriesOption: getSeriesOption({ name, from: color, data, type }),
            visible: true

          })));
        } catch (error) {
          console.error('Error fetching and parsing the CSV:', error);
        }
      }

      fetchData();
    }, []);

  const option = {
    color: yOptions.map(({ color }) => color),
    title: {
      text: 'Health data vis'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        axis: 'auto',
        snap: 'true'
      }
    },
    legend: {
      x: 'center',
      y: 'bottom',
      // selectedMode: false,
    },
    grid: {
      left: '0%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dateRange.map((v) => formatDate(v, 'MM-DD')),
      splitLine: {
        show: false,
        lineStyle: {
          type: 'solid'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        interval: 2
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} units',
        align: 'center'
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      },
      emphasis:{
        focus: 'series'
      },
      legend:{
        selectorLabel: {
          show: true
        },

      },
      //set the max height greater than y-value
      min: 0,
      max: 'dataMax' //dynamically set y-axis height
    },
    series: [...yOptions.map(({ seriesOption }) => seriesOption)]
  }

  
  // generate the random data for testing purposes
  function getRandomData(len = dateRange.length || 11) {
    const data = []
    for (let i = 0; i < len; i++) {
      data.push(Math.round(Math.random() * 200))
    }
    return data
  }

  // get the info of Y-axis
  function getSeriesOption(options) {
    return {
      name: options.name,
      type: options.type,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: options.from },
          { offset: 1, color: options.to || '#fff' }
        ]),
        lineStyle: {
          width: 1
        }
      },
      label: {
        show: false,
        position: 'top'
      },
      data: options.data,
    }
  }

  return <ReactECharts option={option} style={{ height: 500}} />
})

export default Chart
