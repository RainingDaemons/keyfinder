/*
@Date         : 06-01-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src/app
@File         : App.jsx
*/

import AudioUpload from "./AudioUpload";
import RRSSGithub from "../icons/rrss_github.svg";
import RRSSWebsite from "../icons/rrss_website.svg";

const App = () => {
  return (
    <div class="min-h-screen flex flex-col w-full mx-auto items-center">
      <header 
        class="p-4 w-full
        flex justify-center
        border-b border-white/40"
      >
        <p 
          class="max-w-5xl
          text-2xl font-bold tracking-wider 
          bg-linear-to-r
          from-[#7d61b8ff]
          to-[#E84C3D]
          bg-clip-text
          text-transparent"
        >
          KEYFINDER
        </p>
      </header>
      <main class="flex flex-1 items-center text-3xl font-bold">
        <AudioUpload />
      </main>
      <footer 
        class="w-full 
        flex justify-center
        border-t border-white/40"
      >
        <div class="w-full max-w-5xl py-4 px-10 flex items-center">
          <div class="text-white" id="text">
            <p class="text-md">Felipe Gutiérrez Carilao</p>
            <p class="text-md">&copy; {new Date().getFullYear()} | All rights reserved</p>
          </div>
          <div class="ml-auto grid grid-cols-1 auto-cols-max grid-flow-col gap-2 text-white">
            <a
              href='https://github.com/RainingDaemons/'
              target='_blank'
              class="shrink-0 p-2 border border-transparent rounded-full hover:bg-neutral-600"
            >
              <RRSSGithub class="w-6 h-6" />
            </a>
            <a
              href='https://www.rainingdaemons.com/'
              target='_blank'
              class="shrink-0 p-2 border border-transparent rounded-full hover:bg-neutral-600"
            >
              <RRSSWebsite class="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
