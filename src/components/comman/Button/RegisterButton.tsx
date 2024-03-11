import React from 'react';
import { Link } from 'react-router-dom';

function RegisterButton() {
    return (
        <div className='flex gap-[10px] mt-[24px]'>
            <Link to="/trainer">
                <button className='w-[198px] h-[72px] rounded-[5px] bg-[rgb(0,119,139)] text-white'>
                    <img src='../assets/img/Analyzing Skill.png' />
                    Trainer</button>
            </Link>

            <Link to="/company">
                <button className='w-[198px] h-[72px] rounded-[5px] bg-[#00778B] text-white'>
                    <img src='../assets/img/Company.png' />
                    Company</button>

            </Link>
        </div>
    );
}

export default RegisterButton;