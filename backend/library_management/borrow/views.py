from django.shortcuts import render
from django.db import transaction
from rest_framework.exceptions import ValidationError
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from borrow.models import Borrow
from books.models import Book
from borrow.serializers import BorrowSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status



# Create your views here.

class BorrowViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        print(user)
        if not user:
            raise ValidationError("User does not exist.")

        book_id = request.data.get('book')  

        try:
            with transaction.atomic():
                book = Book.objects.select_for_update().get(id=book_id)

                if book.available_copies <= 0:
                    return Response(
                        {"error": "This book is not available for borrowing."}
                    )

                if Borrow.objects.filter(user=request.user, book=book, is_returned=False).exists():
                    return Response(
                        {"error": "You have already borrowed this book and not returned it."}
                    )

                borrowed_count = Borrow.objects.filter(user=request.user, is_returned=False).count()
                print(borrowed_count)
                if borrowed_count >= 5:
                    return Response(
                        {"error": "You have already borrowed the maximum number of books (5)."}
                    )

                book.available_copies -= 1
                book.save()

                return super().create(request, *args, **kwargs)

        except Book.DoesNotExist:
            raise ValidationError("The requested book does not exist.")
            


class ReturnBookView(APIView):
    def post(self, request):
        borrow_id = request.data.get('borrow_id')
        if not borrow_id:
            return Response({"error": "borrow_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                borrow = Borrow.objects.select_for_update().get(id=borrow_id)

                if borrow.is_returned:
                    return Response({"message": "This book has already been returned."}, status=status.HTTP_400_BAD_REQUEST)


                borrow.is_returned = True
                borrow.save()

                
                borrow.book.available_copies += 1
                borrow.book.save()

                return Response({"message": "Book returned successfully."})

        except Borrow.DoesNotExist:
            return Response({"error": "Borrow record not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
