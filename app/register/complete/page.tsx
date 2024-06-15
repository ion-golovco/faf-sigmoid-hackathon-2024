import React from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

const CompleteAccount = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col h-[60dvh]">
      <div className="w-96 flex justify-center flex-col gap-4 text-center">
        <h1 className="text-2xl">Complete your account</h1>
        <Input placeholder="Username" />
        <Input placeholder="What are you interested in?" />
        <Button color="primary">Create account</Button>
      </div>
    </div>
  );
};

export default CompleteAccount;
