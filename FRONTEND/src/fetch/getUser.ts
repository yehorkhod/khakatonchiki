import { User } from "../types/User";

export async function getUser(userId: string): Promise<User> {
  //fetch using userId
  const response = await fetch('/profile.json');
  return response.json();
}

export async function getUserdata(id: string): Promise<User> {
  const response = await fetch('userProfile.json');
  return response.json();
}

// async function getUser(userId: string) {
//   try {
//     const response = await fetch(`/profile.json`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Failed to fetch user data');
//   }
// }
