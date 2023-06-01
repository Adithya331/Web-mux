import React from 'react';
import './App.css';
function FrontPage () {
    return ( 
        
        <section class="bg-gray-900 text-white">
  <div
    class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
  >
    <div class="mx-auto max-w-3xl text-center">
      <h1
        class="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        ASTRO LiveQC.

        <span class="sm:block"> Screen Share Web Client. </span>
      </h1>

      <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Click on Join to connect to a space and view Smartglass screen.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a
          class="block w-full rounded bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 hover:from-pink-500 hover:to-yellow-500 px-12 py-3 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/screen"
        >
          Join Room
        </a>
      </div>
    </div>
  </div>
</section>
     );
}

export default FrontPage ;