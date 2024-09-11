FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Migrate and start the server
CMD ["sh", "-c", "python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8000"]
