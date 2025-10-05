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
      // File doesn't exist, return default structure
      return {
        appointments: [],
        blockedSlots: [],
        workingHours: { start: "09:00", end: "17:00", slotDuration: 60 }
      };
    }
    console.error('Error reading data file:', error);
    throw new Error('Failed to read data');
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing data file:', error);
    throw new Error('Failed to write data');
  }
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.blockedSlots || []);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newBlockedSlots = await request.json();
    const data = await readData();
    data.blockedSlots = newBlockedSlots;
    await writeData(data);
    return NextResponse.json({ message: 'Blocked slots updated successfully', blockedSlots: data.blockedSlots });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
