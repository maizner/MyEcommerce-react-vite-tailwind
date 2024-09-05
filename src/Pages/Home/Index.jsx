import React from 'react';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { Card } from '../../Components/Card';

function Home() {

 
    const { items } = React.useContext(CartContext); 

    

    return (
        <Layout >
        
        <p>Home Sweet Home</p>
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {
            items?.map(item => {
                return < Card key={item.id} data={item} />

            })
        }
        </div>
        
        
        </Layout>
    )
}

export {Home};
