from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from books.models import Book
from books.serializers import BookSerializer
from books.permissions import IsAdminOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication




# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def get_queryset(self):
        available = self.request.query_params.get('available', None)
        if available == 'true' :
            return Book.objects.filter(available_copies__gt=0, is_available=True)  
        return Book.objects.all()




