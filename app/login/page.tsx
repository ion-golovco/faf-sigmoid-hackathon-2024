'use client';

import env from '@/config/env';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (data: React.ChangeEvent<HTMLInputElement>, property: string) => {
    setUserData({
      ...userData,
      [property]: data.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    const isValid =
      userData.email &&
      userData.password &&
      userData.email.includes('@') &&
      userData.password.length >= 6;
    if (!isValid) return;
    try {
      const response = await fetch(`${env.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.email) {
        localStorage.setItem('email', data.email);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full flex-col h-[60dvh]">
      <div className="w-96 flex justify-center flex-col gap-4 text-center">
        <h1 className="text-2xl">Login</h1>
        <Input
          name="email"
          onChange={(d) => handleChange(d, 'email')}
          value={userData.email}
          placeholder="Email"
        />
        <Input
          name="password"
          onChange={(d) => handleChange(d, 'password')}
          type="password"
          value={userData.password}
          placeholder="Password"
        />
        <Button
          onClick={handleSubmit}
          className="bg-sky-500 text-white"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Login;
