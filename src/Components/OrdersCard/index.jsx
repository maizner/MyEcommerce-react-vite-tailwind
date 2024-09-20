import PropTypes from 'prop-types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const OrdersCard = ({ totalPrice, totalProducts, date  }) => {



    return (
        <div className='w-full max-w-lg border border-black bg-white p-4 m-1 rounded-lg min-w-[350px] '>
            <div className='flex justify-between items-center'>
                
                <div className='text-md text-black mr-2 flex flex-col justify-between items-center'>
                    <p className=' mr-2'>
                    <span className='text-gray-500 text-sm font-normal mr-2'>{typeof date === 'string' ? date : 'Invalid date'}</span>
                    </p>
                    <p className='text-md text-black mr-2 flex justify-between items-center'>
                        <span className='font-medium mr-2'>{typeof totalProducts === 'number' ? totalProducts : 'Invalid product count'}</span>
                        <span className='font-medium mr-2'>Articles</span> 
                    </p>
                </div>
                <p className=' text-black flex justify-center items-center gap-2'>
                    <span className='text-xl font-bold '>
                       <span className='text-md font-bold'>$</span> {typeof totalPrice === 'number' ? totalPrice : 'Invalid price'}
                    </span>
                    <ChevronRightIcon className='w-4 h-4 text-black' />

                </p>
            </div>
        </div>
    );
};

// Prop validation
OrdersCard.propTypes = {
    index: PropTypes.number.isRequired, // Debe ser un string
    date: PropTypes.string.isRequired, // Debe ser un string
    totalPrice: PropTypes.number.isRequired, // Debe ser un número
    totalProducts: PropTypes.number.isRequired, // Debe ser un número
};

export { OrdersCard };
