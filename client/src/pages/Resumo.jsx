import React from 'react';
import Calendar from '../components/Calendar'; // Certifique-se de que o caminho está correto

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <Calendar />
    </div>
  );
}

