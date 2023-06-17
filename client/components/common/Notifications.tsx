import { toast } from 'react-toastify';

export const Notifications = (type : 'success' | 'error', message: string) => {
  const notifications = {
    success: toast.success,
    error: toast.error
  }
  
  return notifications[type]?.(message);
}