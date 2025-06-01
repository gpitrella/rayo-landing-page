import Image from "next/image";

export const StoreImg = () => {
  return (
    <section id="process" className="w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl m-auto pt-4 pb-16 sm:mt-6 sm:pb-10">
          <div className="text-center mb-8">
    
            <h2 className="text-xl md:text-2xl text-center mb-4">
              Proximamente encontranos en los stores    
            </h2>            
          </div>
    
          <div className="flex justify-center align-middle gap-4 flex-wrap">
              <Image
                src="/app-store-google.svg"
                alt=""
                width={200}
                height={0} // Se ignora si usas "intrinsic"
                layout="intrinsic"
                className="hover:scale-[1.01]"
              />

              <Image
                src="/app-store.svg"
                alt=""
                width={200}
                height={0} // Se ignora si usas "intrinsic"
                layout="intrinsic"
                className="hover:scale-[1.01]"
              />

          </div>
    </section>
  );
};
