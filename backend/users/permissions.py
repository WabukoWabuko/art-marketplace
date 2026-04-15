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

        user = request.user
        if not user or not user.is_authenticated:
            return False

        owner_fields = ['user', 'artist', 'author', 'organizer']
        for field in owner_fields:
            if hasattr(obj, field):
                owner = getattr(obj, field)
                if owner == user:
                    return True

        if hasattr(obj, 'order') and getattr(obj, 'order', None) is not None:
            return obj.order.user == user

        return False