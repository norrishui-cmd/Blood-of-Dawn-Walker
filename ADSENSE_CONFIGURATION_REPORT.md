# AdSense Site-Wide Configuration

Date: 2026-07-18

## Account

- AdSense account: `ca-pub-9505220977121599`
- Publisher ID: `pub-9505220977121599`

## Configured

- The asynchronous AdSense loader is present exactly once in the `<head>` of every HTML file.
- The `google-adsense-account` meta tag is present exactly once in every HTML file.
- Root `/ads.txt` contains the required Google DIRECT publisher record.
- Configuration covers English, German, Spanish, 404, and reusable HTML templates.
- The loader includes `crossorigin="anonymous"` as supplied by AdSense.

## Deployment Check

After deployment, verify these public URLs:

1. `https://bloodofdawnwalker.cc/ads.txt`
2. View source on `https://bloodofdawnwalker.cc/`
3. View source on one German and one Spanish page

Then select any one of the three AdSense ownership methods and click **Verify**. All three methods are configured, but Google only needs one to succeed.
