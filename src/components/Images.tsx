'use client';

import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../../lib/fetchImages";

type ImageType = {
    name: string;
    url: string;
}

const Images = () => {

    const { data: images, error, isLoading, isValidating, mutate: refreshImages } = useSWR("/api/images", fetchImages, {
        revalidateOnFocus: false,
    });

    console.log("images", images)

  return (
    <div className="">
        <div>
            {images?.map((image: ImageType) => (
                <div key={image.name} className="relative w-64 h-64">
                    <Image src={image.url} 
                    alt={image.name}
                    height={800}
                    width={800}
                    className="w-full rounded-md shadow-2xl drop-shadow-lg -z-10"
                    />
                </div>
            ))}
        </div>
    </div>
    );
};

export default Images;
