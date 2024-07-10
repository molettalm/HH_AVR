import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import 'tailwindcss/tailwind.css';
import '../Calendar.css'; // Import the CSS file

const appApiUrl = "http://localhost:3000"; // Adjust as necessary

const Calendar = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayExercises, setSelectedDayExercises] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRange, setDateRange] = useState('last15');

  const username = Cookies.get('username'); // Ensure the cookie is properly set

  useEffect(() => {
    fetchExercises();
  }, [startDate, endDate, username]);

  const fetchExercises = () => {
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedEndDate = endDate.toISOString().slice(0, 10);

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    };

    fetch(`${appApiUrl}/exercises?username=${username}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`, requestOptions)
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  };

  const handleDayClick = (dayString) => {
    setSelectedDay(dayString);
    const dayExercises = exercises.filter(exercise => new Date(exercise.date).toISOString().slice(0, 10) === dayString);
    setSelectedDayExercises(dayExercises);
  };

  const renderDays = () => {
    const daysArray = [];
    const currentDate = new Date(startDate);

    // Calculate the first day of the current month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)

    // Calculate days from the previous month
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let day = prevMonthLastDay - startDayOfWeek + 1; day <= prevMonthLastDay; day++) {
      const dayString = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day).toISOString().slice(0, 10);
      daysArray.push(
        <div
          key={dayString}
          className={`day prev-month`}
          onClick={() => handleDayClick(dayString)}
        >
          <span>{day}</span>
        </div>
      );
    }

    // Calculate days for the current month
    const monthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= monthDays; day++) {
      const dayString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().slice(0, 10);
      const dayExercises = exercises.filter(exercise => new Date(exercise.date).toISOString().slice(0, 10) === dayString);
      daysArray.push(
        <div
          key={dayString}
          className={`day ${dayString === selectedDay ? 'selected' : ''} ${dayExercises.length ? 'has-metrics' : 'no-metrics'}`}
          onClick={() => handleDayClick(dayString)}
        >
          <span>{day}</span>
        </div>
      );
    }

    return daysArray;
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (dateRange === 'last15') {
      setEndDate(selectedDate);
      setStartDate(new Date(selectedDate).setDate(selectedDate.getDate() - 14));
    } else {
      setEndDate(selectedDate);
      setStartDate(new Date(selectedDate).setDate(selectedDate.getDate() - 29));
    }
  };

  return (
    <div className="calendar-container">
      <div className="date-range-slider">
        <label htmlFor="dateRange">Selecionar Período:</label>
        <input
          type="date"
          id="dateRange"
          name="dateRange"
          value={endDate.toISOString().slice(0, 10)}
          onChange={handleDateChange}
          max={new Date().toISOString().slice(0, 10)}
        />
      </div>
      <div className="calendar">
        <div className="current-date">
          <h1>{selectedDay ? formatDate(selectedDay) : 'Selecione um dia'}</h1>
        </div>
        <div className="current-month">
          <ul className="week-days">
            <li>SEG</li>
            <li>TER</li>
            <li>QUA</li>
            <li>QUI</li>
            <li>SEX</li>
            <li>SÁB</li>
            <li>DOM</li>
          </ul>
          <div className="weeks">
            {renderDays()}
          </div>
        </div>
      </div>
      {selectedDay && (
        <div className="day-details">
          <h2>Exercícios em {formatDate(selectedDay)}:</h2>
          {selectedDayExercises.length > 0 ? (
            selectedDayExercises.map((exercise, index) => (
              <div key={index} className="exercise-detail">
                <p>{exercise.description}: {exercise.calories_burned} kcal</p>
              </div>
            ))
          ) : (
            <p>Nenhum exercício registrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
