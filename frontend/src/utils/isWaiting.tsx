export const waitingProduct = <div className="w-full h-full !flex flex-wrap justify-center  px-1 gap-4 py-3 font-lato text-sm" >
    {[null, null].map((_, index) => (

        <div key={index} className="!flex hover:shadow-lightOn duration-300  flex-col
        flex-1 min-w-[165px] max-w-[250px] pb-2 text-white md bg-primary-500 p-1 gap-2 rounded-lg">

            <span className="animate-pulse bg-gray-600 w-full h-44 rounded-t-xl" />
            <span className="animate-pulse rounded-md bg-gray-600 w-full h-[40px] mt-2" />

            <div className="w-full flex justify-between mt-auto items-center">
                <span className="h-[20px] rounded-md animate-pulse bg-gray-600 px-7 py-3" />
                <span className="h-[20px] rounded-md animate-pulse bg-gray-600  px-6 py-4" />
            </div>


        </div>

    ))}
</div >
