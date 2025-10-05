// Data service functions for appointments
const API_URL = '/api/appointments';

export const dataService = {
  // Fetch all data
  async getData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      
      // Ensure all required properties exist with defaults
      return {
        reservedSlots: data.reservedSlots || [],
        workingHours: data.workingHours || { start: "09:00", end: "17:00", slotDuration: 60 },
        blockedDates: data.blockedDates || [],
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
            slot.startTime === currentTime &&
            slot.status !== 'cancelled'
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

  // Get next 20 days with availability
  async getNext20Days() {
    try {
      const baseData = await this.getData();
      const days = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Ensure we have the required arrays with defaults if undefined
      const blockedDates = baseData.blockedDates || [];
      const reservedSlots = baseData.reservedSlots || [];

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
      console.error('Error fetching next 20 days:', error);
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
  },

  // Add new reservation with status pending
  async addReservation(reservationData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      
      if (!response.ok) throw new Error('Failed to create reservation');
      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  // Update reservation status
  async updateReservationStatus(id, status) {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationId: id, status }),
      });
      
      if (!response.ok) throw new Error('Failed to update reservation');
      return await response.json();
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  },

  // Remove reservation
  async removeReservation(id) {
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) throw new Error('Failed to delete reservation');
      return await response.json();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  },

  // Add blocked date
  async addBlockedDate(date) {
    try {
      const data = await this.getData();
      const updatedBlockedDates = [...new Set([...data.blockedDates, date])];
      
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blockedDates: updatedBlockedDates }),
      });
      
      if (!response.ok) throw new Error('Failed to add blocked date');
      return await response.json();
    } catch (error) {
      console.error('Error adding blocked date:', error);
      throw error;
    }
  },

  // Remove blocked date
  async removeBlockedDate(date) {
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blockedDate: date }),
      });
      
      if (!response.ok) throw new Error('Failed to remove blocked date');
      return await response.json();
    } catch (error) {
      console.error('Error removing blocked date:', error);
      throw error;
    }
  },

  // Get all reserved slots
  async getReservedSlots() {
    const data = await this.getData();
    return data.reservedSlots || [];
  },

  // Get blocked dates
  async getBlockedDates() {
    const data = await this.getData();
    return data.blockedDates || [];
  },

  // Get working hours
  async getWorkingHours() {
    const data = await this.getData();
    return data.workingHours || { start: "09:00", end: "17:00", slotDuration: 60 };
  }
};