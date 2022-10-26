export function getResiduesSum(forms: any) {
  return forms.reduce((totalAmount: any, currentForm: any) => {
    const totalDocumentsAmount = currentForm.documents.reduce(
      (amountTotal: any, currentDocument: any) => {
        amountTotal += currentDocument.amount;
        return amountTotal;
      },
      0
    );
    return (totalAmount += totalDocumentsAmount);
  }, 0);
}
