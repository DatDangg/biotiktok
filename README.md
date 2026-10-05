# PEDA EDU — Landing Page

Trang giới thiệu/link cho **PEDA EDU – Hệ Thống Ôn Thi Đánh Giá Năng Lực Sư Phạm**.
Mục đích: làm link chính thức đặt trong bio TikTok / Facebook / Instagram, không phụ
thuộc vào bất kỳ nền tảng trung gian nào.

## Cấu trúc

```
index.html            # toàn bộ nội dung + link
vercel.json           # header bảo mật (CSP, HSTS, ...) + cache ảnh
assets/style.css      # toàn bộ style
assets/script.js      # gắn UTM cho link ra ngoài + animation nút nổi bật
assets/img/           # ảnh (cover nền, icon nút, ảnh card)
README.md
```

Không có framework, không build, không dependency — chỉ HTML/CSS/JS thuần.

## Links

| Nút | Đích |
|---|---|
| Fanpage PEDA EDU | `https://www.facebook.com/onthidgnldaihocsuphamhanoi` |
| Đăng Ký Tư Vấn Khóa Học | Google Form tư vấn |
| 2K9 Ôn Thi DGNL Sư Phạm | `https://zalo.me/g/cbpdtx238` |
| Đăng Ký Thi Thử | Google Form thi thử |
| Card PEDA EDU | `https://peda.edu.vn/` |

Mọi link http tự động được gắn `utm_medium=social&utm_source=pedalink&utm_campaign=<tên nút>`
để đo được nguồn click. Đổi nguồn thì sửa `data-source` trong `index.html`.

## Chạy local

```bash
cd ~/Desktop/biotiktok
python3 -m http.server 8000
# http://localhost:8000
```

## Deploy

Deploy tĩnh lên bất kỳ host nào cũng được: Vercel, Netlify, Cloudflare Pages, GitHub Pages.

### Vercel (từ GitHub)

Import repo `DatDangg/biotiktok` tại `https://vercel.com/new`. Mỗi lần `git push`
là tự deploy. Không cần build command, output directory để trống.

### Vercel (từ CLI)

```bash
cd ~/Desktop/biotiktok
npx vercel@latest --prod --yes
```

### Dùng subdomain của domain công ty

1. Vercel → Project → **Settings → Domains → Add** → gõ `onthi.<domain-công-ty>`
2. Vercel hiển thị đích CNAME (vd `cname.vercel-dns-xxx.com`)
3. Nhờ IT thêm bản ghi DNS:

   | Name | Type | Value | TTL |
   |---|---|---|---|
   | `onthi` | CNAME | đúng chuỗi Vercel báo | 3600 |

4. Chờ Vercel verify (5–60 phút) → tự cấp HTTPS, site lên `https://onthi.<domain>`

Lưu ý: nếu DNS dùng Cloudflare thì bản ghi CNAME đó để chế độ **DNS only (mây xám)**.

## Bảo mật

`vercel.json` đã cấu hình sẵn:

- `Content-Security-Policy` — chỉ cho phép tài nguyên của chính site (+ Google Fonts)
- `Strict-Transport-Security` — ép HTTPS
- `X-Frame-Options` — chống bị nhúng vào frame của site khác
- `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- Cache immutable 1 năm cho ảnh trong `assets/img/`

Trang không có backend, không cookie, không tracking, không thu thập dữ liệu người dùng.

## Sửa nhanh

| Muốn đổi | Sửa ở đâu |
|---|---|
| Link / nội dung nút | `index.html` |
| Màu, bo góc, cỡ chữ, khoảng cách | biến ở `:root` trong `assets/style.css` |
| Ảnh | thay file trong `assets/img/` (giữ tên) hoặc sửa `src` |
| Bật/tắt animation nút Zalo | bỏ/thêm class `jello` trong `index.html` |
| Nguồn UTM | `data-source` trong `.content-list` |

## Ghi chú kỹ thuật

- Font: Montserrat từ Google Fonts, có fallback sans-serif
- Nền trang: ảnh cover blur 30px; khung nội dung đen bo góc 40px, rộng tối đa 640px
- Breakpoint responsive: ≤480px và ≤340px (giảm cỡ nút/chữ)
- Hỗ trợ `prefers-reduced-motion`: tự tắt animation
- Dùng đường dẫn tương đối (`assets/...`) nên chạy được ở cả root lẫn subfolder