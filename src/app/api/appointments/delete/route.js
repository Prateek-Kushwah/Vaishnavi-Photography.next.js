import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const jsonFilePath = path.resolve(process.cwd(), 'src/data/appointments.json');

async function readData() {
  try {
    const fileData = await fs.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { appointments: [], blockedSlots: [], workingHours: { start: "09:00", end: "17:00", slotDuration: 60 } };
    }
    throw error;
  }
}

async function writeData(data) {
  await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing appointment ID' },
        { status: 400 }
      );
    }

    const data = await readData();
    
    // Find the appointment index
    const appointmentIndex = data.appointments.findIndex(apt => apt.id === id);
    
    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Remove the appointment
    const deletedAppointment = data.appointments.splice(appointmentIndex, 1)[0];
    
    // Save the updated data
    await writeData(data);

    return NextResponse.json({
      message: 'Appointment deleted successfully',
      appointment: deletedAppointment
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}