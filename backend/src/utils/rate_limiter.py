"""
@Author       : Felipe Gutiérrez
@Website      : https://www.rainingdaemons.com
@Module       : backend.src.utils
@File         : rate_limiter.py
"""

import time
from collections import defaultdict

from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests: int = 10, window_seconds: int = 60, cooldown_seconds: int = 600):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.cooldown_seconds = cooldown_seconds
        self.requests: dict[str, list[float]] = defaultdict(list)
        self.cooldowns: dict[str, float] = {}

    def _get_client_ip(self, request: Request) -> str:
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"

    def _cleanup(self, ip: str, now: float):
        cutoff = now - self.window_seconds
        self.requests[ip] = [t for t in self.requests[ip] if t > cutoff]

    async def dispatch(self, request: Request, call_next):
        ip = self._get_client_ip(request)
        now = time.time()

        cooldown_until = self.cooldowns.get(ip)
        if cooldown_until and now < cooldown_until:
            retry_after = int(cooldown_until - now)
            raise HTTPException(
                status_code=429,
                detail="Too many requests. You are temporarily blocked.",
                headers={"Retry-After": str(retry_after)},
            )
        if cooldown_until and now >= cooldown_until:
            del self.cooldowns[ip]
            self.requests[ip] = []

        self._cleanup(ip, now)

        if len(self.requests[ip]) >= self.max_requests:
            self.cooldowns[ip] = now + self.cooldown_seconds
            self.requests[ip] = []
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. You are temporarily blocked.",
                headers={"Retry-After": str(self.cooldown_seconds)},
            )

        self.requests[ip].append(now)
        return await call_next(request)
