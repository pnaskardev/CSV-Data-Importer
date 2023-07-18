from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import csv

class FileUploadHandler(APIView):
    def post(self, request, format=None):
        file = request.FILES.get('file')
        print(file.content_type)
        if not file:
            return Response({"message": "No file has been found"}, status=status.HTTP_204_NO_CONTENT)

        if file.content_type not in "text/csv":
            return Response({"message": "Incorrect File format only CSV files are accepted", }, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        return Response({"message":"data upload has been successfull"})
    
