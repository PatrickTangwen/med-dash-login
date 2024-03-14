import './Home.css'
import React from 'react';
import { Image, ConfigProvider } from 'antd';
import { Flex, Progress, Button } from 'antd';
import '/src/App.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling
import useFetchDataPercentages from '@/components/useFetchDataPercentages';




const WelcomeHeader = () => (
  <h1 className="welcome-header">Welcome, Ben!</h1>
);

const csvs = ['analysis_cal.csv','analysis_dist.csv','analysis_heart.csv','analysis_steps.csv']
const api_endpoints = ['calories','distance','heartrate','steps']
const x = 50;

const ProgressCheck = () => {
  return (
  // This will display 100 if the data from the requested date range is successfully imported, and if not it will display the percentage of data successfully imported
  <div className = 'progress'>
    {/* <Flex gap="large" style={{ gap: '50px' }}> */}
      <ConfigProvider theme={{
          components: {
            Progress: {
              circleTextFontSize: "0.75em"
            },
          },
        }}> 
        <Progress type="circle" percent={useFetchDataPercentages(api_endpoints[0])} format = {(percent) => `Calorie Data: ${percent}%`} />
        <Progress type="circle" percent={useFetchDataPercentages(api_endpoints[1])} format = {(percent) => `Dist. Data: ${percent}%`} />
        <Progress type="circle" percent={useFetchDataPercentages(api_endpoints[2])} format = {(percent) => `Heartrate Data: ${percent}%`} />
        <Progress type="circle" percent={useFetchDataPercentages(api_endpoints[3])} format = {(percent) => `Step Data: ${percent}%`}/>
      </ConfigProvider>
    {/* </Flex> */}
  </div>  
  )   
};

const MoodSurvey = () => {
  const [date, setDate] = useState(new Date());
  const [moods, setMoods] = useState({}); // Object to store moods with date keys

  const handleMoodSelect = (selectedDate, mood) => {
    setMoods({ ...moods, [selectedDate.toISOString().split('T')[0]]: mood });
  };

  const renderCalendarDay = ({ date, view }) => {
    if (view === 'month') {
      const moodEmoji = moods[date.toISOString().split('T')[0]];
      return (
        <div>
          {moodEmoji && <span>{moodEmoji}</span>}
        </div>
      );
    }
  };
  

  return (
    <div className = "shift">
      <div className='button-container'>
      <Link to="/healthAnalysis"><Button className='linkbtn'>Health Analysis</Button></Link>
      <Link to="/diary"><Button className='linkbtn'>Diary</Button></Link>
      <Link to="/healthTracker"><Button className='linkbtn'>Health Habit Tracker</Button></Link>
    </div>
    <div className='mood-container'>

    <h1 style={{fontSize: 16}}> How are you feeling today?</h1>
      <MoodSelector onMoodSelect={(mood) => handleMoodSelect(date, mood)} />
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date, view }) => renderCalendarDay({ date, view })}
      />
      </div>
    </div>
  );
};

const MoodSelector = ({ onMoodSelect }) => {
  const moods = ['😃', '😊', '😐', '😞', '😢'];
  return (
    <div>
      {moods.map((mood, index) => (
        <button key={index} className="mood-button" onClick={() => onMoodSelect(mood)}>
          {mood}
        </button>
      ))}
    </div>
  );
};



const Home = () => (
    <body>
      <WelcomeHeader/>
      <MoodSurvey/>
      <ProgressCheck />
    </body>
  );
  
  export default Home;