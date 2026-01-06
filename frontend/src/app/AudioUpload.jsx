/*
@Date         : 06-01-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src/app
@File         : AudioUpload.jsx
*/

import { createSignal } from "solid-js";
import AudioWaveIcon from "../icons/audiowave.svg";
import PrivacyIcon from "../icons/privacy.svg";
import LoadingIcon from "../icons/loading.svg";

const AudioUpload = () => {
    const [file, setFile] = createSignal(null);
    const [isLoading, setIsLoading] = createSignal(false);
    const [res, setRes] = createSignal(null);
    let inputRef;

    const isValidSize = (file) => {
        const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
        return file.size <= MAX_SIZE_BYTES;
    };

    const onFileSelect = (f) => {
        if (!f.type.startsWith("audio/")) return;
        setFile(f);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const f = e.dataTransfer?.files?.[0];

        if (!f) return;

        if (!isValidSize(f)) {
            alert("File is too big");
            return; 
        }

        onFileSelect(f);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file()) return;

        const formData = new FormData();
        formData.append("file", file());

        try {
            setIsLoading(true);

            const apiUrl = import.meta.env.PROD
                ? import.meta.env.VITE_API_URL
                : "http://127.0.0.1:8000/predict";
            
            const apiRes = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            const data = await apiRes.json();

            if (!apiRes.ok) {
                alert(data.detail);
            } else {
                setRes(data);
            }
        } catch (err) {
            alert("Sorry, we can't process your request right now");
        } finally {
            setIsLoading(false);
        }
    }

    const handleRetry = () => {
        setFile(null);
        setRes(null);
    }

    const getColor = (res) => {
        const colors = {
            'C': '#E84C3D',
            'G': '#E83D6D',
            'D': '#7d61b8ff',
            'A': '#4A5C9A',
            'E': '#5C7FB2',
            'B': '#4FA0C8',
            'F#': '#4CB7B1',
            'C#': '#3E8F7A',
            'G#': '#5FB25A',
            'D#': '#e2de61ff',
            'A#': '#F7BE4B',
            'F': '#F28B3C',
        }

        const key = res.class.split(":")[0];
        return colors[key] ?? '#ffffff';
    };

    return (
        <>
            {!res() ? (
                <>
                    <div class="w-full max-w-2xl px-4">
                        <p class="text-lg text-center font-medium text-white/60 pb-4">
                            Attach an audio file to identify its musical key
                        </p>
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => inputRef.click()}
                            class="cursor-pointer 
                            rounded-xl 
                            border-2 border-dashed border-white/40
                            p-10
                            mb-4
                            text-center
                            transition
                            hover:border-indigo-400"
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept=".mp3,.wav,.ogg"
                                class="hidden"
                                onChange={(e) => {
                                    const f = e.currentTarget.files?.[0];
                                    if (f) onFileSelect(f);
                                }}
                            />

                            {!file() ? (
                                <>
                                    <div class="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-lg">
                                        <AudioWaveIcon class="scale-200 text-indigo-400"/>
                                    </div>
                                    <p class="text-indigo-400 font-medium">
                                        Drop your audio file
                                    </p>
                                    <p class="mt-1 text-xs text-white/50">
                                        MP3, WAV, OGG up to 10MB
                                    </p>
                                    <p class="mt-1 text-xs text-white/50">
                                        Audio duration ≥ 10 seconds
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p class="text-md text-white font-medium">
                                        {file().name}
                                    </p>
                                    <p class="text-xs text-white/50 mt-2">
                                        {(file().size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <audio
                                        controls
                                        src={URL.createObjectURL(file())}
                                        class="mt-4 w-full"
                                    />
                                </>
                            )}
                        </div>
                        {file() && (
                            <div class="flex justify-center">
                                {!isLoading() ? (
                                    <button
                                        onclick={handleSubmit}
                                        class="rounded-md
                                        border-2 border-transparent
                                        flex 
                                        px-2 py-1 mx-auto
                                        text-base font-medium text-white
                                        bg-indigo-500
                                        hover:bg-indigo-600"
                                    >
                                        Identify
                                    </button>
                                ) : (
                                    <LoadingIcon class="scale-150 animate-pulse text-indigo-500" />
                                )}
                            </div>
                        )}
                        <section id="privacy_notice">
                            <div class="flex pt-4">
                                <PrivacyIcon class="scale-110 text-white/60"/>
                                <p class="text-sm text-white/60">
                                    Privacy notice:
                                </p>
                            </div>
                            <p class="text-sm text-white/60">
                                Once key is determined, audio file will be deleted from our servers
                            </p>
                        </section>
                    </div>
                </>
            ) : (
                <div class="w-full max-w-2xl">
                    <p class="text-lg text-center font-medium text-white/70 pb-4">
                        Key detected
                    </p>
                    <div
                        class="border-2 border-transparent rounded-xl
                        p-10
                        text-center
                        transition
                        hover:scale-110"
                        style={{ "background-color": getColor(res()) }}
                    >
                        <p>
                            {res().class.split(":")[0]} {res().class.split(":")[1]}
                        </p>
                    </div>
                    <p class="text-sm font-bold text-white/70 mt-4">
                        Confidence: {res().confidence}
                    </p>
                    <button
                        onclick={handleRetry}
                        class="rounded-md
                        border-2 border-transparent
                        flex 
                        px-2 py-1 mt-4 mx-auto
                        text-base font-medium text-white
                        bg-indigo-500
                        hover:bg-indigo-600"
                    >
                        Try again
                    </button>
                </div>
            )}
        </>
    );
};

export default AudioUpload;
