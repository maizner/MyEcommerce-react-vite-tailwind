import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { ProductCard } from '../../Components/ProductCard';

function Home() {

    const { items, setSearchByTitle } = useContext(CartContext); 

    return (
        <Layout >   
            <div className='w-full flex items-start text-left mb-4 '>
               <Link className='text-sm font-semibold border-r-2 px-2 border-black '> item </Link>
               <Link className='text-sm font-semibold border-r-2 px-2 border-black '> item </Link>
               <Link className='text-sm font-semibold px-2 last '> item </Link>
            </div>
            <div>
                <input 
                type='Search' 
                placeholder='Search a product'
                className='text-md font-normal border px-4 py-2 border-black rounded-lg m-2 mb-4 min-w-72 focus:outline-slate-900'
                onChange={(e) => setSearchByTitle(e.target.value)}
                />
            </div>
        
            <div className='w-full h-[260px] bg-slate-100 flex items-center justify-center mb-4 '>
                <h1 className='text-xl text-center font-semibold'>Banner Hero Section</h1>
            </div>

            <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
                {
                    items?.map(item => {
                        return < ProductCard key={item.id} data={item} />
                    })
                }
            </div>

            
        
        </Layout>
    )
}

export {Home};
