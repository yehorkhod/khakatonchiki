type LoginFormData = {
  email: string;
  password: string;
};

export async function logIn(data: LoginFormData) {
  const response = await fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      remember: true,
    }),
  });

  if (!response.ok) {
    throw new Error('something went wrong');
  }

  console.log(response);

  return response.json();
}

export async function logOut() {
  const response = await fetch('http://localhost:8000/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  console.log(response);

  if (response.ok === false) {
    throw new Error('something went wrong!!!!!!')
  }

  console.log(response);

  return response.json();
}
