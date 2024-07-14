FROM python:3.10

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

WORKDIR /app/application/backend
EXPOSE 80
CMD ["gunicorn", "-b", ":80", "wsgi"]