from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'date', 'location', 'max_attendees')
    list_filter = ('date', 'location')
    search_fields = ('title', 'description', 'organizer__username')
