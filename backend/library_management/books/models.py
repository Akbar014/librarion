from django.db import models
from cloudinary.models import CloudinaryField


# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    image = CloudinaryField('image', blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    isbn = models.CharField(max_length=13, unique=True)
    published_date = models.DateField(null=True, blank=True)
    total_copies = models.PositiveIntegerField() 
    available_copies = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['is_available', 'available_copies']),
        ]

    def __str__(self):
        return self.title
