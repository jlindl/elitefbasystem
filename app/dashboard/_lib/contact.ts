/** Jakub's WhatsApp - the one place members message him from the dashboard. */
export const WHATSAPP_NUMBER = "447765977085";
export const WHATSAPP_DISPLAY = "+44 7765 977085";

/** A wa.me link that opens WhatsApp with the message typed out, ready to send. */
export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text) return base;
  // A half emoji (lone surrogate) would make encodeURIComponent throw, so drop it.
  const safe = text.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "");
  return `${base}?text=${encodeURIComponent(safe)}`;
}
