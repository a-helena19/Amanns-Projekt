import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import CreateRoom from "@/src/components/CreateRoom";

export const metadata: Metadata = {title: 'Create Room'}; 

export default function createPage() {
    return (
        <div>
            <CreateRoom/>
        </div>
        
    )
}