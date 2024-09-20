import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { ProductCard } from '../../Components/ProductCard';
import {  ChevronRightIcon } from '@heroicons/react/24/outline';


function Home() {

    const { items, searchByTitle, filteredItems, searchByCategory, setSearchByCategory, getUniqueCategories} = useContext(CartContext); 

    const renderView = () => {
        if ( searchByTitle?.length > 0 || searchByCategory?.length > 0 ){
            if ( filteredItems?.length > 0 ){
                return (
                    <div className=' relative w-full md:min-w-screen-md lg:min-w-screen-lg'>
                        <div className='absolute top-[-50px] left-0 w-full '>
                            <div className='grid gap-4 grid-cols-4 w-full md:min-w-screen-md lg:max-w-screen-lg lg:min-w-screen-lg mx-auto '>
                               {
                                 filteredItems?.map(item => {
                                    return < ProductCard key={item.id} data={item} />
                                })
                               }
                            </div>
                        </div>
                    </div>
                );
            } else {
                return <div className='text-md text-black text-center w-full'>No items found :( </div>;
            }

          
        }else {
            return (
                <div className=' relative w-full md:min-w-screen-md lg:min-w-screen-lg'>
                    <div className='absolute top-[-50px] left-0 w-full '>
                        <div className='grid gap-4 grid-cols-4 w-full md:min-w-screen-md lg:max-w-screen-lg lg:min-w-screen-lg mx-auto '>
                            {
                                items?.map(item => {
                                return < ProductCard key={item.id} data={item} />
                                })
                            }
                        </div>
                    </div>
                </div>
            );
           
        }
    }

    return (
        <Layout >   
            {/* Segunda navegación  */}
            <div className='second-nav w-full flex justify-between items-end'>
                {/* Breadcrumbs  */}
                <div className='w-full flex items-start justify-start text-left py-2 gap-0'>
                    <Link className='text-sm font-semibold flex items-center'> 
                        item 
                        < ChevronRightIcon className='w-3 h-3 m-1'/> 
                    </Link>
                    <Link className='text-sm font-semibold flex items-center'> 
                        item  
                        < ChevronRightIcon className='w-3 h-3 m-1'/> 
                    </Link>
                    <Link className='text-sm font-semibold flex items-center'> 
                        item 
                        < ChevronRightIcon className='w-3 h-3 m-1'/> 
                    </Link>
                </div>
                {/* Combo de categorías  */}
                <div className='mb-1'>
                    <select 
                        className='border p-2 rounded-lg capitalize text-sm' 
                        value={searchByCategory} 
                        onChange={(e) => setSearchByCategory(e.target.value)}
                    >
                        <option value=''>All Categories</option>
                        {getUniqueCategories().map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
             {/*Banner Hero*/}
            <div className='bg-[url("/images/bg-2.png")] bg-cover bg-center w-full h-[250px] bg-slate-100 flex items-center justify-center mb-4 rounded-lg border border-gray-300'>  
            </div>

            {renderView()}
          
        </Layout>
    )
}

export {Home};
