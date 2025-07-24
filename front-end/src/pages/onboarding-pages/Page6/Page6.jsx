import { Link } from 'react-router-dom';

const Page6 = () => {
    // last page 
    return (
        <div className='text-center flex flex-col gap-5'>
            <h1 className='text-xl font-bold font-playfair-display'>You're In</h1>
            <p className='font-montserrat mx-10 md:mx-0'>Your personalized dashboard is ready. Let’s rise together.</p>
            <div><Link className='btn btn-md bg-brandPrimary px-4 md:px-8 hover:bg-[#7f9e90]' to="/dashboard">Go to Dashboard</Link></div>
        </div>
    );
};

export default Page6;






