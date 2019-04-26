
export const EmisorFeedbackMixin = ((superclass) => {
  return class extends superclass {
    positiveFeedback(msg) {
      this.dispatchEvent(new CustomEvent('toast-message', {
        detail: msg,
        bubbles: true,
        composed: true
      }));
    }
    negativeFeedback(msg) {
      this.dispatchEvent(new CustomEvent('toast-error', {
        detail: msg,
        bubbles: true,
        composed: true
      }));
    }
  }
});
