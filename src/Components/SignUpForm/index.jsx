import { useContext } from 'react';
import { CartContext } from '../../Context';
import { useNavigate } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function SignUpForm() {

    const { 
        account, 
        setSignOut, 
        setAccount, 
        setView
    } = useContext(CartContext);

    const validationSchemaCreatAccount = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too short!').required('Required'),
    });

    const navigate = useNavigate(); 

    const createAnAccount = (values) => {

        if (account && account.email === values.email) { 
            toast.info('An account with this email address already exists.');
            setView('sign-in');
            
        }else {
            setAccount(values);
            setSignOut(false);
            navigate('/');
        }
    };

  return (
    <div className='flex flex-col w-80'>

        <Formik
            initialValues={{
                name: '',
                email: '', 
                password: ''
            }}
            validationSchema={validationSchemaCreatAccount}
            onSubmit={createAnAccount}
        >
            <Form className='flex flex-col w-full max-w-96 px-6 py-10 rounded-lg border border-black gap-2'>
            <div className='flex flex-col gap-1'>
                    
                <label htmlFor='name' className='font-light text-sm'>
                Your Name:
                </label>
                <Field
                type='text'
                id='name'
                name='name'
                placeholder='John'
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                />
                <ErrorMessage name='name' component='div' className='text-red-500 text-sm' />

            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='email' className='font-light text-sm'>
                Your Email:
                </label>
                <Field
                type='email'
                id='email'
                name='email'
                placeholder='hi@helloworld.com'
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                />
                <ErrorMessage name='email' component='div' className='text-red-500 text-sm' />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='password' className='font-light text-sm'>
                Your password:
                </label>
                <Field
                type='password'
                id='password'
                name='password'
                placeholder='4 digits or more'
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none p-2 px-4'
                />
                <ErrorMessage name='password' component='div' className='text-red-500 text-sm' />
            </div>
            <button
                type='submit'
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
}

export { SignUpForm };
