export const SITE_URL = "https://ron-home-app.vercel.app";

/** ロンスケ＋ジュール デモ（別サイト・新しいタブで開く） */
export const DEMO_APP_URL = "https://ron-sch.vercel.app/?demo=1";

/** 茶話会・みんなで脳活 */
export const BRAIN_CLUB_URL = "https://sawakaichat.vercel.app/";

/** 茶話会の運営支援（1回 ¥500）の Stripe 支払いリンク */
export const STRIPE_BRAIN_SUPPORT_URL =
  "https://buy.stripe.com/bJedR95xrgWRcBCehRgUM00";

/** スタンダードプラン（月額 ¥200）の Stripe 本番用支払いリンク */
export const STRIPE_STANDARD_CHECKOUT_URL =
  "https://buy.stripe.com/00w14nbVPdKF3121v5gUM01";

/** Sプラスプラン（月額 ¥300）の Stripe 本番用支払いリンク */
export const STRIPE_SPLUS_CHECKOUT_URL =
  "https://buy.stripe.com/aFadR90d7cGB6de1v5gUM02";

/** 料金プランの checkout キー → 支払いリンク */
export const STRIPE_CHECKOUT_URLS = {
  standard: STRIPE_STANDARD_CHECKOUT_URL,
  s_plus: STRIPE_SPLUS_CHECKOUT_URL,
};
