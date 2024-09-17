import { useContext } from 'react';
import PropTypes from 'prop-types';  // Asegúrate de importar PropTypes
import { CartContext } from '../../Context';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const OrderCard = ({ id, image, title, price, quantity = 0 }) => {
    console.log(quantity )
  // Consumiendo contexto
  const { removeProductFromCart, addProductToCart, decrementProductQuantity } = useContext(CartContext);

  return (
    <div className='flex flex-col items-center border-b p-2 border-b-slate-300 w-full'>
      <div className='flex justify-between items-center w-full h-full'>
        <div className='flex items-center gap-2 w-full'>
          <div className='flex flex-col items-center gap-2'>
            <figure className='flex items-center justify-center w-[60px] min-w-[60px] h-[60px] overflow-hidden mx-auto rounded-lg border'>
              <img className='w-full h-auto rounded-lg object-cover object-top max-w-[52px] p-2' src={image} alt={title} />
            </figure>
          </div>
          <div className='flex flex-col items-start gap-0 w-full h-full px-1'>
            <p className='text-sm font-normal pr-2 overflow-hidden text-ellipsis line-clamp-2 max-h-[4.5em] leading-tight mb-1 text-black'>{title}</p>
            <div className='flex flex-row items-center justify-between gap-2 w-full p-1'>
              <div className='flex flex-row items-center justify-center text-md font-semibold text-black'>
                <span
                  className='m-1 p-1 bg-green-300 hover:bg-green-500 rounded-sm cursor-pointer transition-colors duration-300 ease-in-out'
                  onClick={() => decrementProductQuantity(id)}
                >
                  <MinusIcon className='w-3 h-3' />
                </span>
                <p className='text-xs text-black m-1'>{quantity}</p>
                <span
                  className='m-1 p-1 bg-green-300 hover:bg-green-500 rounded-sm cursor-pointer transition-colors duration-300 ease-in-out'
                  onClick={() => addProductToCart({ id, image, title, price, quantity })}
                >
                  <PlusIcon className='w-3 h-3' />
                </span>
              </div>
              <p className='text-sm font-medium'>${(price * quantity).toFixed(2)}</p>
              <TrashIcon className='h-5 w-5 text-black cursor-pointer hover:text-red-500 transition-background duration-300 ease-in-out' onClick={() => removeProductFromCart(id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Validación de las props
OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number // No es requerido si puede ser undefined
};

export { OrderCard };
