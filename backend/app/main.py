from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import FRONTEND_ORIGINS
from app.routers import auth, printer

print("FRONTEND_ORIGINS:", FRONTEND_ORIGINS)

app = FastAPI(title="StudentHub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(printer.router, prefix="/printer", tags=["Printer"])

@app.get("/")
def root():
    return {"message": "StudentHub backend is running"} 