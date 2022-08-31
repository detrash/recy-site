import { Dialog, Transition } from '@headlessui/react';
import { X } from 'phosphor-react';
import { Fragment } from 'react';

type ModalProps = {
  content: JSX.Element;
  isOpen: boolean;
  onCloseModal: (isOpen: boolean) => void;
  title: string;
};

const Modal: React.FC<ModalProps> = ({
  content,
  isOpen,
  onCloseModal,
  title,
}) => {
  function closeModal() {
    onCloseModal(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-4 sm:mb-8 relative"
                >
                  {title}
                  <button onClick={closeModal}>
                    <X className="h-6 w-6 text-gray-600 absolute right-0 top-0" />
                  </button>
                </Dialog.Title>
                <div className="mt-2">{content}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
