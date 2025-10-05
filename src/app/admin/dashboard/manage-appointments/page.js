'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { dataService } from '@/lib/dataService';

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    startTime: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    message: ''
  });

  useEffect(() => {
    fetchAppointments();
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await dataService.getData();
      console.log('Fetched appointments data:', data); // Debug log
      const allAppointments = data.reservedSlots;
      
      if (!Array.isArray(allAppointments)) {
        console.error('Invalid appointments data:', allAppointments);
        setAppointments([]);
        return;
      }

      // Sort by date and time
      const sorted = allAppointments.sort((a, b) => 
        new Date(a.date + 'T' + a.startTime) - new Date(b.date + 'T' + b.startTime)
      );
      console.log('Sorted appointments:', sorted); // Debug log
      setAppointments(sorted);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (date) => {
    try {
      const slots = await dataService.getAvailableSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    
    if (!newAppointment.date || !newAppointment.startTime || !newAppointment.patientName) {
      alert('Please fill in required fields');
      return;
    }

    try {
      // Calculate end time (1 hour duration)
      const [hours, minutes] = newAppointment.startTime.split(':').map(Number);
      const endTime = new Date(1970, 0, 1, hours + 1, minutes).toTimeString().slice(0, 5);

      await dataService.addAppointment({
        ...newAppointment,
        endTime
      });

      // Reset form and refresh
      setNewAppointment({
        date: '',
        startTime: '',
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        message: ''
      });
      setShowAddForm(false);
      fetchAppointments();
      fetchAvailableSlots(selectedDate);
      
      alert('Appointment added successfully with status: Pending!');
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('Failed to add appointment');
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      await dataService.updateAppointmentStatus(id, newStatus);
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      ));
      fetchAvailableSlots(selectedDate);
      alert(`Appointment ${newStatus} successfully!`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment');
    }
  };

  const deleteAppointment = async (id) => {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    try {
      await dataService.deleteAppointment(id);
      setAppointments(appointments.filter(apt => apt.id !== id));
      fetchAvailableSlots(selectedDate);
      alert('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewAppointment(prev => ({ ...prev, date, startTime: '' }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#f59e0b', text: 'Pending' },
      confirmed: { color: '#10b981', text: 'Confirmed' },
      cancelled: { color: '#ef4444', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span 
        className={styles.statusBadge}
        style={{ 
          background: `${config.color}20`,
          color: config.color,
          border: `1px solid ${config.color}30`
        }}
      >
        {config.text}
      </span>
    );
  };

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');

  return (
    <div className={styles.manageAppointments}>
      <div className={styles.header}>
        <h1>Manage Appointments</h1>
        <p>Add and manage all appointments. New appointments are created with status: Pending.</p>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={styles.addButton}
        >
          {showAddForm ? 'Cancel' : 'Add New Appointment'}
        </button>
      </div>

      {/* Add Appointment Form */}
      {showAddForm && (
        <div className={styles.addForm}>
          <h2>Add New Appointment</h2>
          <form onSubmit={handleAddAppointment}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Date *</label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Time *</label>
                <select
                  value={newAppointment.startTime}
                  onChange={(e) => setNewAppointment({...newAppointment, startTime: e.target.value})}
                  required
                  className={styles.input}
                  disabled={!newAppointment.date}
                >
                  <option value="">Select Time</option>
                  {availableSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {!newAppointment.date && (
                  <small className={styles.helperText}>Select a date first</small>
                )}
                {newAppointment.date && availableSlots.length === 0 && (
                  <small className={styles.helperText}>No available slots for this date</small>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Patient Name *</label>
                <input
                  type="text"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                  required
                  className={styles.input}
                  placeholder="Enter patient name"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Patient Email</label>
                <input
                  type="email"
                  value={newAppointment.patientEmail}
                  onChange={(e) => setNewAppointment({...newAppointment, patientEmail: e.target.value})}
                  className={styles.input}
                  placeholder="Enter patient email"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Patient Phone</label>
                <input
                  type="tel"
                  value={newAppointment.patientPhone}
                  onChange={(e) => setNewAppointment({...newAppointment, patientPhone: e.target.value})}
                  className={styles.input}
                  placeholder="Enter patient phone"
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Add Appointment (Status: Pending)
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appointments List */}
      <div className={styles.appointmentsContainer}>
        {/* Pending Appointments */}
        <div className={styles.appointmentsSection}>
          <h2>Pending Appointments ({pendingAppointments.length})</h2>
          
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading appointments...</p>
            </div>
          ) : pendingAppointments.length === 0 ? (
            <div className={styles.noAppointments}>
              <p>No pending appointments</p>
            </div>
          ) : (
            <div className={styles.appointmentsGrid}>
              {pendingAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  onUpdateStatus={updateAppointmentStatus}
                  onDelete={deleteAppointment}
                  showConfirm={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Confirmed Appointments */}
        <div className={styles.appointmentsSection}>
          <h2>Confirmed Appointments ({confirmedAppointments.length})</h2>
          
          {confirmedAppointments.length === 0 ? (
            <div className={styles.noAppointments}>
              <p>No confirmed appointments</p>
            </div>
          ) : (
            <div className={styles.appointmentsGrid}>
              {confirmedAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  onUpdateStatus={updateAppointmentStatus}
                  onDelete={deleteAppointment}
                  showConfirm={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Appointment Card Component
function AppointmentCard({ appointment, onUpdateStatus, onDelete, showConfirm }) {
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.appointmentHeader}>
        <h3>{appointment.name || appointment.patientName}</h3>
        <span 
          className={styles.statusBadge}
          style={{ 
            background: appointment.status === 'confirmed' ? '#10b98120' : '#f59e0b20',
            color: appointment.status === 'confirmed' ? '#10b981' : '#f59e0b',
            border: `1px solid ${appointment.status === 'confirmed' ? '#10b98130' : '#f59e0b30'}`
          }}
        >
          {appointment.status}
        </span>
      </div>
      
      <div className={styles.appointmentDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Date:</span>
          <span className={styles.detailValue}>
            {new Date(appointment.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Time:</span>
          <span className={styles.detailValue}>
            {appointment.startTime} - {appointment.endTime}
          </span>
        </div>
        
        {(appointment.email || appointment.patientEmail) && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Email:</span>
            <span className={styles.detailValue}>{appointment.email || appointment.patientEmail}</span>
          </div>
        )}
        
        {(appointment.phone || appointment.patientPhone) && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Phone:</span>
            <span className={styles.detailValue}>{appointment.phone || appointment.patientPhone}</span>
          </div>
        )}

        {appointment.message && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Message:</span>
            <span className={styles.detailValue}>{appointment.message}</span>
          </div>
        )}
        
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Created:</span>
          <span className={styles.detailValue}>
            {new Date(appointment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className={styles.appointmentActions}>
        {showConfirm && (
          <button
            onClick={() => onUpdateStatus(appointment.id, 'confirmed')}
            className={styles.confirmButton}
          >
            Confirm
          </button>
        )}
        
        {!showConfirm && (
          <button
            onClick={() => onUpdateStatus(appointment.id, 'pending')}
            className={styles.pendingButton}
          >
            Mark Pending
          </button>
        )}
        
        <button
          onClick={() => onDelete(appointment.id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
}