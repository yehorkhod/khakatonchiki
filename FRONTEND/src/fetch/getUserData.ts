import { User } from "../types/User";

export async function getMyData(): Promise<User | null> {
  try {
    const response = await fetch('http://localhost:8000/api/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    console.log(response, 'blaaaa');

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await fetch('/api/users/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user data by ID:', error);
    return null;
  }
}

