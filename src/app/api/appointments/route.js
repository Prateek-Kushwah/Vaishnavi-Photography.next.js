import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'appointments.json');

// Helper function to read data
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Creating new data file...');
    return {
      appointments: [],
      workingHours: {
        start: "09:00",
        end: "17:00",
        slotDuration: 60
      },
      blockedSlots: []
    };
  }
}

// Helper function to write data
async function writeData(data) {
  const dir = path.dirname(dataFilePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

// Helper function to generate all time slots for a day
function generateAllSlots(workingHours) {
  const slots = [];
  const start = new Date(`1970-01-01T${workingHours.start}`);
  const end = new Date(`1970-01-01T${workingHours.end}`);
  const duration = workingHours.slotDuration;
  
  let current = new Date(start);
  while (current < end) {
    const timeString = current.toTimeString().slice(0, 5);
    slots.push(timeString);
    current.setMinutes(current.getMinutes() + duration);
  }
  
  return slots;
}

// Helper function to get available slots for a specific date
function getAvailableSlots(date, appointments, blockedSlots, workingHours) {
  const allSlots = generateAllSlots(workingHours);
  
  // Get reserved time slots (confirmed appointments + blocked slots)
  const confirmedAppointments = appointments.filter(apt => 
    apt.date === date && apt.status === 'confirmed'
  );
  
  const dateBlockedSlots = blockedSlots.filter(slot => slot.date === date);
  
  const reservedTimes = [
    ...confirmedAppointments.map(apt => apt.startTime),
    ...dateBlockedSlots.map(slot => slot.startTime)
  ];
  
  // Filter out reserved slots
  return allSlots.filter(slot => !reservedTimes.includes(slot));
}

// Helper function to generate next 20 days
function generateNext20Days() {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    days.push(dateString);
  }
  
  return days;
}

// GET - Fetch all data or available slots
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const action = searchParams.get('action');
    
    const data = await readData();
    
    if (date) {
      const availableSlots = getAvailableSlots(
        date, 
        data.appointments || [], 
        data.blockedSlots || [], 
        data.workingHours
      );
      return new Response(JSON.stringify({ availableSlots }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (action === 'next20days') {
      const next20Days = generateNext20Days();
      const daysWithAvailability = next20Days.map(date => {
        const availableSlots = getAvailableSlots(
          date, 
          data.appointments || [], 
          data.blockedSlots || [], 
          data.workingHours
        );
        
        const dayBlockedSlots = (data.blockedSlots || []).filter(slot => slot.date === date);
        
        return {
          date,
          availableSlots,
          blockedSlots: dayBlockedSlots,
          allSlots: generateAllSlots(data.workingHours)
        };
      });
      
      return new Response(JSON.stringify({ days: daysWithAvailability }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST - Add new appointment (always with status pending)
export async function POST(request) {
  try {
    const newAppointment = await request.json();
    const data = await readData();
    
    const appointmentWithId = {
      ...newAppointment,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    if (!data.appointments) data.appointments = [];
    data.appointments.push(appointmentWithId);
    await writeData(data);
    
    return new Response(JSON.stringify({ success: true, appointment: appointmentWithId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create appointment', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT - Update appointment status or add blocked slot
export async function PUT(request) {
  try {
    const updateData = await request.json();
    const data = await readData();
    
    if (updateData.appointmentId && updateData.status) {
      const appointment = data.appointments.find(apt => apt.id === updateData.appointmentId);
      if (appointment) {
        appointment.status = updateData.status;
      }
    } else if (updateData.blockedSlots) {
      data.blockedSlots = updateData.blockedSlots;
    }
    
    await writeData(data);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update data', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE - Remove appointment or blocked slot
export async function DELETE(request) {
  try {
    const { id, blockedSlotId } = await request.json();
    const data = await readData();
    
    if (id) {
      data.appointments = data.appointments.filter(apt => apt.id !== id);
    } else if (blockedSlotId) {
      data.blockedSlots = data.blockedSlots.filter(slot => slot.id !== blockedSlotId);
    }
    
    await writeData(data);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete data', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}