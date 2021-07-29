import { Toast } from 'bootstrap';
import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback((errorText) => {
    var myToastEl = document.getElementById('myToastEl');
    if (!myToastEl || !errorText) return;
    myToastEl.querySelector('.toast-body').textContent = errorText;
    var myToast = Toast.getOrCreateInstance(myToastEl);
    myToast.show();
  }, []);
};
