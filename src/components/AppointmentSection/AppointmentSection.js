// AppointmentSection.js
"use client"
import { useEffect, useState } from "react";
import styles from "./AppointmentSection.module.css";
import { dataService } from "@/lib/dataService";

const formatTimeToAMPM = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [adminAvailability, setAdminAvailability] = useState([]);
  const [isFocused, setIsFocused] = useState({
    name: false,
    phone: false,
    email: false,
    message: false
  });

  const services = [
    'Video Editing',
    'Color Grading',
    'Motion Graphics',
    'Video Consultation',
    'Project Discussion',
    'Other'
  ];

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const availability = await dataService.getNext20Days();
        setAdminAvailability(availability);
      } catch (error) {
        console.error("Failed to fetch availability:", error);
      }
    };
    fetchAvailability();
  }, []);

  const isDateAvailable = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    const availableDate = adminAvailability.find(item => item.date === dateString);
    return !!availableDate && availableDate.availableSlots.length > 0;
  };

  const getAvailableTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];
    const availableDate = adminAvailability.find(item => item.date === selectedDate);
    return availableDate ? availableDate.availableSlots : [];
  };

  const getAvailableDatesForMonth = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const availableDates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      if (isDateAvailable(dateString)) {
        availableDates.push(day);
      }
    }
    return availableDates;
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setIsFocused(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Auto-set focus state when user types
    if (value && !isFocused[name]) {
      setIsFocused(prev => ({ ...prev, [name]: true }));
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (day) => {
    const date = new Date(selectedYear, selectedMonth, day);
    const dateString = date.toISOString().split('T')[0];
    return !isDateAvailable(dateString);
  };

  const handleDateSelect = (day) => {
    if (isDateDisabled(day)) return;
    const date = new Date(selectedYear, selectedMonth, day);
    const formattedDate = date.toISOString().split('T')[0];
    const displayDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    setFormData(prev => ({
      ...prev,
      date: formattedDate,
      dateDisplay: displayDate,
      time: ''
    }));
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time }));
    setShowTimePicker(false);
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(prev => prev - 1);
      } else {
        setSelectedMonth(prev => prev - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(prev => prev + 1);
      } else {
        setSelectedMonth(prev => prev + 1);
      }
    }
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];
    const today = new Date();
    const availableDates = getAvailableDatesForMonth(selectedMonth, selectedYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.calendarDayEmpty}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      const isToday = today.getDate() === day &&
        today.getMonth() === selectedMonth &&
        today.getFullYear() === selectedYear;
      const isSelected = formData.date &&
        new Date(formData.date).getDate() === day &&
        new Date(formData.date).getMonth() === selectedMonth &&
        new Date(formData.date).getFullYear() === selectedYear;
      const isAvailable = availableDates.includes(day);

      days.push(
        <div
          key={day}
          className={`${styles.calendarDay} ${isDisabled ? styles.calendarDayDisabled : ''
            } ${isSelected ? styles.calendarDaySelected : ''} ${isToday ? styles.calendarDayToday : ''
            } ${isAvailable ? styles.calendarDayAvailable : ''}`}
          onClick={() => !isDisabled && handleDateSelect(day)}
          title={isDisabled ? 'Not available' : 'Available'}
        >
          {day}
          {isToday && <div className={styles.todayIndicator}></div>}
        </div>
      );
    }
    return days;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = 'Either phone number or email is required';
    } else {
      if (formData.phone.trim() && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const appointmentData = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      bookedAt: new Date().toISOString()
    };

    await dataService.addAppointment(appointmentData);
    setIsSubmitted(true);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentAvailableTimeSlots = formData.date ? getAvailableTimeSlots(formData.date) : [];

  if (isSubmitted) {
    return (
      <section className={styles.appointmentSuccess}>
        <div className={styles.successContent}>
          <div className={styles.successIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
          <h3>Appointment Confirmed!</h3>
          <p>Your appointment for <strong>{formData.service}</strong> on <strong>{formData.dateDisplay}</strong> at <strong>{formData.time ? formatTimeToAMPM(formData.time) : ''}</strong> has been booked successfully.</p>
          <p>You will receive a confirmation email shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.appointmentSection}>
      <div className={styles.appointmentContainer}>
        <div className={styles.appointmentHeader}>
          <h2>Schedule Your Creative Session</h2>
          <p>Let's bring your vision to life. Book a time that works for you and let's create something amazing together.</p>
        </div>

        {adminAvailability.length === 0 && (
          <div className={styles.configNotice}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <span>No availability set yet. Please check back later or contact us directly.</span>
          </div>
        )}

        <form className={styles.appointmentForm} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h3>Your Information</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <div className={`${styles.inputContainer} ${errors.name ? styles.error : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                  />
                  <label
                    htmlFor="name"
                    className={`${styles.label} ${isFocused.name || formData.name ? styles.focused : ''}`}
                  >
                    Full Name *
                  </label>
                </div>
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <div className={`${styles.inputContainer} ${errors.phone ? styles.error : ''}`}>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                  />
                  <label
                    htmlFor="phone"
                    className={`${styles.label} ${isFocused.phone || formData.phone ? styles.focused : ''}`}
                  >
                    Phone Number *
                  </label>
                </div>
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <div className={`${styles.inputContainer} ${errors.email ? styles.error : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                  />
                  <label
                    htmlFor="email"
                    className={`${styles.label} ${isFocused.email || formData.email ? styles.focused : ''}`}
                  >
                    Email Address *
                  </label>
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="service" className={styles.selectLabel}>Service Required *</label>
                <div className={styles.customSelect}>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${styles.select} ${errors.service ? styles.error : ''}`}
                  >
                    <option value="">Choose a service</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  <div className={styles.selectArrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.service && <span className={styles.errorText}>{errors.service}</span>}
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Schedule Your Session</h3>
            <div className={styles.scheduleGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="date" className={styles.pickerLabel}>Preferred Date *</label>
                <div className={styles.customDatePicker}>
                  <button
                    type="button"
                    className={`${styles.dateInput} ${errors.date ? styles.error : ''}`}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    disabled={adminAvailability.length === 0}
                  >
                    {formData.dateDisplay || (adminAvailability.length === 0 ? 'No dates available' : 'Select a date')}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showDatePicker && adminAvailability.length > 0 && (
                    <div className={styles.datePickerDropdown}>
                      <div className={styles.calendarHeader}>
                        <button
                          type="button"
                          className={styles.calendarNavButton}
                          onClick={() => navigateMonth('prev')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className={styles.calendarTitle}>
                          {monthNames[selectedMonth]} {selectedYear}
                        </span>
                        <button
                          type="button"
                          className={styles.calendarNavButton}
                          onClick={() => navigateMonth('next')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      <div className={styles.calendarWeekdays}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className={styles.calendarWeekday}>{day}</div>
                        ))}
                      </div>

                      <div className={styles.calendarGrid}>
                        {generateCalendarDays()}
                      </div>

                      <div className={styles.calendarLegend}>
                        <div className={styles.legendItem}>
                          <div className={`${styles.legendColor} ${styles.legendToday}`}></div>
                          <span>Today</span>
                        </div>
                        <div className={styles.legendItem}>
                          <div className={`${styles.legendColor} ${styles.legendAvailable}`}></div>
                          <span>Available</span>
                        </div>
                        <div className={styles.legendItem}>
                          <div className={`${styles.legendColor} ${styles.legendUnavailable}`}></div>
                          <span>Unavailable</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {errors.date && <span className={styles.errorText}>{errors.date}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="time" className={styles.pickerLabel}>Preferred Time *</label>
                <div className={styles.customTimePicker}>
                  <button
                    type="button"
                    className={`${styles.timeInput} ${errors.time ? styles.error : ''}`}
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    disabled={!formData.date || currentAvailableTimeSlots.length === 0}
                  >
                    {formData.time ? formatTimeToAMPM(formData.time) :
                      (!formData.date ? 'Select date first' :
                        currentAvailableTimeSlots.length === 0 ? 'No times available' : 'Select a time')}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showTimePicker && formData.date && currentAvailableTimeSlots.length > 0 && (
                    <div className={styles.timePickerDropdown}>
                      <div className={styles.timeSlotsGrid}>
                        {currentAvailableTimeSlots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            className={`${styles.timeSlot} ${formData.time === slot ? styles.timeSlotSelected : ''
                              }`}
                            onClick={() => handleTimeSelect(slot)}
                          >
                            {formatTimeToAMPM(slot)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {errors.time && <span className={styles.errorText}>{errors.time}</span>}
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Project Details</h3>
            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                ></textarea>
                <label
                  htmlFor="message"
                  className={`${styles.label} ${isFocused.message || formData.message ? styles.focused : ''}`}
                >
                  Additional Message (Optional)
                </label>
              </div>
            </div>
          </div>

          {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || adminAvailability.length === 0}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Booking Your Creative Session...
              </>
            ) : adminAvailability.length === 0 ? (
              'No Availability Set'
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>
                Confirm Creative Session
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}