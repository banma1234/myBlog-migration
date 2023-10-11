"use client";

import { useState, useEffect } from "react";
import iconHandler from "app/util/iconHandler";
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
        <div className="toast_ui">
          <p>{props.children}</p>
          <p className="toast_ui_button" onClick={handleUI}>
            {iconHandler("cancel", "18px")}
          </p>
        </div>
      )}
    </>
  );
}
