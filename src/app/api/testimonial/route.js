import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'testimonial.json');

// Helper function to read data
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Creating new data file...');
    return []; // Return empty array for testimonials
  }
}

// Helper function to write data
async function writeData(data) {
  try {
    const dir = path.dirname(dataFilePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const data = await readData();
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

export async function POST(request) {
  try {
    const newReview = await request.json();
    const data = await readData();

    const reviewWithId = {
      ...newReview,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Ensure data is an array
    const updatedData = Array.isArray(data) ? data : [];
    updatedData.push(reviewWithId);
    
    await writeData(updatedData);

    return new Response(JSON.stringify({ success: true, id: reviewWithId.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create review', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  try {
    const updateData = await request.json();
    const data = await readData();

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format');
    }

    const updatedData = data.map(review => {
      if (review.id === updateData.reviewId) {
        return { ...review, ...updateData.updates };
      }
      return review;
    });

    await writeData(updatedData);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update review', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const data = await readData();

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format');
    }

    const filteredData = data.filter(review => review.id !== id);
    await writeData(filteredData);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete review', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}