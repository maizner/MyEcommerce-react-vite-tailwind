import { useContext } from 'react';
import { ArrowDownOnSquareStackIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../../Context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function EditForm() {

    const { 
        account, 
        setAccount, 
        setView
    } = useContext(CartContext);

    const validationSchemaEditAccount = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too short!').required('Required'),
    });

    const editAccount = (values) =>{ 
        setAccount(values);
        setView('user-info');
        toast.success ('Your data has been succesfully saved.');
    };

    return (
        <div className='flex flex-col w-80'>

            <Formik
                initialValues={{
                    name: account?.name || '', 
                    email: account?.email || '',  
                    password: account?.password || '', 
                }}
                validationSchema={validationSchemaEditAccount}
                onSubmit={editAccount}
            >
                <Form className='flex flex-col w-full max-w-96 px-6 py-10 rounded-lg border border-black gap-2'>
                    <div className='flex flex-col gap-1'>
                            
                        <label htmlFor='name' className='font-light text-sm'>
                        Your current Name:
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
                        Your current Email:
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
                        Your current password:
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
                        className='flex flex-row items-center justify-between gap-4 text-white w-full rounded-lg px-4 py-3 mt-4 font-semibold text-md bg-green-500 hover:bg-green-500/70 text-md transition-colors duration-300 ease-in-out'>
                           Save 
                        < ArrowDownOnSquareStackIcon className='w-5 h-5'/>
                    </button>
            
                </Form>
            </Formik>
        </div>
    );
}

export { EditForm };
