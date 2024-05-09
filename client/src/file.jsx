import React from 'react';

// Assuming this is part of your component
const YourComponent = () => {
  const ree = [
    { in_time: '9:00 AM' },
    { in_time: '9:05 AM' },
    // Add more in-time values as needed
  ];

  // Calculate the average in minutes
  const averageInMinutes = ree.reduce(
    (total, item) => total + convertToMinutes(item.in_time),
    0
  ) / ree.length;

  // Convert the average back to time format
  const averageInTime = convertToTimeFormat(averageInMinutes);

  return (
    <Typography variant="h6" style={{ color: '#0072BC', marginTop: '30px' }}>
      Average: {averageInTime}
    </Typography>
  );
};

// Function to convert time to minutes
const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Function to convert minutes back to time format
const convertToTimeFormat = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    remainingMinutes
  ).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

  return formattedTime;
};

export default YourComponent;