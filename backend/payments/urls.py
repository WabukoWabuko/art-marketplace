from django.urls import path
from .views import (
    PaymentListView, 
    PaymentDetailView, 
    currency_conversion,
    initiate_payment,
    mpesa_callback,
    pesapal_callback
)

urlpatterns = [
    path('', PaymentListView.as_view(), name='payment-list'),
    path('<int:pk>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('convert/', currency_conversion, name='currency-conversion'),
    path('initiate/', initiate_payment, name='initiate-payment'),
    path('mpesa/callback/', mpesa_callback, name='mpesa-callback'),
    path('pesapal/callback/', pesapal_callback, name='pesapal-callback'),
]