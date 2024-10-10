from django.db import models

# from django.contrib.auth.models import User

class Watchlist(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)  no user auth yet
    ticker = models.CharField(max_length=10)
    added_at = models.DateTimeField(auto_now_add=True)
