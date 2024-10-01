import { useContext } from 'react';
import { CartContext } from '../../Context';
import { useNavigate } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function LoginForm() {

    const { 
        cartProducts, 
        account, 
        setSignOut, 
        pendingCheckout,
        setPendingCheckout,
        handleCheckout,
        setView,
    } = useContext(CartContext);


    

    const validationSchemaLogin = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too short!').required('Required'),
    });
  

    const navigate = useNavigate(); 

    const handleLoginForm = (values) => {
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
            toast.error('The provided credentials do not match our records. Would you like to sign up instead?');
            setView('create-user-info');
        }
    };


    
 
  return (
   
    <div className='flex flex-col w-80'>
        <Formik
        initialValues={{
            email: account?.email || '', 
            password: account?.password || '' 
        }}
        validationSchema={validationSchemaLogin}
        onSubmit={handleLoginForm}
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
}

export { LoginForm };
