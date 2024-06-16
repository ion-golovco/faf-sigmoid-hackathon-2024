'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/input';
import { PiPaperPlaneTilt, PiTrash } from 'react-icons/pi';
import { CircularProgress } from '@nextui-org/progress';
import clsx from 'clsx';

import { SearchIcon } from '@/components/icons';
import env from '@/config/env';
import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  description: string;
  img?: string;
  buy?: string;
  price?: number;
};

const categories = [
  {
    name: 'Phones',
    id: 'phone',
  },
  {
    name: 'Laptops',
    id: 'laptop',
  },
  {
    name: 'Tablets',
    id: 'tablet',
  },
  {
    name: 'Fridge',
    id: 'refrigerator',
  },
  {
    name: 'Cars',
    id: 'car',
  },
];

type HistoryType = {
  message: string;
  products?: Product[];
  user?: string;
};

const ChatPage = () => {
  const [category, setCategory] = useState(categories[0].id as string);
  const [search, setSearch] = useState('' as string);
  const [history, setHistory] = useState([] as HistoryType[]);
  const [loading, setLoading] = useState(false);

  const resetChat = () => {
    setHistory([]);
    localStorage.removeItem('history');
  };

  const handleNewChat = async () => {
    if (!search) return;
    const newUserMessage = {
      message: search,
      user: 'user',
    };

    setHistory((prev) => [...prev, newUserMessage]);
    setLoading(true);
    try {
      const prompt = `user:${search} ${history
        .slice(-1)
        .map((item) => `${item.user}: ${item.message}`)
        .join(' ')}`;
      console.log(prompt);

      const response = await fetch(`${env.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          category,
        }),
      }).then((res) => res.json());

      setHistory((prev) => [
        ...prev,
        {
          message: response.message,
          products: response?.products,
          user: 'Kotik',
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
    <div className="h-[78dvh] flex gap-5 flex-col">
      <div className="h-full overflow-y-scroll scrollbar-hide flex flex-col gap-2">
        {history.map((item, index) => (
          <div
            key={index}
            className={`${item?.user === 'user' ? 'justify-end' : 'justify-start'} flex`}
          >
            {item?.user !== 'user' && (
              <div className="!w-16 mr-2 relative !h-16 flex-shrink-0 bg-default-100 text-default-900 flex items-center justify-center text-xl rounded-full">
                <Image
                  className="p-2"
                  alt="Informal"
                  src="/Kotik.svg"
                  fill
                />
              </div>
            )}
            <div
              className={`${
                item?.user === 'user'
                  ? 'bg-gradient-to-tr from-fuchsia-600 to-sky-600 text-white'
                  : 'bg-default-100 text-default-900'
              } p-3 rounded-2xl`}
            >
              {item.message}
              {item.products && (
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 mt-2">
                  {item.products.map((product) => (
                    <div
                      key={product.id}
                      className="lg:flex-row flex flex-col gap-2 bg-default-200 p-2 rounded-2xl hover:scale-105 transition"
                    >
                      <Link href={product.buy || '/'}>
                        <img
                          src={product.img}
                          alt={product.name}
                          className="flex-grow h-32 object-cover rounded-xl"
                        />
                      </Link>
                      <div className="h-full flex flex-col">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-sm">{product.description}</p>
                        <p className="text-sm font-semibold mt-auto">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="justify-start flex">
            <div className="bg-default-100 relative text-default-900 p-2 h-16 w-16 rounded-full animate-bounce">
              <Image
                className="p-2"
                alt="Informal"
                src="/Kotik.svg"
                fill
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 overflow-x-scroll scrollbar-hide h-12">
        <button
          className={clsx('p-1 px-2 rounded-2xl transition ')}
          onClick={resetChat}
        >
          <PiTrash className="size-6" />
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={clsx(
              'p-1 px-2 rounded-2xl transition',
              category === cat.id ? 'bg-fuchsia-600 text-white' : 'bg-default-100 text-default-900'
            )}
            onClick={() => setCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
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
              !loading && 'bg-fuchsia-600 cursor-pointer'
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
