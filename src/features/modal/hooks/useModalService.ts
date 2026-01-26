import { useModal } from "@/features/modal/store";
import { ModalService } from "@/features/modal/service";
import { useMemo } from "react";

export const useModalService = () => {
  const modalState = useModal();
  return useMemo(() => {
    return new ModalService(modalState);
  }, [modalState]);
};
