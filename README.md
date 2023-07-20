
# CSV-Data-Importer

CSV Data Importer is a web application that allows users to upload CSV files containing financial data and import the data into a PostgreSQL database using Django Rest Framework (DRF) on the backend and React on the frontend. The application provides an easy-to-use interface for users to upload their CSV files, view the data in tabular format, and import it into the database for further analysis.
## Tech Stack

- **Backend**: Django Rest Framework (DRF), PostgreSQL, psycopg2, pandas, and pytz.
- **Frontend**: React, Axios, and react-toastify.


## Features

- **File Upload**: Users can upload CSV files containing financial data using a user-friendly interface.

- **Database Import**: Validated CSV data is imported into a PostgreSQL database using Django models.

- **Data Display**: Users can view the imported data in a tabular format, making it easy to review and analyze.

## Run Locally

Clone the project

```bash
  git clone https://github.com/pnaskardev/CSV-Data-Importer
```

Go to the project directory

```bash
  cd CSV-Data-Importer
```
Install venv

```bash
  pip install venv
```

Create a python virtual environement

```bash
  python -m venv venv
```

Start the virtual environement

```bash
  venv\Scripts\activate
```

install required packages

```bash
  pip install -r requirements.txt
```
Create and migrate the database:
```bash
    python manage.py makemigrations
    python manage.py migrate
```
Start the Server
```bash
  python manage.py runserver
```

**In a seperate terminal** 
Go to the frontend directory

```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start

```

Access the App at 

```bash
  http://127.0.0.1:3000/
```


## Screenshots
![image](https://github.com/pnaskardev/CSV-Data-Importer/assets/71266237/b8c4fab7-5cd9-4a9a-ad19-ae420c8b05a9)
![Screenshot (19)](https://github.com/pnaskardev/CSV-Data-Importer/assets/71266237/ccd04334-fd55-4191-840e-54ecce3603cd)
![image](https://github.com/pnaskardev/CSV-Data-Importer/assets/71266237/15edc85c-ffb3-4e1d-9d50-321fabb0d44b)
![Screenshot (13)](https://github.com/pnaskardev/CSV-Data-Importer/assets/71266237/1eaeb86e-031e-435b-afc0-6f0bbf3a5b3f)



## API Reference


#### List all the Products

```http
  GET /get/
```

#### Upload the data 

```http
  POST /post/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file` | `file` | **Required** CSV file that you want to upload.  |




## Authors

- [@pnaskardev](https://www.github.com/pnaskardev)

