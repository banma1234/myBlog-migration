"use client";

import { useState, useEffect } from "react";
import iconHandler from "util/iconHandler";
import "../../styles/toastMessageStyle.scss";

export default function ToastMessage(props: { children: string }) {
  const [open, isOpen] = useState<boolean>(true);

  useEffect(() => {
    isOpen(true);
  }, []);

  const handleUI = () => {
    isOpen(false);
  };

  return (
    <>
      {open && (
        <div className="toast__ui">
          <p>{props.children}</p>
          <p className="toast__ui__button" onClick={handleUI}>
            {iconHandler("cancel", "18px")}
          </p>
        </div>
      )}
    </>
  );
}
