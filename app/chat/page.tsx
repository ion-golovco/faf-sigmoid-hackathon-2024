'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { CircularProgress } from '@nextui-org/progress';

import { SearchIcon } from '@/components/icons';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';

type HistoryType = {
  message: string;
  user?: string;
};

const ChatPage = () => {
  const [search, setSearch] = useState('' as string);
  const [history, setHistory] = useState([] as HistoryType[]);
  const [loading, setLoading] = useState(false);

  const handleNewChat = () => {
    if (!search) return;
    const newUserMessage = {
      message: search,
      user: 'user',
    };
    setHistory((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setTimeout(() => {
      const newBotMessage = {
        message: 'I am a bot',
        user: 'bot',
      };
      setHistory((prev) => [...prev, newBotMessage]);
      setLoading(false);
    }, 1000);
    setSearch('');
  };

  return (
    <div className="h-[75dvh] flex gap-5 flex-col">
      <div className="h-full overflow-y-scroll scrollbar-hide flex flex-col gap-4">
        {history.map((item, index) => (
          <div
            key={index}
            className={`${item?.user === 'user' ? 'justify-end' : 'justify-start'} flex`}
          >
            <div
              className={`${
                item?.user === 'user' ? 'bg-sky-500 text-white' : 'bg-default-100 text-default-900'
              } p-3 rounded-2xl`}
            >
              {item.message}
            </div>
          </div>
        ))}
        {loading && (
          <div className="justify-start flex">
            <div className="bg-default-100 text-default-900 p-3 rounded-2xl">
              <CircularProgress size="sm" />
            </div>
          </div>
        )}
      </div>
      <Input
        classNames={{
          inputWrapper: 'bg-default-100 h-14',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        value={search}
        disabled={loading}
        onValueChange={setSearch}
        placeholder="Ask something..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        endContent={
          <button
            disabled={loading}
            onClick={handleNewChat}
            className={clsx(
              'p-2 text-white rounded-2xl transition',
              loading && 'cursor-not-allowed bg-default-200 text-default-400',
              !loading && 'bg-gradient-to-tr from-lime-600 to-sky-600 cursor-pointer'
            )}
          >
            <PiPaperPlaneTilt className="size-6" />
          </button>
        }
        type="search"
      />
    </div>
  );
};

export default ChatPage;
