'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/input';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import { CircularProgress } from '@nextui-org/progress';
import clsx from 'clsx';

import { SearchIcon } from '@/components/icons';
import env from '@/config/env';

type HistoryType = {
  message: string;
  user?: string;
};

const ChatPage = () => {
  const [search, setSearch] = useState('' as string);
  const [history, setHistory] = useState([] as HistoryType[]);
  const [loading, setLoading] = useState(false);

  const handleNewChat = async () => {
    if (!search) return;
    const newUserMessage = {
      message: search,
      user: 'user',
    };

    setHistory((prev) => [...prev, newUserMessage]);
    setLoading(true);
    try {
      const newBotMessage = await fetch(`${env.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${history.slice(1).slice(-3).map((m)=>m.message)} ${search}`,
        }),
      }).then((res) => res.json());

      setHistory((prev) => [
        ...prev,
        {
          message: newBotMessage,
          user: 'bot',
        },
      ]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setSearch('');
  };

  useEffect(() => {
    if (history.length !== 0) {
      localStorage.setItem('history', JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    const localHistory = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory([...localHistory]);
  }, []);

  return (
    <div className="h-[75dvh] flex gap-5 flex-col">
      <div className="h-full overflow-y-scroll scrollbar-hide flex flex-col gap-2">
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
        disabled={loading}
        endContent={
          <button
            className={clsx(
              'p-2 text-white rounded-2xl transition',
              loading && 'cursor-not-allowed bg-default-200 text-default-400',
              !loading && 'bg-gradient-to-tr from-fuchsia-600 to-sky-600 cursor-pointer'
            )}
            disabled={loading}
            onClick={handleNewChat}
          >
            <PiPaperPlaneTilt className="size-6" />
          </button>
        }
        labelPlacement="outside"
        placeholder="Ask something..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={search}
        onValueChange={setSearch}
      />
    </div>
  );
};

export default ChatPage;
