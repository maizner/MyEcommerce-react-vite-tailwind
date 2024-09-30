import { useContext, useState, useRef } from 'react';
import { CartContext } from '../../Context';
import { useNavigate } from 'react-router-dom'; 
import { Layout } from '../../Components/Layout';

function SignIn() {

  const { account, setSignOut, setAccount} = useContext(CartContext);
  const [view, setView] = useState('user-info');
 
//   const noAccount = account ? Object.keys(account).length === 0 : true;
  const form = useRef(null);
  const navigate = useNavigate(); 

  const handleSignIn = () => {
    setSignOut(false);
    navigate('/');
  };

  const createAnAccount = () => {
    const currentData = new FormData(form.current);
    const userData = {
      name: currentData.get('name'),
      email: currentData.get('email'),
      password: currentData.get('password'),
    };
    console.log('create account with: ', userData);

    setAccount(userData);

   
    setTimeout(() => {
      handleSignIn();
    }, 100); 
  };

  const renderLogin = () => (
    <div className='flex flex-col w-80'>
    
        <form ref={form} className='flex flex-col w-full max-w-96  px-6 py-10 rounded-lg border border-black gap-2'>
            <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-light text-sm'>
                    Your Email:
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={account.email}
                    placeholder="hi@helloworld.com"
                    className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                    />
            </div>
            
            <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font-light text-sm'>
                    Your password:
                    </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    defaultValue={account.password}
                    placeholder="******"
                    className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                    />
            </div>
            <button
                className=' text-white w-full rounded-lg py-3 mt-4 font-semibold text-md bg-green-500 hover:bg-green-500/70 text-md transition-colors duration-300 ease-in-out'
                // disabled={noAccount}
                onClick={handleSignIn}>
                Log In
            </button>
               
            <div className='text-center text-sm font-light' >
                Don&apos;t have an account yet? 
                <button className='underline underline-offset-4 font-medium ml-2 text-green-500' 
                onClick={() => setView('create-user-info')}>
                Sign Up
                </button>
            </div>
          
        </form>
    </div>
  );

  const renderCreateUserInfo = () => (
    <div className='flex flex-col w-80'>
        <form ref={form} className='flex flex-col w-full max-w-96  px-6 py-10 rounded-lg border border-black gap-2'>
        <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-light text-sm'>
            Your Name:
            </label>
            <input
            type="text"
            id="name"
            name="name"
            defaultValue={account.name}
            placeholder="John"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
            />
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="email" className='font-light text-sm'>
            Your Email:
            </label>
            <input
            type="email"
            id="email"
            name="email"
            defaultValue={account.email}
            placeholder="hi@helloworld.com"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
            />
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-light text-sm'>
            Your password:
            </label>
            <input
            type="password"
            id="password"
            name="password"
            defaultValue={account.password}
            placeholder="******"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
            />
        </div>
        <button
                className=' text-white w-full rounded-lg py-3 mt-4 font-semibold text-md bg-green-500 hover:bg-green-500/70 text-md transition-colors duration-300 ease-in-out'
                type="button" // Cambiado a button para evitar el submit por defecto
            onClick={createAnAccount}
        >
            Create account
        </button>
        </form>
    </div>
  );

  const renderView = () => (view === 'create-user-info' ? renderCreateUserInfo() : renderLogin());

 
  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-full capitalize mt-8'>Welcome!</h1>
      {renderView()}
    </Layout>
  );
}

export default SignIn;
