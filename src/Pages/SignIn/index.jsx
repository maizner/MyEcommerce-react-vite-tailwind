import { Layout } from '../../Components/Layout';
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome</h1>
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>
            Email: 
          </span>
          <span>teff@platzi.com</span>
        </p>
        <p>
          <span className='font-light text-sm'>
            Password: 
          </span>
          <span>******</span>
        </p>
        <Link to = '/'>
          <button
          className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
          >
            Log In
          </button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot My Password</a>
        </div>
        <button
          className='border border-black disabled:bg-black/40 text-black w-full rounded-lg py-3 mt-4 mb-2 hover:bg-black hover:text-white'
          >
            Sign Up
          </button>

      </div>
    </Layout>
  )
}

export default SignIn