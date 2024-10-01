import PropTypes from 'prop-types';

const Layout = ( {children} ) => {
    return( 

        <div className='flex flex-col items-center py-2 px-8 mt-[144px] lg:mt-[68px] relative'>
            {children}
        </div>


    );
}

//prop validation
Layout.propTypes = {
    children: PropTypes.node.isRequired,

};

export {Layout}