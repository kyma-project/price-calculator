export default function selectNextStep(button: any) {
  const currenStep = button.closest('ui5-wizard-step');
  const nextStep = currenStep.nextElementSibling;

  currenStep.selected = false;
  nextStep.selected = true;
  nextStep.disabled = false;












  



}
