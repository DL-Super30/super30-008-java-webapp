'use client'

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faLightbulb, faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';

export default function AiPage() {
  return (
    <div className='pt-[70px] p-4'>
      <div className='w-full border-2 p-3 rounded-lg'>
            <div>
                <textarea className='border-2 w-full h-60 text-lg font-semibold p-4 outline-none rounded-lg' placeholder='Ask Me Anything'></textarea>
            </div>
            <div className='flex justify-end'>
                 <button className='text-white bg-blue-500 text-lg p-1 w-10 h-10 text-center rounded-[50%] '><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
            <div className='w-full h-32 bg-[#E5E7EB] mt-5 pt-6 rounded-lg'>
              <div className='w-full h-20 bg-[#BAE6FD] '>
                <p className='p-7 text-lg'><FontAwesomeIcon icon={faLightbulb} className='mr-4 text-blue-500'/>Power of AI at your fingertips. Ask me anything.</p>
              </div>
            </div>
      </div>
    </div>
  )
}
