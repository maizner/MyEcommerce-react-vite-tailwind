import { useContext, useState } from 'react';
import { CartContext } from '../../Context';
import { useNavigate } from 'react-router-dom'; 
import { Layout } from '../../Components/Layout';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignIn() {

    const { 
        cartProducts, 
        account, 
        setSignOut, 
        setAccount, 
        pendingCheckout,
        setPendingCheckout,
        handleCheckout
    } = useContext(CartContext);

    // const noAccount = !account || Object.keys(account).length === 0;
    const [view, setView] = useState('user-info');

    const validationSchemaLogin = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too short!').required('Required'),
    });
    const validationSchemaCreatAccount = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too short!').required('Required'),
    });

    const navigate = useNavigate(); 

    const handleSignIn = (values) => {
        if (account && values.email === account.email && values.password === account.password) {
            setSignOut(false);
            
            if ( cartProducts.length > 0 && pendingCheckout ) {
                handleCheckout();
                setPendingCheckout(false);
                navigate('/my-orders/last');
            
            } else {
                navigate('/');
            }
        } else {
            alert('Los datos no coinciden. ¿Deseas registrarte?');
            setView('create-user-info');
        }
    };

    const createAnAccount = (values) => {

        if (account && account.email === values.email) {
            alert('Ya existe una cuenta con este correo.');
            setView('sign-in');
            
        }else {

            setAccount(values);
            setSignOut(false);
            navigate('/');
            
        }
    };
    
    const renderLogin = () => (
        <div className='flex flex-col w-80'>

            <Formik
             initialValues={{
                email: account?.email || '', 
                password: account?.password || '' 
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={handleSignIn}
            >
        
            <Form className='flex flex-col w-full max-w-96 px-6 py-10 rounded-lg border border-black gap-2'>
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
                    placeholder="4 digits or more"
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
            initialValues={{
                name: '',
                email: account?.email || '',  // Asegúrate de que siempre sea string
                password: ''
            }}
            validationSchema={validationSchemaCreatAccount}
            onSubmit={createAnAccount}
        >
            <Form className='flex flex-col w-full max-w-96 px-6 py-10 rounded-lg border border-black gap-2'>
            <div className='flex flex-col gap-1'>
                       
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
                placeholder="4 digits or more"
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
