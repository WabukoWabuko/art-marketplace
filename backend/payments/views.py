from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Payment
from .serializers import PaymentSerializer
from orders.models import Order
import requests

class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(order__user=self.request.user)

class PaymentDetailView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currency_conversion(request):
    from_currency = request.query_params.get('from', 'USD')
    to_currency = request.query_params.get('to', 'EUR')
    amount = float(request.query_params.get('amount', 1))
    
    # Mock conversion rates (in real app, use an API like fixer.io)
    rates = {
        'USD': {'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.0},
        'EUR': {'USD': 1.18, 'GBP': 0.86, 'JPY': 129.0},
        'GBP': {'USD': 1.37, 'EUR': 1.16, 'JPY': 150.0},
        'JPY': {'USD': 0.0091, 'EUR': 0.0078, 'GBP': 0.0067},
    }
    
    if from_currency in rates and to_currency in rates[from_currency]:
        converted_amount = amount * rates[from_currency][to_currency]
        return Response({'converted_amount': converted_amount, 'rate': rates[from_currency][to_currency]})
    return Response({'error': 'Currency not supported'}, status=400)
