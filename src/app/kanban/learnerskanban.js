'use client'

import React from 'react';

export default function LearnersKanban() {
    return (
        <div className='grid grid-cols-4 gap-4'>
            <div className='rounded p-3 text-lg font-semibold h-20 bg-[#DCFCE7] border-t-4 border-t-[#86EFAC] '>Up coming</div>
            <div className='rounded p-3 text-lg font-semibold h-20 bg-[#DBEAFE] border-t-4 border-t-[#93C5FD] '>On going</div>
            <div className='rounded p-3 text-lg font-semibold h-20 bg-[#FFEDD5] border-t-4 border-t-[#A8A29E] '>On Hold</div>
            <div className='rounded p-3 text-lg font-semibold h-20 bg-[#E0E7FF] border-t-4 border-t-[#94A3B8] '>Completed</div>
            <div className='rounded h-96 bg-[#E5E7EB]'></div>
            <div className='rounded h-96 bg-[#E5E7EB]'></div>
            <div className='rounded h-96 bg-[#E5E7EB]'></div>
            <div className='rounded h-96 bg-[#E5E7EB]'></div>
        </div>
    )
}