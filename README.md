# PEDA EDU — static clone của trang Linkbio

Bản clone tĩnh (HTML/CSS/JS thuần) của trang `https://linkbio.co/8022503eTd5Rd`
(PEDA EDU – Hệ Thống Ôn Thi SPT), dựng lại theo đúng theme `gedu_0` của Linkbio:
nền đen, chữ trắng, nút bo tròn 30px viền trắng, font Montserrat, avatar tròn 100px.

## Cấu trúc

```
index.html            # toàn bộ nội dung + link
assets/style.css      # style (đã gom sẵn biến CSS của theme gedu_0)
assets/script.js      # UTM tracking + animation nút "featured"
assets/img/           # ảnh đã tải về local (không phụ thuộc CDN Linkbio)
```

## Links (đều mở tab mới, click được)

| Nút | Đích |
|---|---|
| 2K9 Ôn Thi DGNL Sư Phạm | `https://zalo.me/g/cbpdtx238` |
| Đăng Ký Tư Vấn Khóa Học | Google Form tư vấn |
| Fanpage PEDA EDU | `https://www.facebook.com/onthidgnldaihocsuphamhanoi` |
| Đăng Ký Thi Thử | Google Form thi thử |
| Card PEDA EDU | `https://peda.edu.vn/` |

Mọi link http tự động được gắn `utm_medium=social&utm_source=instabio&utm_campaign=<tên nút>`
(y hệt bản gốc) — sửa `data-campaign` trong `index.html` nếu muốn đổi.

## Chạy thử

```bash
cd /home/alpenliebe/Desktop/biotiktok
python3 -m http.server 8000
# mở http://localhost:8000
```

Không cần build/server — copy thư mục lên hosting tĩnh (GitHub Pages, Netlify,
Vercel, Cloudflare Pages, hay bất kỳ host nào) là chạy.

## Sửa nhanh

- **Đổi link/nội dung**: sửa trực tiếp trong `index.html`.
- **Đổi màu/bo góc**: biến ở `:root` trong `assets/style.css`
  (`--block-corner`, `--block-bg-color`, `--profile-size`...).
- **Đổi ảnh**: thay file trong `assets/img/` (giữ tên, hoặc sửa `src`).
- **Bật/tắt animation nút 2K9**: bỏ/thêm class `jello` trong `index.html`.

## Deploy lên Vercel (dùng subdomain của domain công ty)

```bash
cd ~/Desktop/biotiktok
npx vercel@latest --prod --yes      # lần đầu sẽ hỏi đăng nhập trên trình duyệt
```

1. Vercel → Project → **Settings → Domains → Add** → gõ `onthi.<domain-công-ty>`
2. Vercel hiển thị đích CNAME (vd `cname.vercel-dns-xxx.com`) và trạng thái chờ DNS
3. Nhờ IT thêm bản ghi DNS:

   | Name | Type | Value | TTL |
   |---|---|---|---|
   | `onthi` | CNAME | `cname.vercel-dns-xxx.com` (đúng chuỗi Vercel báo) | 3600 |

4. Chờ Vercel verify (5–60 phút) → tự cấp HTTPS, site lên `https://onthi.<domain>`

Lưu ý: nếu DNS công ty dùng Cloudflare, bản ghi CNAME đó để chế độ **DNS only
(mây xám)**, không bật proxy (mây cam).

`vercel.json` đã cấu hình sẵn header bảo mật: HSTS, CSP, X-Frame-Options,
X-Content-Type-Options, Referrer-Policy, Permissions-Policy, và cache immutable
cho ảnh trong `assets/img/`.

## Khác biệt so với bản gốc

- Đã **rebrand thành landing page chính thức của PEDA EDU**: bỏ toàn bộ dấu hiệu
  Linkbio (logo chân trang, tiêu đề, meta, nguồn UTM `instabio` → `pedalink`).
  Chân trang nay là hotline `0943838156` + copyright.
- Bản gốc Linkbio là tài khoản/thuê bao của họ nên có thể bị đổi domain hoặc sập bất cứ lúc nào.
  Deploy bản này lên Vercel/domain riêng là link của bạn, không phụ thuộc họ.
- Bản gốc có banner quảng cáo "Linkbio – Try for free!" do nền tảng chèn, bản này không có.
- Nhóm 3 nút được hiện sẵn tất cả (bản gốc dùng kiểu accordion mềm).