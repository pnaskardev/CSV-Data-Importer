from django.db import models

# Create your models here.
from django.db import models

class DataFile(models.Model):
    file=models.FileField(upload_to='data')

class Data(models.Model):
    datetime=models.DateTimeField()
    close=models.FloatField()
    high=models.FloatField()
    low=models.FloatField()
    open=models.FloatField()
    volume=models.IntegerField()
    instrument=models.TextField()