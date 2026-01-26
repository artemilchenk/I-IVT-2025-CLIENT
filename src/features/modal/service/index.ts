import type { ModalState, ModalStateReadOnly } from "@/features/modal/types.ts";

export class ModalService {
  private modalState: ModalState;

  constructor(modalState: ModalState) {
    this.modalState = modalState;
  }

  get readOnlyState(): ModalStateReadOnly {
    const { setModal: _, ...rest } = this.modalState;
    return rest;
  }

  open() {
    this.modalState.setModal(true);
  }

  close() {
    this.modalState.setModal(false);
  }
}
