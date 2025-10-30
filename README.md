فروشگاه طوسی — نسخهٔ آماده برای GitHub + Vercel

این پروژه حاوی:
- صفحات استاتیک: index.html, products.html, about.html, contact.html
- فایل محصولات: products.json (قابل ویرایش در GitHub)
- پوشه تصاویر: /assets
- فایل جاوااسکریپت frontend: shop.js (سبد خرید با localStorage)
- توابع سرورلس آماده برای Vercel: /api/checkout.js و /api/webhook.js
- package.json با dependency بر روی stripe (در صورت استفاده از Stripe)

راه‌اندازی سریع:
1. در GitHub یک مخزن جدید بساز (مثلاً: toosishop) و تمام فایل‌های این پوشه را آپلود کن.
2. در Vercel یک پروژه جدید بساز و GitHub را متصل کن. انتخاب ریپازیتوری toosishop و Deploy کن.
3. برای درگاه پرداخت: در Vercel به Settings → Environment Variables مقدار STRIPE_SECRET را قرار بده (برای Stripe) یا ZARINPAL_MERCHANT برای زارین‌پال، و DOMAIN را برابر با آدرس سایتت (مثلاً https://toosishop.vercel.app).
4. فایل products.json را ویرایش کن تا محصولات و قیمت‌ها را تغییر دهی. تصاویر را در /assets آپلود کن.
5. اگر خواستی من webhook و ذخیره سفارش را به Google Sheets یا ایمیل متصل کنم، من انجام می‌دهم.
