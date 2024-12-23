
from rest_framework import serializers
from books.models import Book

class BookSerializer(serializers.ModelSerializer):
    
    image = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = Book
        fields = '__all__'
        # exclude = ['available_copies']
    

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj
