from django.urls import path
from .views import ArtworkListCreateView, ArtworkDetailView, CategoryListView

urlpatterns = [
    path('', ArtworkListCreateView.as_view(), name='artwork-list-create'),
    path('<int:pk>/', ArtworkDetailView.as_view(), name='artwork-detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
]