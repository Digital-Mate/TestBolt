const API_URL = 'http://localhost:3000/api';

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  };
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid credentials');
    }

    return response.json();
  } catch (error) {
    throw new Error('Invalid credentials');
  }
}

export async function getProfile(token: string) {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}