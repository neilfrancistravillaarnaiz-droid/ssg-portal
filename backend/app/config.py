import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173,http://127.0.0.1:5173"
)

FRONTEND_ORIGINS = [
    origin.strip()
    for origin in FRONTEND_URL.split(",")
    if origin.strip()
]