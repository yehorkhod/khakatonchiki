FROM python:3.11

WORKDIR /backend

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["gunicorn", "src.api:app"]
