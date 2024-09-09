import PropTypes from 'prop-types';

const Layout = ( {children} ) => {
    return( 

        <div className='flex flex-col items-center  py-5 px-8 mt-[68px]'>
             {children}
        </div>


    );
}

//prop validation
Layout.propTypes = {
    children: PropTypes.node.isRequired,

};

export {Layout}