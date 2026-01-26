export interface ModalState {
  isModal: boolean;
  setModal: (value: boolean) => void;
}

export type ModalStateReadOnly = Omit<ModalState, "setModal">;
