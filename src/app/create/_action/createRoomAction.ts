'use server';

import { RoomInput } from "@/src/types";

export async function createRoomAction(data: RoomInput) {
    
    console.log(data);
    return Promise.resolve(setTimeout(() => {
        {[]}
    }, 3000));
}