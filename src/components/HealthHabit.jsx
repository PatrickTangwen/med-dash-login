import React, { useState, useRef, useEffect } from 'react';
function GoalTracker() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [habitType, setHabitType] = useState('');
  const [habitAmount, setHabitAmount] = useState('');
  const [habitTimePeriod, setHabitTimePeriod] = useState('');
  const [habitStartDate, setHabitStartDate] = useState('');
  const [habitEndDate, setHabitEndDate] = useState('');
  const [startValue, setStartValue] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const handleHabitNameChange = (e) => {
    setHabitName(e.target.value);
  };
  const handleHabitTypeChange = (e) => {
    setHabitType(e.target.value);
  };
  const handleHabitAmountChange = (e) => {
    setHabitAmount(e.target.value);
  };
  const handleHabitTimePeriodChange = (e) => {
    setHabitTimePeriod(e.target.value);
  };
  const handleHabitStartDateChange = (e) => {
    setHabitStartDate(e.target.value);
  };
  const handleHabitEndDateChange = (e) => {
    setHabitEndDate(e.target.value);
  };
  const handleStartValueChange = (e) => {
    setStartValue(e.target.value);
  };
  const handleGoalValueChange = (e) => {
    setGoalValue(e.target.value);
  };
  const handleHabitSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      name: habitName,
      type: habitType,
      amount: habitAmount,
      timePeriod: habitTimePeriod,
      startDate: habitStartDate,
      endDate: habitEndDate,
      startValue: habitType === 'target' ? startValue : null,
      goalValue: habitType === 'target' ? goalValue : null,
      progress: 0 // Track progress for habit completion
    };
    setHabits([...habits, newHabit]);
    resetForm();
  };
  const resetForm = () => {
    setHabitName('');
    setHabitType('');
    setHabitAmount('');
    setHabitTimePeriod('');
    setHabitStartDate('');
    setHabitEndDate('');
    setStartValue('');
    setGoalValue('');
  };
  const updateProgress = (index, increment) => {
    const updatedHabits = [...habits];
    updatedHabits[index].progress += increment;
    setHabits(updatedHabits);
  };
  // Function to check if the goal was accomplished
  const isGoalAccomplished = (habit) => {
    return habit.type === 'habit' && habit.progress === habit.amount;
  };
  // Function to check if the goal has reached the desired compound
  const isGoalReached = (habit) => {
    return habit.type === 'target' && habit.progress >= habit.goalValue;
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Goal Tracker</h1>
      <form onSubmit={handleHabitSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name Your Goal:</label>
          <input type="text" value={habitName} onChange={handleHabitNameChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Select Goal Type:</label>
          <select value={habitType} onChange={handleHabitTypeChange} style={{ marginLeft: '10px' }}>
            <option value="">Select</option>
            <option value="habit">Habit: Repeating Action</option>
            <option value="target">Target: Number by Date</option>
            <option value="average">Average: Repeating Number</option>
          </select>
        </div>
        {habitType === 'habit' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>How Many Times?:</label>
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Time Period:</label>
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange} style={{ marginLeft: '10px' }}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        {habitType === 'target' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Value:</label>
              <input type="number" value={startValue} onChange={handleStartValueChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Goal Value:</label>
              <input type="number" value={goalValue} onChange={handleGoalValueChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        {habitType === 'average' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>Goal:</label>
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label><input type="radio" value="or more" name="averageType" /> Or More</label>
              <label><input type="radio" value="or less" name="averageType" /> Or Less</label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Time Period:</label>
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange} style={{ marginLeft: '10px' }}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        <button type="submit" style={{ marginLeft: '110px', marginTop: '10px', padding: '8px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Set Goal</button>
      </form>
      <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#333' }}>Goals</h2>
        <ul>
          {habits.map((habit, index) => (
            <li key={index} style={{ color: isGoalReached(habit) ? 'green' : '' }}>
              {habit.name} - {habit.type}
              {habit.type === 'habit' && (
                <>
                  <p>Amount: {habit.amount}</p>
                  <p>Time Period: {habit.timePeriod}</p>
                  <p>Progress: {habit.progress}/{habit.amount}</p>
                  <button onClick={() => updateProgress(index, -1)} disabled={habit.progress === 0}>-</button>
                  <button onClick={() => updateProgress(index, 1)} disabled={habit.progress === habit.amount}>+</button>
                </>
              )}
              {habit.type === 'target' && (
                <>
                  <p>Start Value: {habit.startValue}</p>
                  <p>Goal Value: {habit.goalValue}</p>
                </>
              )}
              {habit.type === 'average' && (
                <>
                  <p>Goal: {habit.amount}</p>
                  <p>Time Period: {habit.timePeriod}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HabitTracker() {
  const [habits, setHabits] = useState({
    //filled with 7 since there are 7 days in a week
    exercise: Array(7).fill(0),
    waterIntake: Array(7).fill(0),
    sleep: Array(7).fill(0)
  });
  const [goal, setGoal] = useState({
    exercise: 0,
    waterIntake: 0,
    sleep: 0
  });
  const [summary, setSummary] = useState(null);
  const [newHabit, setNewHabit] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState({
    exercise: true,
    waterIntake: true,
    sleep: true
  });

  const canvasRef = useRef(null);

  const toggleHabit = (habit, day) => {
    setHabits(prevHabits => ({
      ...prevHabits,
      [habit]: prevHabits[habit].map((item, index) =>
        index === day ? !item : item
      )
    }));
  };

  const calculateSuccessRate = (habit) => {
    const successCount = habits[habit].filter(value => value >= goal[habit]).length;
    return ((successCount / 7) * 100).toFixed(2);
  };

  const generateSummary = () => {
    const exerciseSuccessRate = calculateSuccessRate('exercise');
    const waterIntakeSuccessRate = calculateSuccessRate('waterIntake');
    const sleepSuccessRate = calculateSuccessRate('sleep');

    setSummary({
      exerciseSuccessRate,
      waterIntakeSuccessRate,
      sleepSuccessRate
    });
  };

  const handleAddNewHabit = (habit) => {
    if (habit.trim() !== '') {
      setHabits(prevHabits => ({
        ...prevHabits,
        [habit]: Array(7).fill(0)
      }));
      setGoal(prevGoal => ({
        ...prevGoal,
        [habit]: 0
      }));
      setNewHabit('');
    }
  };

  useEffect(() => {
    if (showGraph) {
      drawChart();
    }
  },);

  const drawChart = () => {
    const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const labels = [...Array(7)].map((_, day) => day + 1);

  ctx.beginPath();
  ctx.moveTo(50, 10);
  ctx.lineTo(50, 350);
  ctx.lineTo(500, 350);
  ctx.strokeStyle = '#000';
  ctx.stroke();

  const habitColors = {
    exercise: '#FF5733',
    waterIntake: '#33FF57',
    sleep: '#3357FF'
  };

  const habitNames = Object.keys(habits);

  habitNames.forEach((habit, i) => {
    if (selectedHabits[habit]) {
      ctx.beginPath();
      ctx.strokeStyle = habitColors[habit];
      ctx.lineWidth = 2;
      habits[habit].forEach((value, index) => {
        const x = 50 + (index * 60);
        const y = 350 - (value * 10);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        // Draw y-axis labels for each variable
        ctx.fillText(value, x - 10, y - 5);
      });
      ctx.stroke();
      ctx.fillText(habit, 510, 40 + i * 20);
    }
  });

  labels.forEach((label, index) => {
    ctx.fillText(label, 45 + (index * 60), 370);
  });

  habitNames.forEach((habit, i) => {
    const y = 50 + i * 20;
    ctx.fillStyle = habitColors[habit];
    ctx.fillText(habit, 10, y);
  });

  ctx.save();
  ctx.translate(30, 180);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Value", 0, 0);
  ctx.restore();
  };

  const handleCheckboxChange = (habit) => {
    setSelectedHabits(prevState => ({
      ...prevState,
      [habit]: !prevState[habit]
    }));
  };

  return (
    <div>
      <h1>Personalized Health Habit Tracker</h1>
      <h2>Add New Habit</h2>
      <div>
        <input
          type="text"
          placeholder="Enter new habit..."
          value={newHabit}
          onChange={e => setNewHabit(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleAddNewHabit(newHabit);
            }
          }}
        />
        <button onClick={() => handleAddNewHabit(newHabit)}>Add Habit</button>
      </div>
      <h2>Goals</h2>
      <div>
        {Object.keys(habits).map(habit => (
          <div key={habit}>
            <label>
              {habit} Goal:
              <input
                type="number"
                value={goal[habit] || 0}
                onChange={e => setGoal({ ...goal, [habit]: parseInt(e.target.value, 10) })}
              />
            </label>
          </div>
        ))}
      </div>
      <h2>Habit Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {Object.keys(habits).map(habit => (
              <th key={habit}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedHabits[habit]}
                    onChange={() => handleCheckboxChange(habit)}
                  />
                  {habit}
                </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, day) => (
            <tr key={day}>
              <td>{day + 1}</td>
              {Object.keys(habits).map(habit => (
                <td key={habit}>
                  <input
                    type="number"
                    value={habits[habit] ? habits[habit][day] : ''}
                    onChange={e => setHabits(prevHabits => ({
                      ...prevHabits,
                      [habit]: prevHabits[habit].map((value, index) =>
                        index === day ? parseInt(e.target.value, 10) : value
                      )
                    }))}
                  />
                  <span style={{ color: habits[habit] && habits[habit][day] >= goal[habit] ? 'green' : 'red' }}>
                    {habits[habit] ? habits[habit][day] : 0} / {goal[habit] || 0}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateSummary}>Generate Summary</button>
      <button onClick={() => setShowGraph(!showGraph)}>
        {showGraph ? 'Hide Graph' : 'Show Graph'}
      </button>
      {showGraph && (
        <div>
          <h2>Graph</h2>
          <canvas ref={canvasRef} width="550" height="400" style={{ border: '1px solid black' }}></canvas>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
            {Object.keys(habits).map(habit => (
              <label key={habit} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  checked={selectedHabits[habit]}
                  onChange={() => handleCheckboxChange(habit)}
                />
                {habit}
              </label>
            ))}
          </div>
        </div>
      )}
      {summary && (
        <div>
          <h2>Summary</h2>
          {Object.keys(summary).map(habit => (
            <p key={habit}>
              {habit}: {summary[habit]}%
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function HealthHabit() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [habitType, setHabitType] = useState('');
  const [habitAmount, setHabitAmount] = useState('');
  const [habitTimePeriod, setHabitTimePeriod] = useState('');
  const [habitStartDate, setHabitStartDate] = useState('');
  const [habitEndDate, setHabitEndDate] = useState('');
  const [startValue, setStartValue] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const handleHabitNameChange = (e) => {
    setHabitName(e.target.value);
  };
  const handleHabitTypeChange = (e) => {
    setHabitType(e.target.value);
  };
  const handleHabitAmountChange = (e) => {
    setHabitAmount(e.target.value);
  };
  const handleHabitTimePeriodChange = (e) => {
    setHabitTimePeriod(e.target.value);
  };
  const handleHabitStartDateChange = (e) => {
    setHabitStartDate(e.target.value);
  };
  const handleHabitEndDateChange = (e) => {
    setHabitEndDate(e.target.value);
  };
  const handleStartValueChange = (e) => {
    setStartValue(e.target.value);
  };
  const handleGoalValueChange = (e) => {
    setGoalValue(e.target.value);
  };
  const handleHabitSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      name: habitName,
      type: habitType,
      amount: habitAmount,
      timePeriod: habitTimePeriod,
      startDate: habitStartDate,
      endDate: habitEndDate,
      startValue: habitType === 'target' ? startValue : null,
      goalValue: habitType === 'target' ? goalValue : null,
      progress: 0 // Track progress for habit completion
    };
    setHabits([...habits, newHabit]);
    resetForm();
  };
  const resetForm = () => {
    setHabitName('');
    setHabitType('');
    setHabitAmount('');
    setHabitTimePeriod('');
    setHabitStartDate('');
    setHabitEndDate('');
    setStartValue('');
    setGoalValue('');
  };
  const updateProgress = (index, increment) => {
    const updatedHabits = [...habits];
    updatedHabits[index].progress += increment;
    setHabits(updatedHabits);
  };
  // Function to check if the goal was accomplished
  const isGoalAccomplished = (habit) => {
    return habit.type === 'habit' && habit.progress === habit.amount;
  };
  // Function to check if the goal has reached the desired compound
  const isGoalReached = (habit) => {
    return habit.type === 'target' && habit.progress >= habit.goalValue;
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Goal Tracker</h1>
      <form onSubmit={handleHabitSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name Your Goal:</label>
          <input type="text" value={habitName} onChange={handleHabitNameChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Select Goal Type:</label>
          <select value={habitType} onChange={handleHabitTypeChange} style={{ marginLeft: '10px' }}>
            <option value="">Select</option>
            <option value="habit">Habit: Repeating Action</option>
            <option value="target">Target: Number by Date</option>
            <option value="average">Average: Repeating Number</option>
          </select>
        </div>
        {habitType === 'habit' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>How Many Times?:</label>
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Time Period:</label>
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange} style={{ marginLeft: '10px' }}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        {habitType === 'target' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Value:</label>
              <input type="number" value={startValue} onChange={handleStartValueChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Goal Value:</label>
              <input type="number" value={goalValue} onChange={handleGoalValueChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        {habitType === 'average' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>Goal:</label>
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label><input type="radio" value="or more" name="averageType" /> Or More</label>
              <label><input type="radio" value="or less" name="averageType" /> Or Less</label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Time Period:</label>
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange} style={{ marginLeft: '10px' }}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        <button type="submit" style={{ marginLeft: '110px', marginTop: '10px', padding: '8px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Set Goal</button>
      </form>
      <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#333' }}>Goals</h2>
        <ul>
          {habits.map((habit, index) => (
            <li key={index} style={{ color: isGoalReached(habit) ? 'green' : '' }}>
              {habit.name} - {habit.type}
              {habit.type === 'habit' && (
                <>
                  <p>Amount: {habit.amount}</p>
                  <p>Time Period: {habit.timePeriod}</p>
                  <p>Progress: {habit.progress}/{habit.amount}</p>
                  <button onClick={() => updateProgress(index, -1)} disabled={habit.progress === 0}>-</button>
                  <button onClick={() => updateProgress(index, 1)} disabled={habit.progress === habit.amount}>+</button>
                </>
              )}
              {habit.type === 'target' && (
                <>
                  <p>Start Value: {habit.startValue}</p>
                  <p>Goal Value: {habit.goalValue}</p>
                </>
              )}
              {habit.type === 'average' && (
                <>
                  <p>Goal: {habit.amount}</p>
                  <p>Time Period: {habit.timePeriod}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default HealthHabit;