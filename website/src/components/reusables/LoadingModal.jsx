import React from 'react';


const LoadingModal = ({isOpen ,message}) => {

    if(!isOpen) return null
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-800/60 backdrop-blur-sm">
      <div className="w-[20%] rounded-2xl border border-lime-300/10 bg-zinc-900 p-6 shadow-xl animate-modal">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full border-l-lime-600 border-r-yellow-500 animate-spin" />
          <h3 className="text-sm font-bold text-zinc-300">Wait..</h3>
          <p className="text-center text-sm text-zinc-400">{message}</p>
        </div>
      </div>


    </div>
  );
};

export default LoadingModal;