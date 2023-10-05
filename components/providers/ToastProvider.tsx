"use client";

import { Toaster } from "sonner";

const ToastProvider = () => {
  return <Toaster richColors position="top-right" duration={2000} />;
};

export default ToastProvider;
