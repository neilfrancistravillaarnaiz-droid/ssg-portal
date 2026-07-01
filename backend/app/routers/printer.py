import time

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.database import supabase

router = APIRouter()

PRINT_PRICING = {
    "black-and-white": 2,
    "colored-minimal": 3,
    "colored-half": 5,
    "colored-full": 7,
}

@router.post("/request")
async def create_print_request(
    file: UploadFile = File(...),
    student_id: str = Form(...),
    quantity: int = Form(...),
    color_mode: str = Form(...),
    own_paper: str = Form("false"),
    urgent: str = Form("false"),
    note: str = Form(""),
):
    if color_mode not in PRINT_PRICING:
        raise HTTPException(status_code=400, detail="Invalid print type.")

    quantity = max(1, quantity)
    own_paper = own_paper.lower() in ("true", "1", "yes") if isinstance(own_paper, str) else bool(own_paper)
    urgent = urgent.lower() in ("true", "1", "yes") if isinstance(urgent, str) else bool(urgent)
    timestamp = int(time.time() * 1000)
    storage_path = f"print_requests/{student_id}/{timestamp}-{file.filename}"

    file_contents = await file.read()

    upload_result = supabase.storage.from_("public").upload(
        storage_path,
        file_contents,
        {
            "cacheControl": "3600",
            "upsert": False,
        },
    )

    if upload_result.error:
        raise HTTPException(
            status_code=500,
            detail=upload_result.error.message
            or "Unable to upload the print file. Please try again.",
        )

    url_result = supabase.storage.from_("public").get_public_url(storage_path)
    public_url = url_result.data.get("publicUrl") if url_result.data else None

    price = PRINT_PRICING[color_mode]
    unit_price = price - 1 if own_paper else price
    if urgent:
        unit_price += 10
        note = f"URGENT REQUEST. {note}" if note else "URGENT REQUEST"
    total_price = quantity * unit_price

    insert_result = supabase.from_("print_requests").insert(
        [
            {
                "student_id": student_id,
                "file_name": file.filename,
                "file_type": file.content_type,
                "file_size": len(file_contents),
                "file_url": public_url,
                "quantity": quantity,
                "color_mode": color_mode,
                "note": note,
                "urgent": urgent,
                "unit_price": unit_price,
                "total_price": total_price,
                "status": "pending",
            }
        ]
    )

    if insert_result.error:
        raise HTTPException(
            status_code=500,
            detail=insert_result.error.message
            or "Unable to save your print request. Please try again later.",
        )

    return {"message": "Your print request was submitted successfully."}

@router.get("/requests")
async def list_print_requests():
    query = supabase.from_("print_requests").select("*")

    if query.error:
        raise HTTPException(
            status_code=500,
            detail=query.error.message or "Unable to fetch print requests.",
        )

    return query.data or []
