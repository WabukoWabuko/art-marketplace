from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Artwork, Category
from .serializers import ArtworkSerializer, CategorySerializer
from users.permissions import IsArtist, IsOwnerOrReadOnly

class ArtworkListCreateView(generics.ListCreateAPIView):
    queryset = Artwork.objects.filter(is_available=True)
    serializer_class = ArtworkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        artist = self.request.query_params.get('artist')
        if category:
            queryset = queryset.filter(category__name=category)
        if artist:
            queryset = queryset.filter(artist__username=artist)
        return queryset

class ArtworkDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [IsOwnerOrReadOnly]

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
