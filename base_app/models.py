from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.CharField(max_length=150, null=True, blank=True)
    post_publish_data = models.DateTimeField(auto_now_add=True)
    post_image = models.ImageField(upload_to='images/', null=True, blank=True)
