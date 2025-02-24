# Step 01 - Build React frontend
FROM node:18 AS builder

WORKDIR /app/application/frontend-chakra
COPY ./application/frontend-chakra .

RUN npm install --force
RUN npm run build


# Step 02 - Run Flask backend
FROM python:3.10

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app/application/backend
COPY ./application/backend .
COPY --from=builder /app/application/frontend-chakra /app/application/frontend-chakra

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "wsgi"]