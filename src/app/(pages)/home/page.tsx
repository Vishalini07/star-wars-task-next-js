"use client"
import GenericButton from '@/app/(components)/genericButton';
import Card from '@/app/(components)/genericCard';
import { extractPlanetId, getPeopleList, planetNameById } from '@/app/services/starWar.service';
import React, { useEffect, useState } from 'react'

const HomePage = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [peopleList, setPeopleList] = React.useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalData, setTotalData] = useState(0);

    const totalPages = Math.ceil(totalData / 10);


    useEffect(() => {
        fetchData();
    }, [currentPage])


    const fetchData = async () => {
        setLoading(true);

        getPeopleList(currentPage).then(async (res: any) => {

            console.log("res", res);
            setTotalData(res.count);
            if(res?.results?.length > 0) {
                const updatedPeopleList = await Promise.all(
                    res?.results?.map(async (person: any) => {
                        const planetId = extractPlanetId(person?.homeworld);
                        // console.log("planetId", planetId);
                        const homeworldName = await planetNameById(planetId);
                        return { ...person, homeworldName };
                    })
                );
                setPeopleList(updatedPeopleList);
            }
            setLoading(false);

        });
    }



    const handlePageChange = (type: string) => {
        if (type == 'next') {
            setCurrentPage((prev) => prev + 1)
        } else {
            setCurrentPage((prev) => prev - 1)

        }
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }




    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {loading
                    ? // Show Skeleton Loader
                    [...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse bg-gray-300 rounded-lg h-56 w-full"
                        ></div>
                    ))
                    : // Show Actual Data
                    peopleList?.map((item: any, index: any) => (
                        <Card key={index} cardDetails={item} id={extractPlanetId(item?.url)} />
                    ))}
            </div>

            <div className="flex justify-between mt-6 space-x-4">
                <GenericButton className='w-auto' onClick={() => handlePageChange('prev')} variant="secondary" disabled={currentPage === 1}>
                    Previous
                </GenericButton>

                <GenericButton  className='w-auto' onClick={() => handlePageChange('next')} variant="primary" disabled={currentPage >= totalPages } >
                    Next
                </GenericButton>
            </div>

        </div>
    )
}

export default HomePage


