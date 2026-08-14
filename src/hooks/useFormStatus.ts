import { useState, useEffect } from "react";

export function useDispatchFormStatus(
  eventName: string,
  isSubmitting: boolean,
) {
  useEffect(() => {
    const event = new CustomEvent(eventName, {
      detail: { loading: isSubmitting },
    });

    dispatchEvent(event);
  }, [eventName, isSubmitting]);
}

export function useFormStatusListener(eventName: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleLoading = (e: Event) => {
      const customEvent = e as CustomEvent<{ loading: boolean }>;
      setIsSubmitting(customEvent.detail.loading);
    };

    window.addEventListener(eventName, handleLoading);

    return () => {
      window.removeEventListener(eventName, handleLoading);
    };
  }, [eventName]);

  return isSubmitting;
}
