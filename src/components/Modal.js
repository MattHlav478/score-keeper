import React from 'react';

export default function Modal({ children, isOpen, closeModal }) {
  if (!isOpen) return null;

  return (
    <div className="modal" id='modal'>
      <div className="bg-white text-black p-4 rounded-xl w-4/5 min-h-min h-2/5">
        <button className='text-2xl w-3 pb-2' onClick={closeModal}>x</button>
        {children}
      </div>
    </div>
  );
}