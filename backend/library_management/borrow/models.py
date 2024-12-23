from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from books.models import Book
from datetime import timedelta, date
from django.utils.timezone import now

# Create your models here.

def default_return_date():
    return date.today() + timedelta(days=14)


class Borrow(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE) 
    borrow_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(default=default_return_date)
    is_returned = models.BooleanField(default=False)
    # fine = models.DecimalField(max_digits=10, decimal_places=2, default=0)


    def calculate_fine(self):
        if  self.return_date and self.return_date < now().date():
            overdue_days = (now().date() - self.return_date).days
            daily_fine_rate = 5  
            return overdue_days * daily_fine_rate
        return 0

    class Meta:
        indexes = [
            models.Index(fields=['book']),
            models.Index(fields=['user', 'is_returned']),
        ]

    

    def __str__(self):
        return f"{self.user.username} borrowed {self.book.title}  {'Returned' if self.is_returned else 'Borrowed'}"

 