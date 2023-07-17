from fastapi import FastAPI, HTTPException, File, UploadFile
from datetime import datetime
import csv

from database import get_database_cursor

app = FastAPI()

@app.get("/",status_code=201)
def root():
    return {"Status": "OK"}

@app.get("/get_data/")
def get_data():
    cur,conn = get_database_cursor()
    cur.execute("""
        SELECT * FROM stocks
    """)
    result=cur.fetchall()
    conn.close()
    return {"list":result}

@app.post("/upload/")
async def upload(file:UploadFile=File(...)):
    if file.content_type!="text/csv":
        raise HTTPException(400, detail="Invalid document type")
    contents=await file.read()
    decoded_content=contents.decode("utf-8")
    rows=csv.reader(decoded_content.splitlines(), delimiter=',')

    query = """INSERT INTO stocks (datetime, close, high, low, open, volume, instrument)VALUES (%(datetime)s, %(close)s, %(high)s, %(low)s, %(open)s, %(volume)s, %(instrument)s);"""
    cur,conn = get_database_cursor()
    next(rows)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS stocks (
            datetime TIMESTAMP,
            close DOUBLE PRECISION,
            high DOUBLE PRECISION,
            low DOUBLE PRECISION,
            open DOUBLE PRECISION,
            volume INTEGER,
            instrument VARCHAR(255)
        );
    """)
    conn.commit()

    if cur and conn:
        for row in rows:
            datetime_str, close, high, low, open, volume, instrument = row
            print(datetime_str)
            datetime_obj = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
            try:
                cur.execute(
                    query,
                    {
                        'datetime': datetime_obj, 
                        'close': close, 
                        'high': high,
                        'low':low,
                        'open':open,
                        'volume':volume,
                        'instrument':instrument
                    }
                )
            except Exception as error:
                raise HTTPException(400, detail="Server error")  
        conn.commit()
        return {"Status": "Upload has been succesfull"}
    else:
        print('cur doesnt exist')
        return {"Status": "Database connection failed"}
    
    return {"Status": "Upload has been failed"}
   


