from rest_framework.views import APIView
from rest_framework.response import Response
from sunfish_ivf.serializers.calculator import CalculatorRequestSerializer
from sunfish_ivf.services.calculator import calculate_score

class CalculatorAPIView(APIView):
    authentication_classes = ()

    def post(self, request):
        serializer = CalculatorRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        valid_data = serializer.validated_data
        score = calculate_score(valid_data)

        return Response({'score': score})
