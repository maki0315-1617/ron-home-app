export const SITE_URL = "https://ron-home-app.vercel.app";

/** ロンスケ＋ジュール デモ（別サイト・新しいタブで開く） */
export const DEMO_APP_URL = "https://ron-sch.vercel.app/?demo=1";

/** スタンダードプラン（¥350）の Stripe テスト用支払いリンク */
export const STRIPE_STANDARD_CHECKOUT_URL =
  "https://buy.stripe.com/test_00w14nbVPdKF3121v5gUM01";

/** Sプラスプラン（¥450）の Stripe テスト用支払いリンク */
export const STRIPE_SPLUS_CHECKOUT_URL =
  "https://buy.stripe.com/test_aFadR90d7cGB6de1v5gUM02";

/** 料金プランの checkout キー → 支払いリンク */
export const STRIPE_CHECKOUT_URLS = {
  standard: STRIPE_STANDARD_CHECKOUT_URL,
  s_plus: STRIPE_SPLUS_CHECKOUT_URL,
};
