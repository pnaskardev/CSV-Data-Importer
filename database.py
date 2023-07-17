import psycopg2
from psycopg2.extras import RealDictCursor

def get_database_cursor():
    try:
        conn=psycopg2.connect(
            host='localhost',
            database='Stocks',
            user='postgres',
            password='#Test123#',
            cursor_factory=RealDictCursor
        )
        cursor=conn.cursor()
        print('Database connection was succesful')
        return cursor,conn
    except Exception as error:
        print(error)