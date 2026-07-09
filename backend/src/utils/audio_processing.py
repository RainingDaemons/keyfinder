"""
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : backend.src.utils
@File         : audio_processing.py
"""

import librosa
import numpy as np
import torch
import math

class AudioProcessor:
    def __init__(self):
        self.SAMPLE_RATE = 48000
        self.HOP_LENGTH = 512
        self.N_FFT = 8192
        self.FMIN = 65
        self.FMAX = 2100
        self.BINS_PER_OCTAVE = 24
        self.FRAMES_LIMIT = 937

        self.N_BINS = int(
            math.floor(self.BINS_PER_OCTAVE * np.log2(self.FMAX / self.FMIN))
        )

        self.filterbank = self.create_filterbank()

    def create_filterbank(self):
        n_bands = self.N_BINS
        freqs = self.FMIN * 2.0 ** (np.arange(0, n_bands + 2) / self.BINS_PER_OCTAVE)
        centers = freqs[1:-1]

        filters = np.zeros((n_bands, self.N_FFT // 2 + 1))
        fft_freqs = np.linspace(0, self.SAMPLE_RATE // 2, self.N_FFT // 2 + 1)

        for i in range(n_bands):
            f_left, f_center, f_right = freqs[i], centers[i], freqs[i + 1]

            eps = 1e-9
            left_slope = (fft_freqs - f_left) / max(f_center - f_left, eps)
            right_slope = (f_right - fft_freqs) / max(f_right - f_center, eps)

            filters[i] = np.maximum(0, np.minimum(left_slope, right_slope))

        return filters

    def pad_or_truncate(self, spec):
        T, F = spec.shape
        if T < self.FRAMES_LIMIT:
            pad = np.zeros((self.FRAMES_LIMIT - T, F))
            spec = np.vstack([spec, pad])
        else:
            spec = spec[:self.FRAMES_LIMIT, :]
        return spec

    def process(self, audio_path):
        y, sr = librosa.load(audio_path, sr=self.SAMPLE_RATE, mono=True)

        # STFT
        S = np.abs(librosa.stft(y, n_fft=self.N_FFT, hop_length=self.HOP_LENGTH)) ** 2

        # Aplly filterbank
        log_spec = np.dot(self.filterbank, S)

        # Log compression
        log_spec = np.log1p(log_spec).T

        # Min-max normalization
        log_spec = (log_spec - log_spec.min()) / (log_spec.max() - log_spec.min() + 1e-6)
        log_spec = np.nan_to_num(log_spec)

        # Adjust frames
        log_spec = self.pad_or_truncate(log_spec)

        tensor = torch.tensor(log_spec, dtype=torch.float32)
        tensor = tensor.permute(1, 0)
        tensor = tensor.unsqueeze(0).unsqueeze(1)

        assert tensor.shape == (1, 1, self.N_BINS, self.FRAMES_LIMIT)

        return tensor
