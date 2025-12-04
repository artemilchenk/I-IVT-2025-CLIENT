import type { FormState, TFormType } from "../types";

export class FormService {
  private readonly formState: FormState;
  constructor(formState: FormState) {
    this.formState = formState;
  }

  checkForm(currentForm: TFormType) {
    return this.formState.forms.find((form) => form === currentForm);
  }

  openForm(type: TFormType) {
    this.formState.setForms([...this.formState.forms, type]);
  }

  closeForm(type: TFormType) {
    this.formState.setForms(
      this.formState.forms.filter((form) => form !== type),
    );
  }
}
