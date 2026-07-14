/*
@Date         : 14-07-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src/components
@File         : StepByStep.jsx
*/

import { createSignal, For } from "solid-js";

const steps = [
    {
        number: 1,
        title: "Upload Your Audio",
        description:
            "Drag and drop or select an audio file — MP3, WAV, or OGG. Any song, melody, or recording works.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
        ),
    },
    {
        number: 2,
        title: "AI Analysis",
        description:
            "Your audio is sent securely to our server where KeyR2Net — a neural network trained on thousands of songs — listens to the musical patterns.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
        ),
    },
    {
        number: 3,
        title: "Key Detection",
        description:
            "The AI examines the harmonic structure, note relationships, and tonal center to figure out the musical key.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
            </svg>
        ),
    },
    {
        number: 4,
        title: "Get Your Result",
        description:
            "See the detected key and a confidence score showing how certain the AI is about its prediction. That's it!",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ),
    },
];

const StepByStep = () => {
    const [current, setCurrent] = createSignal(0);

    const isLast = () => current() === steps.length - 1;
    const isFirst = () => current() === 0;

    const next = () => {
        if (!isLast()) setCurrent(current() + 1);
    };

    const prev = () => {
        if (!isFirst()) setCurrent(current() - 1);
    };

    return (
        <div class="w-full max-w-lg mx-auto px-4">
            <div class="rounded-xl border border-white/20 bg-white/5 p-8">
                {/* progress bar */}
                <div class="h-1 w-full rounded-full bg-white/10 mb-8 overflow-hidden">
                    <div
                        class="h-full bg-indigo-500 rounded-full transition-all duration-300"
                        style={{ width: `${((current() + 1) / steps.length) * 100}%` }}
                    />
                </div>

                {/* step content */}
                <div class="flex flex-col items-center text-center">
                    <div class="text-indigo-400 mb-4">
                        {steps[current()].icon}
                    </div>
                    <p class="text-xs text-white/40 uppercase tracking-widest mb-1">
                        Step {steps[current()].number} of {steps.length}
                    </p>
                    <h2 class="text-xl font-semibold text-white mb-2">
                        {steps[current()].title}
                    </h2>
                    <p class="text-white/60 text-sm leading-relaxed">
                        {steps[current()].description}
                    </p>
                </div>

                {/* dot indicators */}
                <div class="flex justify-center gap-2 mt-8">
                    <For each={steps}>
                        {(_, i) => (
                            <button
                                onClick={() => setCurrent(i())}
                                class={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    i() === current()
                                        ? "bg-indigo-400 scale-125"
                                        : "bg-white/20 hover:bg-white/40"
                                }`}
                            />
                        )}
                    </For>
                </div>

                {/* navigation buttons */}
                <div class="flex justify-between mt-6">
                    <button
                        onClick={prev}
                        disabled={isFirst()}
                        class={`px-4 py-2 rounded-md text-sm font-medium transition ${
                            isFirst()
                                ? "text-white/20 cursor-not-allowed"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        Back
                    </button>
                    <button
                        onClick={next}
                        disabled={isLast()}
                        class={`px-4 py-2 rounded-md text-sm font-medium transition ${
                            isLast()
                                ? "text-white/20 cursor-not-allowed"
                                : "text-white bg-indigo-500 hover:bg-indigo-600"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepByStep;
