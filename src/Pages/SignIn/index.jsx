import { Link } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';
import { CartContext } from '../../Context';
// import { useLocalStorage } from './useLocalStorage.jsx';
import { Layout } from '../../Components/Layout';

function SignIn() {
  const { account } = useContext(CartContext);
  // view por defecto es 'user-info'
  const [view, setView] = useState('user-info')
  // capturo cuando no hay datos en local storage ( incluye en estado ya que estan sincronizados )
  const noAccountInStorage = account ? Object.keys(account).length === 0 : true;
  const form = useRef(null);

  const createAnAccount = () => {

    const currentData = new FormData(form.current);
    const userData = {
      name: currentData.get('name'),
      email: currentData.get('email'),
      password: currentData.get('password')
    }
    console.log(userData)
  }


  const renderLogin = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>
            Email: 
          </span>
          <span>{account.email}</span>
        </p>
        <p>
          <span className='font-light text-sm'>
            Password: 
          </span>
          <span>{account.password}</span>
        </p>
        <Link to = '/'>
          <button
          className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
          disabled = {noAccountInStorage}>
            Log In
          </button>
        </Link>
        <div className='text-center '>
          <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot My Password</a>
        </div>
        <button
          className='border-2 border-black text-black w-full rounded-lg py-3 mt-4 mb-2 hover:bg-black hover:text-white disabled:bg-black/40 disabled:border-0 disabled:text-white'
          disabled = {noAccountInStorage}
          onClick={() => setView('create-user-info')}
          >
            Sign Up
          </button>

      </div>
    );
  }
 
   const renderCreateUserInfo = () => {
    return (
      <>
       
        <form ref={form} className='flex flex-col gap-4 w-80'>
          <div className='flex flex-col gap-1'> 
            <label htmlFor="name" className='font-light text-sm'>Your Name:</label>
            <input type="text" 
            id='name'
            name='name'
            defaultValue={account.name}
            placeholder='John'
            className='rounded-lg border border-black placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
            />
          </div>
          <div className='flex flex-col gap-1'> 
            <label htmlFor="email" className='font-light text-sm'>Your Email:</label>
            <input type="email" 
            id='email'
            name='email'
            defaultValue={account.email}
            placeholder='hi@helloworld.com'
            className='rounded-lg border border-black placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
            />
          </div>
          <div className='flex flex-col gap-1'> 
            <label htmlFor="password" className='font-light text-sm'>Your password:</label>
            <input type="password" 
            id='password'
            name='password'
            defaultValue={account.password}
            placeholder='******'
            className='rounded-lg border border-black placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
            />
          </div>
          <Link to='/'>
          <button
            className='border-2 border-black text-black w-full rounded-lg py-3 mt-4 mb-2 hover:bg-black hover:text-white '
            onClick={() => createAnAccount()}
            >
            Create
          </button>
          
          </Link>

        </form>
      </>
    );
  }

  const renderTitle = () => 
    !noAccountInStorage ?
    <h1 className='font-medium text-xl text-center mb-6 w-80 capitalize'>Welcome back {account.name}!</h1>
  :
    <h1 className='font-medium text-xl text-center mb-6 w-80 capitalize'>Welcome!</h1>
  const renderView = () => 
    view ==='create-user-info' ? 
  renderCreateUserInfo() : renderLogin();


  return (
    <Layout>
      {renderTitle()}
      {renderView()}
    </Layout>
  )
}

export default SignIn