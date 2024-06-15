import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import React from 'react';

const Register = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col h-[60dvh]">
      <div className="w-96 flex justify-center flex-col gap-4 text-center">
        <h1 className="text-2xl">Register</h1>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Input placeholder="Confirm password" />
        <Button color="primary">Continue</Button>
      </div>
    </div>
  );
};

export default Register;
