FROM python:alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

RUN mkdir -p /app/application/backend
RUN mkdir -p /app/application/frontend-chakra

COPY ./application/backend /app/application/backend
COPY ./application/frontend-chakra /app/application/frontend-chakra

WORKDIR /app/application/backend

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "wsgi"]