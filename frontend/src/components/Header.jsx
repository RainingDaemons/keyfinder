/*
@Date         : 14-07-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src/components
@File         : Header.jsx
*/

import { A } from '@solidjs/router';

const Header = () => {
    return (
        <header
            class="w-full 
        flex justify-center
        border-b border-white/40"
        >
            <div class="w-full max-w-5xl py-4 px-10 flex justify-between">
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
                <nav class="flex items-center gap-2 text-white">
                    <A 
                        href="/"
                        class="[&.active]:underline
                        [&.active]:font-bold"
                        end
                    >
                        Home
                    </A>
                    <A 
                        href="/how-it-works"
                        class="[&.active]:underline
                        [&.active]:font-bold"
                    >
                        How It Works
                    </A>
                    <a 
                        href="https://drive.google.com/drive/folders/1bzAI3zVnkgNe_O5AvB2hGIxZiRdVvmvI?usp=sharing/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Demo Audios
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header;