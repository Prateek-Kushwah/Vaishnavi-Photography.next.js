// app/admin/dashboard/availability/page.js
'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AvailabilityManagement() {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = () => {
    const stored = JSON.parse(localStorage.getItem('availability') || '[]');
    setAvailability(stored);
  };

  const handleAddTimeSlot = () => {
    if (currentTime && !timeSlots.includes(currentTime)) {
      setTimeSlots([...timeSlots, currentTime]);
      setCurrentTime('');
    }
  };

  const handleRemoveTimeSlot = (slotToRemove) => {
    setTimeSlots(timeSlots.filter(slot => slot !== slotToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || timeSlots.length === 0) return;

    setIsLoading(true);

    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      timeSlots: [...timeSlots].sort(),
      createdAt: new Date().toISOString()
    };

    const existingIndex = availability.findIndex(item => item.date === selectedDate);
    
    let newAvailability;
    if (existingIndex >= 0) {
      // Update existing date
      newAvailability = [...availability];
      newAvailability[existingIndex] = newEntry;
    } else {
      // Add new date
      newAvailability = [...availability, newEntry];
    }

    // Sort by date
    newAvailability.sort((a, b) => new Date(a.date) - new Date(b.date));

    localStorage.setItem('availability', JSON.stringify(newAvailability));
    setAvailability(newAvailability);
    
    // Reset form
    setSelectedDate('');
    setTimeSlots([]);
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this availability?')) {
      const newAvailability = availability.filter(item => item.id !== id);
      localStorage.setItem('availability', JSON.stringify(newAvailability));
      setAvailability(newAvailability);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Availability</h1>
        <p>Set your available dates and time slots for appointments</p>
      </div>

      {showSuccess && (
        <div className={styles.successMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
          Availability updated successfully!
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>Add Availability</h2>
          <form onSubmit={handleSubmit} className={styles.availabilityForm}>
            <div className={styles.formGroup}>
              <label htmlFor="date">Select Date</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Time Slots</label>
              <div className={styles.timeInput}>
                <input
                  type="time"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={handleAddTimeSlot}
                  className={styles.addTimeButton}
                  disabled={!currentTime}
                >
                  Add Time
                </button>
              </div>
              
              {timeSlots.length > 0 && (
                <div className={styles.timeSlotsList}>
                  <h4>Selected Time Slots:</h4>
                  <div className={styles.timeSlotsGrid}>
                    {timeSlots.map(slot => (
                      <div key={slot} className={styles.timeSlotChip}>
                        {slot}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTimeSlot(slot)}
                          className={styles.removeTimeButton}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!selectedDate || timeSlots.length === 0 || isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Availability'}
            </button>
          </form>
        </div>

        <div className={styles.listSection}>
          <h2>Current Availability</h2>
          {availability.length === 0 ? (
            <div className={styles.emptyState}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>
              <p>No availability set yet</p>
              <span>Add your first available date using the form</span>
            </div>
          ) : (
            <div className={styles.availabilityList}>
              {availability.map(item => (
                <div key={item.id} className={styles.availabilityItem}>
                  <div className={styles.availabilityInfo}>
                    <h3>{formatDate(item.date)}</h3>
                    <div className={styles.timeSlots}>
                      {item.timeSlots.map(slot => (
                        <span key={slot} className={styles.timeSlot}>{slot}</span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className={styles.deleteButton}
                    title="Delete availability"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}