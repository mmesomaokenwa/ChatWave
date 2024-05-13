import Image from 'next/image';
import React from 'react'

const Layout = ({ children }) => {
  return (
    <main className="flex items-center justify-between h-screen overflow-y-auto">
      {children}
      <section className="hidden md:block w-1/2 h-screen overflow-clip">
        <Image
          src={"/assets/Frame 41.jpg"}
          alt="cover photo"
          width={1000}
          height={1000}
          className="object-cover h-screen w-full"
        />
      </section>
    </main>
  );
}

export default Layout