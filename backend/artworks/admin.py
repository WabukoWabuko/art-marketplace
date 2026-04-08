from django.contrib import admin
from .models import Artwork, Category

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'price', 'currency', 'is_available', 'created_at')
    list_filter = ('currency', 'is_available', 'category')
    search_fields = ('title', 'description', 'artist__username')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
