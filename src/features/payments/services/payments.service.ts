import { privateAxios } from '@/lib';

export const PaymentsService = {
  purchaseProduct: async (productId: string, userId: string): Promise<string> => {
    const response = await privateAxios.post('/payments/create-checkout', {
      productId,
      userId,
    });

    return response.data.checkoutUrl;
  },
};
