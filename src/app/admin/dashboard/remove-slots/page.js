'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { dataService } from '@/lib/dataService';

export default function RemoveSlots() {
  const [next20Days, setNext20Days] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [blockReason, setBlockReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [blockedSlots, setBlockedSlots] = useState([]);

  useEffect(() => {
    fetchData();
    // Set default selected date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await dataService.getData();
      const days = await dataService.getNext20Days();
      setNext20Days(days || []);
      setBlockedSlots(data.blockedSlots || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNext20Days([]);
      setBlockedSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSlotSelection = (slot) => {
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const blockSelectedSlots = async () => {
    if (!selectedDate || selectedSlots.length === 0) {
      alert('Please select a date and at least one time slot');
      return;
    }

    try {
      const currentBlockedSlots = await dataService.getBlockedSlots();
      
      const newBlockedSlots = selectedSlots.map(slot => ({
        date: selectedDate,
        startTime: slot,
        endTime: calculateEndTime(slot),
        reason: blockReason || 'Unavailable'
      }));

      const updatedBlockedSlots = [...currentBlockedSlots, ...newBlockedSlots];
      await dataService.updateBlockedSlots(updatedBlockedSlots);
      
      // Refresh data
      fetchData();
      setSelectedSlots([]);
      setBlockReason('');
      alert('Time slots blocked successfully!');
    } catch (error) {
      console.error('Error blocking slots:', error);
      alert('Failed to block time slots');
    }
  };

  const unblockSlot = async (blockedSlot) => {
    try {
      const currentBlockedSlots = await dataService.getBlockedSlots();
      const updatedBlockedSlots = currentBlockedSlots.filter(slot => 
        !(slot.date === blockedSlot.date && slot.startTime === blockedSlot.startTime)
      );
      
      await dataService.updateBlockedSlots(updatedBlockedSlots);
      fetchData();
      alert('Time slot unblocked successfully!');
    } catch (error) {
      console.error('Error unblocking slot:', error);
      alert('Failed to unblock time slot');
    }
  };

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date(1970, 0, 1, hours + 1, minutes);
    return endTime.toTimeString().slice(0, 5);
  };

  const getSelectedDay = () => {
    return next20Days.find(day => day.date === selectedDate) || { 
      date: selectedDate, 
      blockedSlots: [], 
      availableSlots: [] 
    };
  };

  const selectedDay = getSelectedDay();

  return (
    <div className={styles.removeSlots}>
      <div className={styles.header}>
        <h1>Remove Time Slots</h1>
        <p>Block specific time slots from the next 20 days</p>
      </div>

      <div className={styles.container}>
        {/* Date Selection */}
        <div className={styles.dateSection}>
          <h2>Select Date</h2>
          <select 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className={styles.dateSelect}
          >
            <option value="">Choose a date</option>
            {next20Days.map(day => (
              <option key={day.date} value={day.date}>
                {new Date(day.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </option>
            ))}
          </select>
        </div>

        {selectedDay && (
          <>
            {/* Available Slots Selection */}
            <div className={styles.slotsSection}>
              <h2>
                Available Time Slots for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              
              <div className={styles.slotsGrid}>
                {selectedDay.allSlots.map((slot, index) => {
                  const isAvailable = selectedDay.availableSlots.includes(slot);
                  const isBlocked = selectedDay.blockedSlots.some(blocked => blocked.startTime === slot);
                  const isSelected = selectedSlots.includes(slot);

                  if (!isAvailable) return null;

                  return (
                    <button
                      key={index}
                      onClick={() => toggleSlotSelection(slot)}
                      className={`${styles.slotButton} ${
                        isBlocked ? styles.blocked : 
                        isSelected ? styles.selected : styles.available
                      }`}
                      disabled={isBlocked}
                    >
                      {slot}
                      {isBlocked && <span className={styles.blockedBadge}>Blocked</span>}
                    </button>
                  );
                })}
              </div>

              {selectedSlots.length > 0 && (
                <div className={styles.blockForm}>
                  <h3>Block Selected Slots ({selectedSlots.length})</h3>
                  <input
                    type="text"
                    placeholder="Reason for blocking (optional)"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className={styles.reasonInput}
                  />
                  <button 
                    onClick={blockSelectedSlots}
                    className={styles.blockButton}
                  >
                    Block Selected Slots
                  </button>
                </div>
              )}
            </div>

            {/* Currently Blocked Slots */}
            <div className={styles.blockedSection}>
              <h2>Currently Blocked Slots</h2>
              {!selectedDay?.blockedSlots?.length ? (
                <p className={styles.noBlocked}>No slots blocked for this date</p>
              ) : (
                <div className={styles.blockedList}>
                  {(blockedSlots || []).map((slot, index) => (
                    <div key={index} className={styles.blockedItem}>
                      <div className={styles.blockedInfo}>
                        <span className={styles.blockedTime}>{slot.startTime} - {slot.endTime}</span>
                        {slot.reason && (
                          <span className={styles.blockedReason}>{slot.reason}</span>
                        )}
                      </div>
                      <button
                        onClick={() => unblockSlot(slot)}
                        className={styles.unblockButton}
                      >
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <h3>{next20Days.reduce((total, day) => total + day.availableSlots.length, 0)}</h3>
          <p>Total Available Slots</p>
        </div>
        <div className={styles.stat}>
          <h3>{next20Days.reduce((total, day) => total + day.blockedSlots.length, 0)}</h3>
          <p>Total Blocked Slots</p>
        </div>
        <div className={styles.stat}>
          <h3>{next20Days.filter(day => day.availableSlots.length > 0).length}</h3>
          <p>Days with Availability</p>
        </div>
      </div>
    </div>
  );
}