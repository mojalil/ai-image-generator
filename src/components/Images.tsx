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
        <button
        onClick={() => refreshImages(images)}
        className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 mx-1 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20"
        > 
            {!isLoading && isValidating ? "Refresh..." : "Refresh Images"}
        </button>
        {
            isLoading && (<p className="text-center animate-pulse pb-7 font-extralight">Loading <span className="text-violet-400">AI</span> Generated Images..</p>)
        }
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
            {images?.map((image: ImageType, i: number) => (
                <div key={image.name} className={`relative cursor-help 
                ${
                    i === 0 && "md:col-span-2 row-span-2" 
                } hover:scale-[103%] transition-transform duration-200 ease-in-out`}>
                    {/* Create a white div that when hovered it appears */}
                    <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
                        <p className="text-center font-light text-lg p-5">
                            {image.name.split("_").shift()?.toString().split(".").shift()}
                        </p>

                    </div>

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
