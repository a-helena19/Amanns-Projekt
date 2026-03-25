import { Metadata } from "next";
import { API_URL } from '@/src/config';
import { Collection, Room } from '@/src/types';
import RoomList from '@/src/components/RoomList';
import Pagination from '@/src/components/Pagination';
import PageInfo from '@/src/components/PageInfo';
import SortSelect from '@/src/components/SortSelect';
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {title: 'Rooms'}; 

type Props = {
    searchParams: Promise<{ page?: string; sort?: string }>;
};

export default async function RoomsPage({ searchParams }: Props) {
    const { page, sort } = await searchParams;
    let currentPage = Math.max(1, parseInt(page ?? '1', 10));
    const currentSort = sort || 'createdAt';
    const apiPage = currentPage - 1;

    const res = await fetch (`${API_URL}/rooms?page=${apiPage}&size=9&sort=${currentSort}`, {cache: 'no-store'});
    if (!res.ok) throw new Error('Failed to fetch rooms');
    const data = (await res.json()) as Collection<Room>;

    if (currentPage > data.page.totalPages) {
        currentPage = data.page.totalPages;
        redirect (`/rooms?page=${currentPage}&sort=${currentSort}`);
    };

    return (
        <div> 
            <div className="flex justify-between items-center mb-6">
                <PageInfo
                    currentPage={currentPage}
                    totalPages={data.page.totalPages}
                    totalElements={data.page.totalElements}
                />
                <Suspense fallback={<span className="text-sm text-gray-400">Loading...</span>}>
                    <SortSelect />
                </Suspense>
            </div>
            <RoomList rooms={data.nodes} />
            <Pagination currentPage={currentPage} totalPages={data.page.totalPages} sort={currentSort} />
        </div>
    )
}