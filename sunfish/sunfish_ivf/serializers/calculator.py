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


class FormulaDictSerializer(serializers.Serializer):
    param_using_own_eggs = serializers.CharField()
    param_attempted_ivf_previously = serializers.CharField()
    param_is_reason_for_infertility_known = serializers.CharField()
    cdc_formula = serializers.CharField()
    formula_intercept = serializers.FloatField()
    formula_age_linear_coefficient = serializers.FloatField()
    formula_age_power_coefficient = serializers.FloatField()
    formula_age_power_factor = serializers.FloatField()
    formula_bmi_linear_coefficient = serializers.FloatField()
    formula_bmi_power_coefficient = serializers.FloatField()
    formula_bmi_power_factor = serializers.FloatField() # 2
    formula_tubal_factor_true_value = serializers.FloatField()
    formula_tubal_factor_false_value = serializers.FloatField()
    formula_male_factor_infertility_true_value = serializers.FloatField()
    formula_male_factor_infertility_false_value = serializers.FloatField()
    formula_endometriosis_true_value = serializers.FloatField()
    formula_endometriosis_false_value = serializers.FloatField()
    formula_ovulatory_disorder_true_value = serializers.FloatField()
    formula_ovulatory_disorder_false_value = serializers.FloatField()
    formula_diminished_ovarian_reserve_true_value = serializers.FloatField()
    formula_diminished_ovarian_reserve_false_value = serializers.FloatField()
    formula_uterine_factor_true_value = serializers.FloatField()
    formula_uterine_factor_false_value = serializers.FloatField()
    formula_other_reason_true_value = serializers.FloatField()
    formula_other_reason_false_value = serializers.FloatField()
    formula_unexplained_infertility_true_value = serializers.FloatField()
    formula_unexplained_infertility_false_value = serializers.FloatField()
    formula_prior_pregnancies_0_value = serializers.FloatField()
    formula_prior_pregnancies_1_value = serializers.FloatField()
    formula_prior_pregnancies_2_value = serializers.FloatField()
    formula_prior_live_births_0_value = serializers.FloatField()
    formula_prior_live_births_1_value = serializers.FloatField()
    formula_prior_live_births_2_value = serializers.FloatField()
