import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type PortalProps = {
  children: ReactNode;
};

export function ModalPortal({ children }: PortalProps) {
  const modal = document.getElementById("modal");

  if (!modal) return null;

  return createPortal(children, modal);
}
