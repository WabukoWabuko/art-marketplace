from rest_framework.permissions import BasePermission

class IsArtist(BasePermission):
    """
    Custom permission to only allow artists to access certain views.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_artist

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return obj.user == request.user