// app/api/admin/auth/route.js
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validate against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return Response.json(
        { success: false, error: 'Admin credentials not configured' },
        { status: 500 }
      );
    }

    if (username === adminUsername && password === adminPassword) {
      return Response.json({ success: true });
    } else {
      return Response.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return Response.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}