'use client';

import { useState, useActionState, Suspense } from "react";
import { createRoomAction } from "@/src/app/create/_action/createRoomAction";
import { RoomInput } from "@/src/types";


const defualtData: RoomInput = {
    title: '',
    description: '',
    heroUrl: '',
    pricePerNight: {
      amount: 0,
      currency: 'USD'
    }

}
export default function CreateRoom() {
    const [data,setData]= useState(defualtData);
    
    const handleAction = async () => {
        return await createRoomAction(data);
    };
    
    const [state, formAction, pending] = useActionState(handleAction, null);
    return (
        <form action={formAction} className="max-w-md mx-auto p-6">
            <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">
                    Title
                </label>
                <input 
                    type="text" 
                    name="title" 
                    value={data.title} 
                    onChange={(e)=> setData(prev =>({...prev, title: e.target.value}))}
                    placeholder="A new cabin"
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />  
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">
                    Description
                </label>
                <input 
                    type="text" 
                    name="description" 
                    value={data.description} 
                    onChange={(e)=> setData(prev =>({...prev, description: e.target.value}))}
                    placeholder="Don't miss out on this one!"
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />  
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">
                    Hero URL from pshere.com
                </label>
                <input 
                    type="text" 
                    name="heroUrl" 
                    value={data.heroUrl} 
                    onChange={(e)=> setData(prev =>({...prev, heroUrl: e.target.value}))}
                    placeholder="https://c.pshere.com/photos/5f/cB/galileon_ship_moored_sail_vess"
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />  
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">
                    Price per night
                </label>
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        name="pricePerNight" 
                        value={data.pricePerNight.amount} 
                        onChange={(e)=> setData(prev =>({...prev, pricePerNight: {...prev.pricePerNight, amount: Number(e.target.value)}}))}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-700 font-medium">USD</span>
                </div>
            </div>

            </div>
            <Suspense fallback={<p className="text-center mt-4 text-gray-500">Submitting...</p>}>
                {state && <p className="text-center mt-4 text-green-600">Room created successfully!</p>}
            </Suspense>
            <button type="submit" disabled={pending} className="w-full mt-8 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition-colors">
                {pending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )
}