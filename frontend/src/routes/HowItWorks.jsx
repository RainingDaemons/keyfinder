/*
@Date         : 14-07-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src/app
@File         : HowItWorks.jsx
*/

import Header from "../components/Header";
import Footer from "../components/Footer";
import StepByStep from "../components/StepByStep";

const App = () => {
    return (
        <div class="min-h-screen flex flex-col w-full mx-auto items-center">
            <Header />
            <main class="flex flex-1 items-center justify-center py-16">
                <StepByStep />
            </main>
            <Footer />
        </div>
    );
};

export default App;
