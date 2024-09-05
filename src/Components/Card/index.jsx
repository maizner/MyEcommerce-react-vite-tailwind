const Card = (product) => {
    const { category, image, title, price } = product.data;

    return (

        <div className='bg-white cursor-pointer w-56 h-60 rounded-lg shadow-lg overflow-hidden  scale-100 hover:scale-105 transform transition-transform duration-300'> 
            <figure className='relative mb-2 w-full h-4/5 '>
                <span className='absolute left-0 top-1/4 z-10 bg-white/60 rounded-xl text-black uppercase text-[9px] m-2 py-[5px] px-3'>
                    {category}
                </span>
                <div className='flex items-center justify-center w-full h-full max-h-[192px] overflow-hidden p-8'>
                    <img className='max-w-full max-h-full object-contain' 
                    src={image} 
                    alt={title}
                    />
                </div>
                <div className='absolute right-0 top-0 flex justify-center items-center bg-white/60  w-6 h-6 rounded-full m-2 p-1'>
                    +
                </div>
                <span className='absolute right-0 bottom-[-10px] z-10 bg-white rounded-xl font-semibold text-black text-md m-2 py-[5px] px-3'>
                    <span className='mr-1'>Ars </span> {price}
                </span>

                <p className='pb-2 px-4 truncate'>

                    <span className='text-xs font-light '>{title}</span>

                </p>
            </figure>
        </div>
    );
}

export { Card }; 