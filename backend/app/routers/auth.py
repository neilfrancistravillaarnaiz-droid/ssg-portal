import os
import random
import smtplib
import time
from email.message import EmailMessage
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.database import supabase

router = APIRouter()

OTP_EXPIRY_SECONDS = 5 * 60
pending_admin_otps = {}

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USERNAME)
SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "true").lower() == "true"


def send_otp_email(email: str, otp: str) -> None:
    if not all([SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD]):
        raise RuntimeError("SMTP credentials are not configured.")

    msg = EmailMessage()
    msg["Subject"] = "StudentHub Admin Verification Code"
    msg["From"] = SMTP_FROM
    msg["To"] = email
    msg.set_content(
        f"Your StudentHub admin verification code is: {otp}\n\n"
        f"This code expires in 5 minutes."
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        if SMTP_USE_TLS:
            server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)

class VerifyStudentRequest(BaseModel):
    student_id: str

class RegisterRequest(BaseModel):
    student_id: str
    email: EmailStr
    password: str

class RegisterAdminRequest(BaseModel):
    email: EmailStr
    password: str

class VerifyAdminOtpRequest(BaseModel):
    email: EmailStr
    otp: str

@router.post("/verify-student")
def verify_student(payload: VerifyStudentRequest):
    student_id = payload.student_id.strip().upper().replace("–", "-").replace("—", "-")

    response = (
        supabase.table("student_records")
        .select("*")
        .eq("student_id", student_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Student ID not found.")

    student = response.data[0]

    if student.get("is_registered"):
        raise HTTPException(status_code=400, detail="This Student ID is already registered.")

    return {
        "message": "Student verified successfully.",
        "student": student,
    }

@router.post("/register")
def register_student(payload: RegisterRequest):
    student_id = payload.student_id.strip().upper().replace("–", "-").replace("—", "-")

    response = (
        supabase.table("student_records")
        .select("*")
        .eq("student_id", student_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Student ID not found.")

    student = response.data[0]

    if student.get("is_registered"):
        raise HTTPException(status_code=400, detail="This Student ID is already registered.")

    auth_response = supabase.auth.admin.create_user({
        "email": payload.email,
        "password": payload.password,
        "email_confirm": True,
        "user_metadata": {
            "student_id": student_id,
            "full_name": student.get("full_name"),
            "first_name": student.get("first_name"),
            "middle_name": student.get("middle_name"),
            "last_name": student.get("last_name"),
            "program": student.get("program"),
            "year_level": student.get("year_level"),
            "section": student.get("section"),
            "role": "student",
        },
    })

    user = auth_response.user

    supabase.table("student_records").update({
        "is_registered": True,
        "email": payload.email,
        "auth_user_id": user.id,
    }).eq("student_id", student_id).execute()

    return {
        "message": "Account created successfully.",
        "user_id": user.id,
    }

@router.post("/register-admin")
def register_admin(payload: RegisterAdminRequest):
    auth_response = supabase.auth.admin.create_user({
        "email": payload.email,
        "password": payload.password,
        "email_confirm": True,
        "user_metadata": {
            "role": "admin",
        },
    })

    user = auth_response.user

    if not user:
        raise HTTPException(status_code=400, detail="Failed to create admin user.")

    return {
        "message": "Admin account created. Please sign in with your credentials.",
        "user_id": user.id,
    }

@router.post("/generate-admin-otp")
def generate_admin_otp(payload: RegisterAdminRequest):
    email_key = payload.email.lower()
    otp = f"{random.randint(100000, 999999)}"
    pending_admin_otps[email_key] = {
        "otp": otp,
        "expires_at": time.time() + OTP_EXPIRY_SECONDS,
    }

    try:
        send_otp_email(payload.email, otp)
    except Exception:
        pass

    return {
        "message": "OTP sent to your email.",
    }

@router.post("/resend-admin-otp")
def resend_admin_otp(payload: RegisterAdminRequest):
    email_key = payload.email.lower()
    otp = f"{random.randint(100000, 999999)}"
    pending_admin_otps[email_key] = {
        "otp": otp,
        "expires_at": time.time() + OTP_EXPIRY_SECONDS,
    }

    try:
        send_otp_email(payload.email, otp)
    except Exception:
        pass

    return {
        "message": "OTP resent to your email.",
    }

@router.post("/verify-admin-otp")
def verify_admin_otp(payload: VerifyAdminOtpRequest):
    email_key = payload.email.lower()
    pending = pending_admin_otps.get(email_key)

    if not pending:
        raise HTTPException(status_code=400, detail="No pending admin verification found.")

    if time.time() > pending["expires_at"]:
        pending_admin_otps.pop(email_key, None)
        raise HTTPException(status_code=400, detail="OTP has expired. Please sign in again.")

    if str(payload.otp).strip() != str(pending["otp"]):
        raise HTTPException(status_code=400, detail="Invalid OTP.")

    user_id = pending.get("user_id")
    pending_admin_otps.pop(email_key, None)

    return {
        "message": "Admin account verified successfully.",
        "user_id": user_id,
    }