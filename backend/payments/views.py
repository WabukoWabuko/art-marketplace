from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Payment
from .serializers import PaymentSerializer
from orders.models import Order
import requests
import json
import base64
import datetime
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

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

# M-Pesa Daraja API functions
def get_mpesa_access_token():
    """Get M-Pesa access token"""
    try:
        consumer_key = settings.MPESA_CONSUMER_KEY
        consumer_secret = settings.MPESA_CONSUMER_SECRET
        api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        
        if settings.MPESA_ENVIRONMENT == 'production':
            api_url = 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        
        r = requests.get(api_url, auth=(consumer_key, consumer_secret))
        mpesa_response = r.json()
        return mpesa_response['access_token']
    except Exception as e:
        return str(e)

def lipa_na_mpesa_online(phone_number, amount, account_reference, transaction_desc):
    """Initiate M-Pesa STK Push"""
    try:
        access_token = get_mpesa_access_token()
        api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        
        if settings.MPESA_ENVIRONMENT == 'production':
            api_url = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        password = base64.b64encode(
            (settings.MPESA_SHORTCODE + settings.MPESA_PASSKEY + timestamp).encode('utf-8')
        ).decode('utf-8')
        
        payload = {
            'BusinessShortCode': settings.MPESA_SHORTCODE,
            'Password': password,
            'Timestamp': timestamp,
            'TransactionType': 'CustomerPayBillOnline',
            'Amount': amount,
            'PartyA': phone_number,
            'PartyB': settings.MPESA_SHORTCODE,
            'PhoneNumber': phone_number,
            'CallBackURL': 'https://your-callback-url.com/callback',  # Update with your callback URL
            'AccountReference': account_reference,
            'TransactionDesc': transaction_desc
        }
        
        response = requests.post(api_url, json=payload, headers=headers)
        return response.json()
    except Exception as e:
        return {'error': str(e)}

# Pesapal functions
def get_pesapal_access_token():
    """Get Pesapal access token"""
    try:
        consumer_key = settings.PESAPAL_CONSUMER_KEY
        consumer_secret = settings.PESAPAL_CONSUMER_SECRET
        
        api_url = 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken'
        if settings.PESAPAL_ENVIRONMENT == 'live':
            api_url = 'https://pay.pesapal.com/v3/api/Auth/RequestToken'
        
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
        payload = {
            'consumer_key': consumer_key,
            'consumer_secret': consumer_secret
        }
        
        response = requests.post(api_url, json=payload, headers=headers)
        return response.json()
    except Exception as e:
        return {'error': str(e)}

def initiate_pesapal_payment(amount, currency, description, callback_url, customer_email, customer_phone):
    """Initiate Pesapal payment"""
    try:
        token_response = get_pesapal_access_token()
        if 'token' not in token_response:
            return {'error': 'Failed to get access token'}
        
        access_token = token_response['token']
        api_url = 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest'
        
        if settings.PESAPAL_ENVIRONMENT == 'live':
            api_url = 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'
        
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {access_token}'
        }
        
        payload = {
            'currency': currency,
            'amount': amount,
            'description': description,
            'callback_url': callback_url,
            'notification_id': 'your-notification-id',  # Update with your notification ID
            'billing_address': {
                'email_address': customer_email,
                'phone_number': customer_phone,
                'country_code': 'KE',  # Update based on customer location
                'first_name': 'Customer',
                'middle_name': '',
                'last_name': 'Name'
            }
        }
        
        response = requests.post(api_url, json=payload, headers=headers)
        return response.json()
    except Exception as e:
        return {'error': str(e)}

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_payment(request):
    """Initiate payment for an order"""
    try:
        order_id = request.data.get('order_id')
        payment_method = request.data.get('payment_method')
        phone_number = request.data.get('phone_number', '')
        email = request.data.get('email', '')
        
        if not order_id:
            return Response({'error': 'Order ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Create payment record
        payment = Payment.objects.create(
            order=order,
            amount=order.total_amount,
            currency=order.currency,
            payment_method=payment_method,
            status='pending'
        )
        
        if payment_method == 'mpesa':
            if not phone_number:
                return Response({'error': 'Phone number is required for M-Pesa payments'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Format phone number (add +254 if not present)
            if phone_number.startswith('0'):
                phone_number = '254' + phone_number[1:]
            elif not phone_number.startswith('254'):
                phone_number = '254' + phone_number
            
            mpesa_response = lipa_na_mpesa_online(
                phone_number=phone_number,
                amount=int(order.total_amount),
                account_reference=f'Order-{order.id}',
                transaction_desc=f'Payment for Order {order.id}'
            )
            
            if 'ResponseCode' in mpesa_response and mpesa_response['ResponseCode'] == '0':
                payment.transaction_id = mpesa_response.get('CheckoutRequestID', '')
                payment.save()
                return Response({
                    'message': 'M-Pesa payment initiated successfully',
                    'checkout_request_id': mpesa_response.get('CheckoutRequestID'),
                    'response_code': mpesa_response.get('ResponseCode')
                })
            else:
                payment.status = 'failed'
                payment.save()
                return Response({'error': 'Failed to initiate M-Pesa payment', 'details': mpesa_response}, status=status.HTTP_400_BAD_REQUEST)
        
        elif payment_method == 'pesapal':
            if not email:
                return Response({'error': 'Email is required for Pesapal payments'}, status=status.HTTP_400_BAD_REQUEST)
            
            pesapal_response = initiate_pesapal_payment(
                amount=order.total_amount,
                currency=order.currency,
                description=f'Payment for Order {order.id}',
                callback_url='https://your-callback-url.com/pesapal-callback',  # Update with your callback URL
                customer_email=email,
                customer_phone=phone_number
            )
            
            if 'order_tracking_id' in pesapal_response:
                payment.transaction_id = pesapal_response.get('order_tracking_id', '')
                payment.save()
                return Response({
                    'message': 'Pesapal payment initiated successfully',
                    'order_tracking_id': pesapal_response.get('order_tracking_id'),
                    'redirect_url': pesapal_response.get('redirect_url', '')
                })
            else:
                payment.status = 'failed'
                payment.save()
                return Response({'error': 'Failed to initiate Pesapal payment', 'details': pesapal_response}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            # Handle other payment methods (Stripe, PayPal, etc.)
            return Response({'message': f'Payment method {payment_method} initiated (mock implementation)'})
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
@api_view(['POST'])
def mpesa_callback(request):
    """Handle M-Pesa payment callback"""
    try:
        callback_data = json.loads(request.body)
        
        # Extract relevant data from callback
        result_code = callback_data.get('Body', {}).get('stkCallback', {}).get('ResultCode')
        checkout_request_id = callback_data.get('Body', {}).get('stkCallback', {}).get('CheckoutRequestID')
        
        if result_code == 0:
            # Payment successful
            try:
                payment = Payment.objects.get(transaction_id=checkout_request_id)
                payment.status = 'completed'
                payment.save()
                # Update order status
                payment.order.status = 'paid'
                payment.order.save()
            except Payment.DoesNotExist:
                pass
        
        return JsonResponse({'message': 'Callback received'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
@api_view(['POST'])
def pesapal_callback(request):
    """Handle Pesapal payment callback"""
    try:
        # Handle Pesapal callback
        # This would contain the payment status and order tracking ID
        callback_data = request.data
        
        order_tracking_id = callback_data.get('OrderTrackingId')
        payment_status = callback_data.get('PaymentStatus')
        
        if payment_status == 'COMPLETED':
            try:
                payment = Payment.objects.get(transaction_id=order_tracking_id)
                payment.status = 'completed'
                payment.save()
                # Update order status
                payment.order.status = 'paid'
                payment.order.save()
            except Payment.DoesNotExist:
                pass
        
        return JsonResponse({'message': 'Pesapal callback received'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
