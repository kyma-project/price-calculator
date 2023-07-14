export default function selectPreviousStep(button: any) {
  const currenStep = button.closest('ui5-wizard-step');
  const previousStep = currenStep.previousElementSibling;

  currenStep.selected = false;
  previousStep.selected = true;
}
