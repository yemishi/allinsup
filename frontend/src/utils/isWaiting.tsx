export const waitingProduct = <div className={`w-full h-full !flex flex-wrap min-h-[290px] justify-between px-1 gap-2  py-3 font-lato text-sm `} >
    {[null, null].map((_, index) => (

        <div key={index} style={{ maxWidth: '370px', width: '160px' }} className="!flex flex-col shadow-xl  h-[290px] w-[180px] text-white bg-primary-500 p-1 gap-2 rounded-lg">
            <span className="animate-pulse bg-gray-600 w-full h-[162px] rounded-t-xl" />
            <span className="animate-pulse rounded-md bg-gray-600 w-full h-[40px] mt-2" />

            <div className="w-full flex justify-between mt-auto items-center">
                <span className="h-[20px] rounded-md animate-pulse bg-gray-600 px-7 py-3" />
                <span className="h-[20px] rounded-md animate-pulse bg-gray-600  px-6 py-4" />
            </div>


        </div>

    ))}
</div >
