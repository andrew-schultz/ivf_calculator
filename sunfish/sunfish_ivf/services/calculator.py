import csv
import math
import os
from django.conf import settings
from sunfish_ivf.serializers.calculator import FormulaDictSerializer


def parse_csv():
    csv_filepath = os.path.join(settings.BASE_DIR, 'static', 'ivf_success_formulas.csv')
    formula_dict = {}

    with open(csv_filepath, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)
        for index, row in enumerate(reader):
            row_dict = {}
            for i, val in enumerate(row):
                row_dict[header[i]] = val
            formula_dict[index] = row_dict

    return formula_dict
    

def get_param_using_own_eggs(param):
    return str(param).lower()


def get_param_attempted_ivf_previously(param):
    if param == 0:
        return 'false'
    else:
        return 'true'


def get_param_is_reason_for_infertility_known(param):
    # if the no_reason param is anything but 0, this is 'true'
    return 'false' if param else 'true'


def select_formula(param_using_own_eggs, param_attempted_ivf_previously, param_is_reason_for_infertility_known):
    formulas_dict = parse_csv()
    formula_dict = None

    for f in formulas_dict:
        using_own_eggs_match = formulas_dict[f]['param_using_own_eggs'].lower() == param_using_own_eggs
        prior_ivf_match = formulas_dict[f]['param_attempted_ivf_previously'].lower() == param_attempted_ivf_previously
        reason_for_infertility_known_match = formulas_dict[f]['param_is_reason_for_infertility_known'].lower() == param_is_reason_for_infertility_known

        # if the user is not using their own eggs then we don't need a match on the prior_ivf params
        if param_using_own_eggs == 'true':
            # need all 3 matches
            if using_own_eggs_match and prior_ivf_match and reason_for_infertility_known_match:
                formula_dict = formulas_dict[f]
                print(formula_dict['cdc_formula'])
                break
        else:
            # need only using eggs and reason for infertility known matches
            if using_own_eggs_match and reason_for_infertility_known_match:
                formula_dict = formulas_dict[f]
                print(formula_dict['cdc_formula'])
                break

    # handle special case of the 2+ fields, serializer doesn't like the '+'
    formula_dict['formula_prior_pregnancies_2_value'] = formula_dict['formula_prior_pregnancies_2+_value']
    formula_dict['formula_prior_live_births_2_value'] = formula_dict['formula_prior_live_births_2+_value']

    # ensure formula vals are of expected types for math
    serializer = FormulaDictSerializer(data=formula_dict)
    serializer.is_valid(raise_exception=True)
    return serializer.validated_data


def calc_bmi(weight, height, formula):
    user_bmi = weight / (height**2) * 703
    bmi = formula['formula_bmi_linear_coefficient'] * user_bmi + formula['formula_bmi_power_coefficient'] * (user_bmi ** formula['formula_bmi_power_factor'])
    return bmi


def calc_age(input_age, formula):
    user_age = input_age
    float_age = float(input_age)
    age = formula['formula_age_linear_coefficient'] * user_age + formula['formula_age_power_coefficient'] * (float_age ** formula['formula_age_power_factor'])
    return age


def get_formula_value(key, value, formula):
    if value == '2':
        value = '2+'
    formula_string = f'formula_{key}_{str(value).lower()}_value'
    return formula[formula_string]


def calculate_score(data):
    # get vals to determine formula
    using_own_eggs = get_param_using_own_eggs(data.get('use_own_eggs'))
    prior_ivf = get_param_attempted_ivf_previously(data.get('prior_ivf'))
    no_reason = get_param_is_reason_for_infertility_known(data.get('no_reason'))
    formula = select_formula(using_own_eggs, prior_ivf, no_reason)

    # get values derived from selected formula
    formula_intercept = formula['formula_intercept'] 
    age = calc_age(data.get('age'), formula)
    bmi = calc_bmi(data.get('weight'), data.get('height'), formula)
    tubal_factor = get_formula_value('tubal_factor', data.get('tubal_factor'), formula)
    male_factor_infertility = get_formula_value('male_factor_infertility', data.get('male_factor_infertility'), formula)
    endometriosis = get_formula_value('endometriosis', data.get('endometriosis'), formula)
    ovulatory_disorder = get_formula_value('ovulatory_disorder', data.get('ovulatory_disorder'), formula)
    diminished_ovarian_reserve = get_formula_value('diminished_ovarian_reserve', data.get('diminished_ovarian_reserve'), formula)
    uterine_factor = get_formula_value('uterine_factor', data.get('uterine_factor'), formula)
    unexplained_infertility = get_formula_value('unexplained_infertility', data.get('unexplained_infertility'), formula)
    other_reason = get_formula_value('other_reason', data.get('other_reason'), formula)
    prior_pregnancies = get_formula_value('prior_pregnancies', data.get('prior_pregnancies'), formula)
    prior_live_births = get_formula_value('prior_live_births', data.get('live_births'), formula)

    score = (
        + formula_intercept
        + age
        + bmi
        + tubal_factor 
        + male_factor_infertility 
        + endometriosis 
        + ovulatory_disorder 
        + diminished_ovarian_reserve 
        + uterine_factor 
        + other_reason 
        + unexplained_infertility 
        + prior_pregnancies 
        + prior_live_births)
    
    success_rate = math.e**score / (1 + math.e**score)
    return success_rate
