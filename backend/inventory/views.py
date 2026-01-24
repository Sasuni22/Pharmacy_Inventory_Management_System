from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Medicine
from .serializers import MedicineSerializer

class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def sell(self, request, pk=None):
        """Sell a medicine and reduce quantity"""
        medicine = self.get_object()
        amount = int(request.data.get('amount', 1))  # default sell 1

        if medicine.quantity >= amount:
            medicine.quantity -= amount
            medicine.save()
            return Response(
                {"message": f"{amount} unit(s) sold", "new_quantity": medicine.quantity},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Not enough stock to sell"},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['post'])
    def restock(self, request, pk=None):
        """Restock a medicine and increase quantity"""
        medicine = self.get_object()
        amount = int(request.data.get('amount', 1))  # default restock 1

        medicine.quantity += amount
        medicine.save()
        return Response(
            {"message": f"{amount} unit(s) added", "new_quantity": medicine.quantity},
            status=status.HTTP_200_OK
        )
