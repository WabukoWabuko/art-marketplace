from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Tutorial
from .serializers import TutorialSerializer
from users.permissions import IsOwnerOrReadOnly

class TutorialListCreateView(generics.ListCreateAPIView):
    queryset = Tutorial.objects.all().order_by('-created_at')
    serializer_class = TutorialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TutorialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [IsOwnerOrReadOnly]
