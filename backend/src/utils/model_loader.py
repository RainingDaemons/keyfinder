"""
@Date         : 06-01-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : backend/app
@File         : model_loader.py
"""

import torch

from ..ml.model import KeyR2Net

DEVICE = torch.device("cpu")

def load_model():
    model = KeyR2Net()

    state_dict = torch.load("src/ml/dict.pth", map_location=DEVICE)

    model.load_state_dict(state_dict)
    model.to(DEVICE)
    model.eval()

    return model
