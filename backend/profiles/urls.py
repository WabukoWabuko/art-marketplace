from django.urls import path
from .views import ProfileDetailView, ProfileUpdateView, UserSettingsView, WishlistListView, WishlistDetailView

urlpatterns = [
    path('<str:username>/', ProfileDetailView.as_view(), name='profile-detail'),
    path('update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('settings/', UserSettingsView.as_view(), name='user-settings'),
    path('wishlist/', WishlistListView.as_view(), name='wishlist-list'),
    path('wishlist/<int:pk>/', WishlistDetailView.as_view(), name='wishlist-detail'),
]
