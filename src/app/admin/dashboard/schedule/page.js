'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { dataService } from '@/lib/dataService';

export default function ScheduleAppointment() {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const fetchAvailableSlots = async (date) => {
    if (!date) return;
    
    setLoading(true);
    try {
      const slots = await dataService.getAvailableSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const handleSchedule = async (time) => {
    if (!patientInfo.name || !patientInfo.email) {
      alert('Please fill in patient name and email');
      return;
    }

    try {
      await dataService.addReservation({
        date: selectedDate,
        startTime: time,
        endTime: calculateEndTime(time),
        patientName: patientInfo.name,
        patientEmail: patientInfo.email,
        patientPhone: patientInfo.phone,
        status: 'confirmed'
      });

      // Refresh available slots
      fetchAvailableSlots(selectedDate);
      
      // Reset form
      setPatientInfo({ name: '', email: '', phone: '' });
      
      alert('Appointment scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment');
    }
  };

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date(1970, 0, 1, hours, minutes + 60);
    return endTime.toTimeString().slice(0, 5);
  };

  return (
    <div className={styles.schedule}>
      <div className={styles.header}>
        <h1>Schedule Appointment</h1>
        <p>Book a new appointment by selecting date and available time</p>
      </div>

      <div className={styles.scheduleContainer}>
        {/* Date Selection */}
        <div className={styles.dateSection}>
          <h2>Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={styles.dateInput}
          />
        </div>

        {/* Patient Information */}
        <div className={styles.patientSection}>
          <h2>Patient Information</h2>
          <div className={styles.patientForm}>
            <input
              type="text"
              placeholder="Patient Name"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Patient Email"
              value={patientInfo.email}
              onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="Patient Phone (Optional)"
              value={patientInfo.phone}
              onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
              className={styles.input}
            />
          </div>
        </div>

        {/* Available Slots */}
        <div className={styles.slotsSection}>
          <h2>
            Available Time Slots for {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading available slots...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <p className={styles.noSlots}>No available slots for this date</p>
          ) : (
            <div className={styles.slotsGrid}>
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSchedule(slot)}
                  disabled={!patientInfo.name || !patientInfo.email}
                  className={styles.slotButton}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}