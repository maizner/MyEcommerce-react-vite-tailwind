import { useContext } from 'react';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { LoginForm } from '../../Components/LoginForm';
import { SignUpForm } from '../../Components/SignUpForm';

function SignIn() {

    const { view } = useContext(CartContext);

    const renderLogin = () => (
        <LoginForm />
    );

    const renderCreateUserInfo = () => (
        <SignUpForm />
    );

    const renderView = () => (view === 'create-user-info' ? renderCreateUserInfo() : renderLogin());
    return (
        <Layout>
            <h1 className='font-medium text-xl text-center mb-6 w-full capitalize mt-8'>Welcome!</h1>
            {renderView()}
        </Layout>
    );
}

export { SignIn };
