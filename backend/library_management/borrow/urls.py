from rest_framework.routers import DefaultRouter
from django.urls import path, include
from borrow.views import BorrowViewSet, ReturnBookView

router = DefaultRouter()
router.register('bookBorrow', BorrowViewSet, basename='borrow' )

urlpatterns = [
    path('', include(router.urls)),
    path('returnBook/', ReturnBookView.as_view(), name='return-book'),

]
