import os

from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services.pipeline_service import PipelineParseError, analyze_pipeline

app = FastAPI(title="VectorShift Pipeline API")

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in ALLOWED_ORIGINS if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.get('/health')
def health():
    return {'status': 'ok'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        return analyze_pipeline(pipeline)
    except PipelineParseError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
