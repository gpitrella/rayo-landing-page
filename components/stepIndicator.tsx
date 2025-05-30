import React from 'react'


function StepIndicator() {
  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      <div className="flex items-center space-x-8 justify-evenly gap-3 md:gap-20">
        {/* Primer paso */}
        <div className="min-h-[184px] flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold">
            1
          </div>
          <p className="text-lg mt-2 text-center max-w-56 m-auto">Seleccionar ubicación del vehículo</p>
        </div>
        {/* Segundo paso */}
        <div className="min-h-[184px] flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold">
            2
          </div>
          <p className="text-lg mt-2 text-center max-w-56 m-auto">Completar información necesaria para el lavado</p>
        </div>
      </div>
    </div>
  );
  
}

export default StepIndicator;