from django.contrib import admin
from .models import BugTracker

class BugTrackerAdmin(admin.ModelAdmin):
  list_display = ('id',
                  'title',
                  'project',
                  'outstanding',
                  'short_description',
                  'long_description',
                  'code_block',
                  'create_date',
                  'modified_date',
                  'close_date',
                  'resolution',
                  'ref_link',
                  'technology')

# Register models
admin.site.register(BugTracker, BugTrackerAdmin)