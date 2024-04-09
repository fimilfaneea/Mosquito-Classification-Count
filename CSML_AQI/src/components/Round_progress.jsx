import React from 'react';

function Round_progress({ colour, value, border, value2, textColor1, textColor2 }) {
  return (
    <div>
      <div className="w-max relative m-10">
        <div className={`bg-white rounded-full p-8 border-4 ${border}`}>
          <div className={`${colour} p-2 rounded-full`}>
            <div className="bg-white rounded-full w-20 h-20 flex flex-col justify-center items-center">
              <p className="text-black text-2xl font-bold" style={{ fontSize: '12px' }}>{value}</p> {/* Adjust font size here */}
              <p className="text-slate-500 font-medium smaller-text" style={{ fontSize: '10px',color: 'red' }}>{value2}</p>{/* Adjust font size here */}
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-[-2px]">
          <div className={`bg-${colour} rounded-full p-[1px] border-2 ${border}`}>
            <div className=" bg-white p-[2px] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-1/2 left-[-3px]">
          <div className={`bg-${colour} rounded-full p-[1px] border-2 ${border}`}>
            <div className=" bg-white p-[2px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Round_progress;
