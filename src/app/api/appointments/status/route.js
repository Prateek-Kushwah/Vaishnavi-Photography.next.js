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
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await readData();
    
    // Find and update the appointment
    const appointmentIndex = data.appointments.findIndex(apt => apt.id === id);
    
    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Update the status
    data.appointments[appointmentIndex].status = status;
    
    // Save the updated data
    await writeData(data);

    return NextResponse.json({
      message: 'Appointment status updated successfully',
      appointment: data.appointments[appointmentIndex]
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment status' },
      { status: 500 }
    );
  }
}