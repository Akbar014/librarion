from rest_framework.routers import DefaultRouter
from django.urls import path, include
from books.views import BookViewSet 

router = DefaultRouter()
router.register('allBooks', BookViewSet, basename='books' )


urlpatterns = [
    path('', include(router.urls)),
     

]