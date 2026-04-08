from django.urls import path
from .views import PaymentListView, PaymentDetailView, currency_conversion

urlpatterns = [
    path('', PaymentListView.as_view(), name='payment-list'),
    path('<int:pk>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('convert/', currency_conversion, name='currency-conversion'),
]