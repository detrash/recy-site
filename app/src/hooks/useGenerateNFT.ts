/* eslint-disable react-hooks/rules-of-hooks */
import { toBlob } from 'html-to-image';
import { toast } from 'react-toastify';
import {
  useCreateNftMutation,
  useSubmitFormImageMutation,
} from 'src/graphql/generated/graphql';
import { uploadToS3 } from 'src/utils/uploadToS3';

export const useGenerateNFT = (formId: string) => {
  const [useSubmitFormImage] = useSubmitFormImageMutation();

  const [useCreateNft] = useCreateNftMutation();

  const handleFormAudit = async () => {
    toast.info('Generating NFT metadata, please wait', {
      position: 'bottom-right',
      autoClose: false,
      closeOnClick: false,
      pauseOnHover: false,
      progress: undefined,
    });
    const { data } = await useSubmitFormImage({
      variables: {
        FORM_ID: formId,
      },
    });

    const element = document.getElementById('modal-panel')?.parentElement;
    if (element && data) {
      const dataUrl = await toBlob(element);

      if (dataUrl) {
        const imageFile = new File([dataUrl], `${formId}.png`, {
          type: 'image/png',
        });

        const [, { data: nftData }] = await Promise.all([
          uploadToS3(data.submitFormImage, imageFile),
          useCreateNft({
            variables: {
              FORMID: formId,
            },
          }),
        ]);

        if (nftData) {
          const bytes = new TextEncoder().encode(nftData.createNFT.body);

          const blob = new Blob([bytes], {
            type: 'application/json;charset=utf-8',
          });

          const metadataFile = new File([blob], 'testfile', {
            type: 'application/json',
          });

          await uploadToS3(nftData.createNFT.createMetadataUrl, metadataFile);

          toast.dismiss();
          toast.success('NFT metadata generated with success', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };

  return { handleFormAudit };
};
