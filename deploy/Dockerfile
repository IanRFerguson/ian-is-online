# Step 1 - Build react frontend
FROM node:20 AS builder

WORKDIR /app/application/frontend
COPY ./application/frontend .

RUN npm install && npm run build

# Step 2 - Serve the frontend with Flask
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./application/backend /app/application/backend
COPY --from=builder /app/application/frontend /app/application/frontend

WORKDIR /app/application/backend

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "wsgi"]