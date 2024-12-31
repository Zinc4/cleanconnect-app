import { format } from 'date-fns';

export const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatMonth = (date: string) => {
  return format(new Date(date), 'MMMM yyyy');
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const downloadBillingReport = (month: string, bills: any[]) => {
  // Implementation for downloading billing report
  // This would typically generate a CSV or PDF file
  console.log(`Downloading billing report for ${formatMonth(month)}`);
  console.log('Bills:', bills);
};