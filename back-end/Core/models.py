import uuid
from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        """Soft delete: just deactivate."""
        self.is_active = False
        self.save()