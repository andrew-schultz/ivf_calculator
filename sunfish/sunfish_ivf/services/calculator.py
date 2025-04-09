import csv
import os
from django.conf import settings


def parse_csv():
    csv_filepath = os.path.join(settings.BASE_DIR, 'static', 'ivf_success_formulas.csv')
    formula_dict = {}

    with open(csv_filepath, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)
        for index, row in enumerate(reader):
            print(row)
            row_dict = {}
            for i, val in enumerate(row):
                print(header[i], val)
                row_dict[header[i]] = val
            formula_dict[index] = row_dict
                
            # data = list(reader)
            # print(data)
            # print(header)
    return formula_dict
    

def select_formula(param_using_own_eggs, param_attempted_ivf_previously, param_is_reason_for_infertility_known):
    formulas_dict = parse_csv()
    formula_dict = None
    print('own eggs', param_using_own_eggs)
    print('ivf', param_attempted_ivf_previously)
    print('reason', param_is_reason_for_infertility_known)
    for f in formulas_dict:
        if (formulas_dict[f]['param_using_own_eggs'].lower() == param_using_own_eggs) and \
            (formulas_dict[f]['param_attempted_ivf_previously'].lower() == param_attempted_ivf_previously) and \
            (formulas_dict[f]['param_is_reason_for_infertility_known'].lower() == param_is_reason_for_infertility_known):
            formula_dict = formulas_dict[f] 

    return formula_dict

def calc_bmi(weight, height):
    bmi = weight / height**2 * 703
    return bmi


def calc_age(age):
    return age


def calculate_score(data):
    using_own_eggs = str(data.get('use_own_eggs')).lower()
    prior_ivf = 'true' if data.get('prior_ivf') else 'false'
    no_reason = 'true' if data.get('no_reason') else 'false'

    formula = select_formula(using_own_eggs, prior_ivf, no_reason)
    print(formula)
    # score = 
    #     formula_intercept +
    #     formula_age_linear_coefficient ✕ user_age + formula_age_power_coefficient ✕ (user_age ^ formula_age_power_factor) +
    #     formula_bmi_linear_coefficient ✕ user_bmi + formula_bmi_power_coefficient ✕ (user_bmi ^ formula_bmi_power_factor) +
    #     formula_tubal_factor_value +
    #     formula_male_factor_infertility_value +
    #     formula_endometriosis_value +
    #     formula_ovulatory_disorder_value +
    #     formula_diminished_ovarian_reserve_value +
    #     formula_uterine_factor_value +
    #     formula_other_reason_value +
    #     formula_unexplained_infertility_value +
    #     formula_prior_pregnancies_value +
    #     formula_prior_live_births_value
    return True