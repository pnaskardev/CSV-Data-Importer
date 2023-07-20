from rest_framework import serializers
# from rest_framework.response import Response
from . models import DataFile, Data


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFile
        fields = '__all__'

    def validate(self, attrs):
        file = attrs.get('file')
        if file.content_type != "text/csv":
            raise serializers.ValidationError('Invalid file type')

        return attrs


class DataSerialiazer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'
