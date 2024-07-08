FROM python:3.10

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

WORKDIR /app/application/backend
EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "wsgi"]