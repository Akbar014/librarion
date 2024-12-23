
from rest_framework import serializers
from borrow.models import Borrow
from books.models import Book

class BorrowSerializer(serializers.ModelSerializer):
    fine = serializers.SerializerMethodField()
    book_title = serializers.SerializerMethodField()

    class Meta:
        model = Borrow
        # fields = '__all__'
        fields = ['id', 'user', 'book' , 'book_title', 'borrow_date', 'return_date', 'is_returned', 'fine']
        read_only_fields = ['user']
    
    def get_fine(self, obj):
        return obj.calculate_fine()

    def get_book_title(self, obj):
        return obj.book.title



    
