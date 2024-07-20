import { FORM_REGEX, REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD_SIGN_UP } from '@constants/regex';
import { useTranslation } from 'react-i18next';
import { string, object, ref } from 'yup';

const useValidation = () => {
  const { t } = useTranslation() as any;

  const useShape = (schemaObj: any) => {
    return object().shape(schemaObj) as any;
  };

  const emailSchema = string()
    .required(t('form:error_message:email_is_required'))
    .matches(REGEX_EMAIL, t('form:error_message:enter_valid_email'));

  const firstNameSchema = string().required(t('form:error_message:first_name_is_required'));

  const lastNameSchema = string().required(t('form:error_message:last_name_is_required'));

  const passwordSchema = string()
    .required(t('form:error_message:password_is_required'))
    .min(8, t('form:error_message:enter_valid_password'));

  const oldPasswordSchema = string()
    .required(t('form:error_message:current_password_is_required'))
    .min(8, t('form:error_message:enter_valid_password'));

  const newPasswordSchema = string()
    .required(t('form:error_message:new_password_is_required'))
    .min(8, t('form:error_message:enter_valid_password'))
    .test(
      'new_password_compare',
      t('form:error_message:new_password_must_be_different'),
      function (value) {
        if (!this.parent.oldPassword) return true;

        return this.parent.oldPassword !== value;
      }
    );

  const confirmNewPasswordSchema = string()
    .required(t('form:error_message:confirm_new_password_is_required'))
    .test(
      'confirm_new_password_compare',
      t('form:error_message:confirm_new_password_is_not_match'),
      function (value) {
        if (!this.parent.password) return true;

        return this.parent.password === value;
      }
    );

  const passwordSignUpSchema = string()
    .required(t('form:error_message:password_is_required'))
    .matches(REGEX_PASSWORD_SIGN_UP, t('form:error_message:enter_valid_password'));
  const confirmPasswordSchema = string()
    .required(t('form:error_message:confirm_password_is_required'))
    .test({
      name: 'can_not_max',
      exclusive: false,
      message: t('form:error_message:the_password_not_match'),
      test: function validateConfirmPassword() {
        const { password, confirmPassword } = this.parent;
        if (!password) {
          return true;
        }

        return password === confirmPassword;
      }
    });

  const nameSchema = string()
    .required(t('form:error_message:your_name_is_required'))
    .max(100, t('form:error_message:maximum_character'))
    .matches(REGEX_NAME, t('form:error_message:contains_special_characters'));

  const partnerNameSchema = string()
    .required(t('form:error_message:your_partner_name_is_required'))
    .max(100, t('form:error_message:maximum_character'))
    .matches(REGEX_NAME, t('form:error_message:contains_special_characters'));

  const relationshipSchema = string().required(
    t('form:error_message:your_relationship_is_required')
  );

  const phoneSchema = string()
    .required(t('form:error_message:phone_number_is_required'))
    .test('phone-validation', t('form:error_message:invalid_phone_number'), function (value) {
      return FORM_REGEX.test(value);
    });

  const inviteEmailSchema = emailSchema.notOneOf(
    [ref('partnerEmail'), null],
    t('form:error_message:email_must_be_different')
  );

  return {
    useShape,
    emailSchema,
    passwordSchema,
    passwordSignUpSchema,
    confirmPasswordSchema,
    nameSchema,
    partnerNameSchema,
    relationshipSchema,
    phoneSchema,
    inviteEmailSchema,
    newPasswordSchema,
    confirmNewPasswordSchema,
    oldPasswordSchema,
    firstNameSchema,
    lastNameSchema
  };
};

export default useValidation;
