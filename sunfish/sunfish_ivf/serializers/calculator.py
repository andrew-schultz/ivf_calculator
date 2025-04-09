from rest_framework import serializers


class CalculatorRequestSerializer(serializers.Serializer):
    age = serializers.IntegerField()
    weight = serializers.IntegerField() # in pounds
    height = serializers.IntegerField() # in inches
    prior_ivf = serializers.IntegerField()
    prior_pregnancies = serializers.IntegerField()     
    live_births = serializers.IntegerField() # can be null / false, required if prior_pregnancies is > 0
    male_factor_infertility = serializers.BooleanField()
    endometriosis = serializers.BooleanField()
    tubal_factor = serializers.BooleanField()
    ovulatory_disorder = serializers.BooleanField()
    diminished_ovarian_reserve = serializers.BooleanField()
    uterine_factor = serializers.BooleanField()
    other_reason = serializers.BooleanField()
    unexplained_infertility = serializers.BooleanField()
    no_reason = serializers.BooleanField()
    use_own_eggs = serializers.BooleanField() # the 2 options are 'my own eggs' and 'donor eggs', true == 'my own eggs', false == 'donor eggs'
