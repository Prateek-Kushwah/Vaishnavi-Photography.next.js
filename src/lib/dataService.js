// Data service functions for appointments
const API_URL = '/api/appointments';

export const dataService = {
  // Fetch all data
  async getData() {
    try {
      // Read directly from appointments.json since we're not using an API yet
      const data = await fetch('/api/appointments').then(res => res.json());
      
      // Map the data structure to match what the UI expects
      return {
        reservedSlots: data.appointments || [],
        workingHours: data.workingHours || { start: "09:00", end: "17:00", slotDuration: 60 },
        blockedDates: (data.blockedSlots || []).map(slot => slot.date),
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { 
        reservedSlots: [], 
        workingHours: { start: "09:00", end: "17:00", slotDuration: 60 },
        blockedDates: []
      };
    }
  },

  // Get available slots for a specific date
  async getAvailableSlots(date) {
    try {
      const data = await this.getData();
      const { workingHours } = data;
      
      if (!workingHours) return [];
      
      const slots = [];
      let currentTime = workingHours.start;
      
      while (currentTime < workingHours.end) {
        const isBooked = data.reservedSlots.some(
          slot => 
            slot.date === date &&
            (slot.startTime === currentTime || slot.time === currentTime) &&
            (slot.status === 'confirmed' || slot.status === 'pending')
        );

        if (!isBooked && !data.blockedDates.includes(date)) {
          slots.push(currentTime);
        }

        // Move to next slot
        const [hours, minutes] = currentTime.split(':');
        const slotDate = new Date();
        slotDate.setHours(parseInt(hours), parseInt(minutes));
        slotDate.setMinutes(slotDate.getMinutes() + workingHours.slotDuration);
        currentTime = `${slotDate.getHours().toString().padStart(2, '0')}:${slotDate.getMinutes().toString().padStart(2, '0')}`;
      }

      return slots;
    } catch (error) {
      console.error('Error fetching available slots:', error);
      return [];
    }
  },

  // Get next 20 days with availability
  async getNext20Days() {
    try {
      const data = await this.getData();
      const days = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Ensure we have the required arrays with defaults
      const blockedDates = data.blockedDates || [];
      const reservedSlots = data.reservedSlots || [];

      for (let i = 0; i < 20; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];

        const isBlocked = blockedDates.includes(dateString);
        const reservations = reservedSlots.filter(
          slot => slot.date === dateString && slot.status !== 'cancelled'
        );

        const availableSlots = await this.getAvailableSlots(dateString);

        days.push({
          date: dateString,
          isBlocked,
          hasReservations: reservations.length > 0,
          availableSlots
        });
      }

      return days;
    } catch (error) {
      console.error('Error getting next 20 days:', error);
      throw error;
    }
  },

  async getReservedSlots() {
    try {
      const data = await this.getData();
      return data.reservedSlots || [];
    } catch (error) {
      console.error('Error fetching reserved slots:', error);
      return [];
    }
  },

  async getWorkingHours() {
    try {
      const data = await this.getData();
      return data.workingHours || { start: "09:00", end: "17:00", slotDuration: 60 };
    } catch (error) {
      console.error('Error fetching working hours:', error);
      return { start: "09:00", end: "17:00", slotDuration: 60 };
    }
  },

  async getBlockedSlots() {
    try {
      const response = await fetch(`${API_URL}/blocked`);
      if (!response.ok) {
        throw new Error('Failed to fetch blocked slots');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching blocked slots:', error);
      return [];
    }
  },

  async updateBlockedSlots(slots) {
    try {
      const response = await fetch(`${API_URL}/blocked`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slots),
      });
      if (!response.ok) {
        throw new Error('Failed to update blocked slots');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating blocked slots:', error);
      throw error;
    }
  },

  // Get blocked dates
  async getBlockedDates() {
    try {
      const data = await this.getData();
      return data.blockedDates || [];
    } catch (error) {
      console.error('Error fetching blocked dates:', error);
      return [];
    }
  },

  // Add new reservation
  async addAppointment(appointmentData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) throw new Error('Failed to create appointment');
      return await response.json();
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Block a date
  async addBlockedDate(date) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'blockDate',
          date
        })
      });
      
      if (!response.ok) throw new Error('Failed to block date');
      return await response.json();
    } catch (error) {
      console.error('Error blocking date:', error);
      throw error;
    }
  },

  // Update appointment status
  async updateAppointmentStatus(id, status) {
    try {
      const response = await fetch(`${API_URL}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, status })
      });

      if (!response.ok) throw new Error('Failed to update appointment status');
      return await response.json();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  },

  // Delete appointment
  async deleteAppointment(id) {
    try {
      const response = await fetch(`${API_URL}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error('Failed to delete appointment');
      return await response.json();
    } catch (error) {
      console.error('Error blocking date:', error);
      throw error;
    }
  },

  // Remove block from a date
  async removeBlockedDate(date) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'unblockDate',
          date
        })
      });
      
      if (!response.ok) throw new Error('Failed to unblock date');
      return await response.json();
    } catch (error) {
      console.error('Error unblocking date:', error);
      throw error;
    }
  }
};