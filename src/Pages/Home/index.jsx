import { useContext} from 'react';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { ProductCard } from '../../Components/ProductCard';



function Home() {
    const { items, searchByTitle, filteredItems, searchByCategory, setSearchByCategory, getUniqueCategories } = useContext(CartContext); 

    const renderView = () => {
        const products = searchByTitle?.length > 0 || searchByCategory?.length > 0 ? filteredItems : items;

        if (products?.length > 0) {
            return (
                <div className='relative w-full'>
                    <div className='absolute top-[-50px] left-0 w-full '>
                        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-rows-auto w-full mx-auto lg:max-w-screen-lg'>
                            {products.map(item => (
                                <ProductCard key={item.id} data={item} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div className='text-md text-black text-center w-full'>No items found :(</div>;
        }
    }

    return (
        <Layout>   
            {/* Segunda navegación  */}
            <div className='second-nav w-full flex justify-start items-end'>
                {/* Combo de categorías  */}
                <div className='mb-1'>
                    <select 
                        className='border p-2 rounded-lg capitalize text-sm focus:outline-0' 
                        value={searchByCategory} 
                        onChange={(e) => setSearchByCategory(e.target.value)}
                    >
                        <option value=''>All Categories</option>
                        {getUniqueCategories().map((category, index) => (
                            <option key={index} value={category}>{category.replace(/'s clothing/, '').trim()}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {/*Banner Hero*/}
            <div className='bg-[url("/images/bg-3.jpg")] bg-cover bg-center w-full h-[250px] bg-slate-100 flex items-center justify-center mb-4 rounded-lg border border-gray-300'>  
            </div>

            {renderView()}
        </Layout>
    );
}

export { Home };

