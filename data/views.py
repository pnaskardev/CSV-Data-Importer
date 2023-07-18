from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.http import JsonResponse
import pytz
from datetime import datetime

import io, csv, pandas as pd

from . import models, serializers

class FileViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.FileSerializer
    queryset=models.DataFile.objects.all()

    def create(self, request, *args, **kwargs):
        serializer=serializers.FileSerializer(
            data=request.data,
            context={
                'request':request
            }
        )

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            file=request.data.get('file')
            file = serializer.data['file']
            reader = pd.read_csv(file)
            for _, row in reader.iterrows():
                datetime_str = row['datetime']
                timezone = pytz.timezone('Asia/Kolkata')
                datetime_obj = timezone.localize(datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S"))
                new_data=models.Data(
                    datetime=datetime_obj,
                    close=row['close'],
                    high=row['high'],
                    low=row['low'],
                    open=row['open'],
                    volume=row['volume'],
                    instrument=row['instrument']
                )
                new_data.save()
            return Response({"message":"File upload has been succesfull"})
        return Response(serializer.errors)
    

    def list(self, request, *args, **kwargs):
        list=models.Data.objects.all()
        serializer=serializers.DataSerialiazer(list,many=True)
        return JsonResponse({
            "list":serializer.data
            },
            safe=False
        )
    
    
