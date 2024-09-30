import { useContext, useState } from 'react';
import { CartContext } from '../../Context';
import { useNavigate } from 'react-router-dom'; 
import { Layout } from '../../Components/Layout';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignIn() {

  const { account, setSignOut, setAccount} = useContext(CartContext);
  const [view, setView] = useState('user-info');
  

 
  const noAccount = account ? Object.keys(account).length === 0 : true;

  const validationSchema = Yup.object({
    // name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
  });

//   const form = useRef(null);
  const navigate = useNavigate(); 

  const handleSignIn = (values) => {
    
     if (!noAccount && values.email === account.email && values.password === account.password) {

        setSignOut(false);
        navigate('/');
       
    } else {
       // Muestra un mensaje de error si los datos no coinciden
        alert('Los datos no coinciden. ¿Deseas registrarte?');
        setView('create-user-info');
        
        
    }
  };



    const createAnAccount = (values) => {
        // Verificar si ya existe una cuenta con el mismo correo
        if (account && account.email === values.email) {
            alert('Ya existe una cuenta con este correo.');
            setView('sign-in');
            
        }else {
            console.log('create account with: ', values);
            setAccount(values);
            // handleSignIn(values);
            setSignOut(false);
        navigate('/');
            
        }
    };
    
    const renderLogin = () => (
        <div className='flex flex-col w-80'>


            <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
            >
        
            <Form className='flex flex-col w-full max-w-96 px-6 py-10 rounded-lg border border-black gap-2'>
                <h2 className='text-center'>Login</h2>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-light text-sm'>
                    Your Email:
                    </label>
                    <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="hi@helloworld.com"
                    className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font-light text-sm'>
                    Your password:
                    </label>
                    <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="******"
                    className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <button
                    type="submit"
                    className='text-white w-full rounded-lg py-3 mt-4 font-semibold text-md bg-green-500 hover:bg-green-500/70 text-md transition-colors duration-300 ease-in-out'
                >
                    Log In
                </button>

                <div className='text-center text-sm font-light'>
                    Don&apos;t have an account yet?
                    <button className='underline underline-offset-4 font-medium ml-2 text-green-500'
                    onClick={() => setView('create-user-info')}>
                    Sign Up
                    </button>
                </div>
            </Form>
            </Formik>
        </div>
    );

  const renderCreateUserInfo = () => (
    <div className='flex flex-col w-80'>

        <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={createAnAccount}
        >
            <Form className='flex flex-col w-full max-w-96 px-6 py-10 rounded-lg border border-black gap-2'>
            <div className='flex flex-col gap-1'>
                        <h2 className='text-center'>Login</h2>
                <label htmlFor="name" className='font-light text-sm'>
                Your Name:
                </label>
                <Field
                type="text"
                id="name"
                name="name"
                placeholder="John"
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-light text-sm'>
                Your Email:
                </label>
                <Field
                type="email"
                id="email"
                name="email"
                placeholder="hi@helloworld.com"
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-light text-sm'>
                Your password:
                </label>
                <Field
                type="password"
                id="password"
                name="password"
                placeholder="******"
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button
                type="submit"
                className='text-white w-full rounded-lg py-3 mt-4 font-semibold text-md bg-green-500 hover:bg-green-500/70 text-md transition-colors duration-300 ease-in-out'
            >
                Create account
            </button>
            <div className='text-center text-sm font-light'>
                Already have an account?
                <button className='underline underline-offset-4 font-medium ml-2 text-green-500'
                onClick={() => setView('sign-in')}>
                Sign in
                </button>
            </div>
            </Form>
        </Formik>
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
