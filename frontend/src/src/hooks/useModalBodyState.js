import { useEffect } from "react";

export default function useModalBodyState(isOpen, extraBodyClass = "") {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.dispatchEvent(new CustomEvent("nexttrip:close-side-menu"));
    document.body.classList.add("nexttrip-modal-open");

    if (extraBodyClass) {
      document.body.classList.add(extraBodyClass);
    }

    return () => {
      document.body.classList.remove("nexttrip-modal-open");

      if (extraBodyClass) {
        document.body.classList.remove(extraBodyClass);
      }
    };
  }, [isOpen, extraBodyClass]);
}
