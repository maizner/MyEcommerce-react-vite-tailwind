import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context';
// import { useLocalStorage } from './useLocalStorage.jsx';
import { Layout } from '../../Components/Layout';

function SignIn() {
  const { account } = useContext(CartContext);
  // view por defecto es 'user-info'
  const [view, setView] = useState('user-info')
  // capturo cuando no hay datos en local storage ( incluye en estado ya que estan sincronizados )
  const noAccountInStorage = account ? Object.keys(account).length === 0 : true;

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
      console.log('TODO: Create render view')
    );
  }

  const renderView = () => view ==='create-user-info' ? renderCreateUserInfo() : renderLogin();


  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome</h1>
      {renderView()}
    </Layout>
  )
}

export default SignIn