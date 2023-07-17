from sqlalchemy import Column, Double,Integer, String, DateTime


from .database import Base

class Stock(Base):
    __tablename__='stocks'

    datetime=Column(DateTime)
    close=Column(Double)
    high=Column(Double)
    low=Column(Double)
    open=Column(Double)
    volume=Column(Integer)
    instrument=Column(String)