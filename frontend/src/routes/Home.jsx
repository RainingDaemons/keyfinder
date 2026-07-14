/*
@Date         : 14-07-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src/app
@File         : Home.jsx
*/

import Header from "../components/Header";
import Footer from "../components/Footer";
import AudioUpload from "../components/AudioUpload";

const App = () => {
  return (
    <div class="min-h-screen flex flex-col w-full mx-auto items-center">
      <Header />
      <main class="flex flex-1 items-center text-3xl font-bold">
        <AudioUpload />
      </main>
      <Footer />
    </div>
  );
};

export default App;
