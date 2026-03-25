'use client';

import { useState, useActionState, useRef, useEffect } from 'react';
import { createRoomAction } from '@/src/app/create/_action/createRoomAction';

export default function CreateRoom() {
  const [fields, setFields] = useState({
    title: '',
    description: '',
    heroUrl: '',
    pricePerNight: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(createRoomAction, null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state]);

  return (
    <form action={formAction} className="max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6">Add cabin</h1>

      <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-semibold text-gray-800">
            Title
          </label>
          <input
            ref={inputRef}
            id="title"
            type="text"
            name="title"
            required
            disabled={pending}
            value={fields.title}
            onChange={(e) => setFields((p) => ({ ...p, title: e.target.value }))}
            placeholder="A new cabin"
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-semibold text-gray-800">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            required
            disabled={pending}
            value={fields.description}
            onChange={(e) => setFields((p) => ({ ...p, description: e.target.value }))}
            placeholder="Don't miss out on this one!"
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="heroUrl" className="text-sm font-semibold text-gray-800">
            Hero URL from pxhere.com
          </label>
          <input
            id="heroUrl"
            type="text"
            name="heroUrl"
            required
            disabled={pending}
            value={fields.heroUrl}
            onChange={(e) => setFields((p) => ({ ...p, heroUrl: e.target.value }))}
            placeholder="https://c.pxhere.com/photos/..."
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="pricePerNight" className="text-sm font-semibold text-gray-800 text-cyan-600">
            Price per night
          </label>
          <div className="flex gap-2 items-center">
            <input
              id="pricePerNight"
              type="number"
              name="pricePerNight"
              required
              disabled={pending}
              min={1}
              value={fields.pricePerNight || ''}
              onChange={(e) => setFields((p) => ({ ...p, pricePerNight: Number(e.target.value) }))}
              className="w-28 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
            />
            <span className="px-3 py-2 border border-gray-300 rounded text-gray-700 bg-white">USD</span>
            <button
              type="submit"
              disabled={pending}
              className="ml-auto bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              {pending ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

      </div>

      {state?.error && (
        <p className="mt-4 text-sm text-red-600 flex items-center gap-1">
          ⚠️ {state.error}
        </p>
      )}
    </form>
  );
}