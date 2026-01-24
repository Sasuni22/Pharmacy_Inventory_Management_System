from django.db import models

class Medicine(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    expiry_date = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.brand})"
