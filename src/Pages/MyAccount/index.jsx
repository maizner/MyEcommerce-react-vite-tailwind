import { useContext } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { EditForm } from '../../Components/EditForm';

function MyAccount() {

    const { view,setView, account } = useContext(CartContext);

    const renderUserData = () => (
        <div>

          
           <div className='flex flex-col w-full max-w-96 px-6 py-10 rounded-lg  gap-4'>
                <div className='flex flex-row items-center gap-1'>
                        
                    <span className='font-light text-sm'>
                        Your Name:
                    </span>
                    <span className='rounded-lg text-md p-2 px-1'/>
                        {account?.name || ''}
                   <span/>

                </div>
                <div className='flex flex-row items-center gap-1'>
                    <span className='font-light text-sm'>
                    Your Email:
                    </span>
                    <span className='rounded-lg text-md p-2 px-1'/>
                    {account?.email || ''}
                   <span/>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <span className='font-light text-sm'>
                    Your Password:
                    </span>
                    <span className='rounded-lg text-md p-2 px-1'/>
                    {account?.password || ''}
                   <span/>
                </div>
                
                <button
                    type='submit'
                    className='flex flex-row items-center justify-between gap-4 text-white w-full rounded-lg px-4 py-3 mt-4 font-semibold text-md bg-green-500 hover:bg-green-500/70 text-md transition-colors duration-300 ease-in-out'
                    onClick={() => setView('edit-user-info')}>
                    Edit 
                    < PencilSquareIcon className='w-5 h-5'/>
                </button>
                         
                        
           </div>
                  
        </div>
    );

    const renderEditUserInfo = () => (
        <EditForm />
    );

    const renderView = () => (view === 'edit-user-info' ? renderEditUserInfo() : renderUserData());
    return (
        <Layout>
            <h1 className='font-medium text-xl text-center mb-6 w-full capitalize mt-8'>My Account</h1>
            {renderView()}
        </Layout>
    );
}

export { MyAccount };
