from rest_framework import serializers


class CalculatorRequestSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=20, max_value=50)
    weight = serializers.IntegerField(min_value=80, max_value=300) # in pounds
    height = serializers.IntegerField(min_value=54, max_value=72) # in inches
    prior_ivf = serializers.IntegerField()
    prior_pregnancies = serializers.IntegerField()     
    live_births = serializers.IntegerField(default=0) # can be null / false, required if prior_pregnancies is > 0
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
        
    def validate(self, data):
        errors = {}
        # live_births is only required if prior_pregnancies is > 0
        if data['prior_pregnancies'] > 0:
            try:
                if not data['live_births'] >= 0 :
                    errors['live_births'] = 'live_births is required'
            except KeyError:
                errors['live_births'] = 'live_births is required'
        else:
            data['live_births'] = 0

        # validate that theres at least 1 "reason for using IVF" value
        reason_fields = data['male_factor_infertility'] or data['endometriosis'] or data['tubal_factor'] or data['ovulatory_disorder'] or data['diminished_ovarian_reserve'] or data['uterine_factor'] or data['other_reason']
        if reason_fields or data['no_reason'] or data['unexplained_infertility']:
            pass
        else:
            errors["reason_fields"] = "at least one reason field must be selected"

        if errors:
            raise serializers.ValidationError(errors)

        return data


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
