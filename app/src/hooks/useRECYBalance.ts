import { useEffect, useRef } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

const CRECY_TOKEN_ADDRESS = '0x34C11A932853Ae24E845Ad4B633E3cEf91afE583';

export const useRECYBalance = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const hasTriggeredError = useRef(false);

  const { data, isLoading, error } = useBalance({
    addressOrName: address,
    token: CRECY_TOKEN_ADDRESS,
  });

  useEffect(() => {
    if (error && !hasTriggeredError.current) {
      hasTriggeredError.current = true;
      toast.error(t('common:error_fetching_recy'), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (data) {
      hasTriggeredError.current = false;
    }
  }, [data, error, t]);

  return { data, isLoading };
};
