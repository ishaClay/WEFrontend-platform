import PrimaryButton from './comman/Button/PrimaryButton';

function Header() {


    return (
        <header className='container flex w-[94.5rem]'>
            <div className='ml-[120px] mt-[57px]'>
                <img className='w-[131px] h-[86px]' src='../assets/img/logo1.png' />
            </div>
            <div className='mt-[106px] ml-[22px]'>
                <ul className='flex gap-[2rem] font-[400] text-[16px] leading-[19.53px]'>
                    <li className="relative group">
                        <span className="cursor-pointer">Our Courses</span>
                        <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white shadow-md py-2 px-3 rounded-md">
                            <li>Course 1</li>
                            <li>Course 2</li>
                            <li>Course 3</li>
                        </ul>
                    </li>
                    <li>Testimonial</li>
                    <li>Blogs</li>
                    <li>Contact Us</li>
                </ul>
            </div>

            <PrimaryButton />
            <div className='ml-[31px] mt-[42px]'>
                <img className='w-[136px] h-[105px]' src='../assets/img/logo2.png' />
            </div>
        </header>
    );
}

export default Header;