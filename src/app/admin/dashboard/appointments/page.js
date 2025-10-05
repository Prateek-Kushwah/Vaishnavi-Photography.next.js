// app/admin/dashboard/appointments/page.js
'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
    // Sort by date (newest first)
    stored.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
    setAppointments(stored);
  };

  const filteredAppointments = appointments.filter(apt => {
    const now = new Date();
    const appointmentDate = new Date(apt.date + ' ' + apt.time);
    
    switch (filter) {
      case 'upcoming':
        return appointmentDate > now;
      case 'past':
        return appointmentDate < now;
      default:
        return true;
    }
  });

  const formatDate = (dateString, timeString) => {
    const date = new Date(dateString + ' ' + timeString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatus = (dateString, timeString) => {
    const appointmentDate = new Date(dateString + ' ' + timeString);
    const now = new Date();
    return appointmentDate > now ? 'upcoming' : 'completed';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Appointments</h1>
          <p>Manage and view all booked appointments</p>
        </div>
        <div className={styles.filterSection}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Appointments</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{appointments.length}</div>
          <div className={styles.statLabel}>Total</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {appointments.filter(apt => getStatus(apt.date, apt.time) === 'upcoming').length}
          </div>
          <div className={styles.statLabel}>Upcoming</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {appointments.filter(apt => getStatus(apt.date, apt.time) === 'completed').length}
          </div>
          <div className={styles.statLabel}>Completed</div>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className={styles.emptyState}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
          </svg>
          <p>No appointments found</p>
          <span>
            {filter === 'all' 
              ? "No appointments have been booked yet" 
              : `No ${filter} appointments found`}
          </span>
        </div>
      ) : (
        <div className={styles.appointmentsList}>
          {filteredAppointments.map(appointment => (
            <div key={appointment.id} className={styles.appointmentCard}>
              <div className={styles.appointmentHeader}>
                <div className={styles.clientInfo}>
                  <h3>{appointment.name}</h3>
                  <span className={styles.contact}>
                    {appointment.phone} • {appointment.email}
                  </span>
                </div>
                <div className={styles.appointmentMeta}>
                  <span className={`${styles.status} ${
                    getStatus(appointment.date, appointment.time) === 'upcoming' 
                      ? styles.statusUpcoming 
                      : styles.statusCompleted
                  }`}>
                    {getStatus(appointment.date, appointment.time)}
                  </span>
                  <span className={styles.date}>
                    {formatDate(appointment.date, appointment.time)}
                  </span>
                </div>
              </div>
              
              <div className={styles.appointmentDetails}>
                <div className={styles.detailItem}>
                  <strong>Service:</strong>
                  <span>{appointment.service}</span>
                </div>
                {appointment.message && (
                  <div className={styles.detailItem}>
                    <strong>Message:</strong>
                    <span>{appointment.message}</span>
                  </div>
                )}
                <div className={styles.detailItem}>
                  <strong>Booked on:</strong>
                  <span>
                    {new Date(appointment.bookedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}