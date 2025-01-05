# Generated by Django 5.1.1 on 2025-01-05 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Watchlist",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ticker", models.CharField(max_length=10)),
                ("added_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]