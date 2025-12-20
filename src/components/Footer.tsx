import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-gray-900 text-gray-200 py-8">
  <div className="container mx-auto px-4 text-center">
    <p className="text-sm md:text-base">
      © {new Date().getFullYear()} My Saree Mall | Call:{" "}
      <a href="tel:+8801926923688" className="text-rose-500 hover:text-rose-400 font-semibold">
       +880 1926-923688
      </a>{" "}
      | Design & Developed by{" "}
      <a
        href="https://www.digitalagencypark.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-rose-500 hover:text-rose-400 font-bold underline"
      >
        Digital Agency Park
      </a>
    </p>

    {/* Optional Social Icons */}
    <div className="mt-4 flex justify-center gap-4">
      <a href="https://www.facebook.com/mysareemall" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">
        Facebook
      </a>
      <a href="https://www.linkedin.com/company/digitalagencypark" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">
        LinkedIn
      </a>
      <a href="https://www.instagram.com/digitalagencypark" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">
        Instagram
      </a>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer