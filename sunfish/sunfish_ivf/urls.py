from django.urls import path

from sunfish_ivf.views import calculator

calculator_urlpatterns = [
    path('', calculator.CalculatorAPIView.as_view(), name='calculator'),
]
