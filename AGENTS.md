# Project Rules — nalienthanh.store

## Quy trình giao hàng bắt buộc (Mandatory Delivery Workflow)

Sau mỗi lần hoàn tất chỉnh sửa code hoặc nội dung:

1. Kiểm tra build không lỗi: `npm run build`
2. Bump version trong `package.json` và `version.json`
3. Cập nhật checkpoint vào `TODO.md`
4. Commit theo Conventional Commits (kèm `(bump vX.Y.Z)`) và push lên `origin main`
5. **Bắt buộc tự động deploy bản mới nhất lên Vercel Production:**
   ```bash
   npx --yes vercel deploy --prod --yes
   ```
   Đảm bảo trạng thái `READY` và alias `https://nalienthanh.store` đã cập nhật.

## Thông số sản phẩm chuẩn (Không tự ý thay đổi)

- **Chất liệu:** Nhựa ABS kỹ thuật chịu lực cao cấp
- **Quy cách bi:** Bi thép 8mm (8 ly)
- **Ray bi tự động:** 10 viên
- **Giá bán:** Bộ Không Laze `250.000đ` | Bộ Có Laze Xịn (chỉnh tâm) `400.000đ` (Bao ship toàn quốc, được kiểm & bắn thử)
- **Phụ kiện:** Dây thun `50.000đ/bộ` | Ray tiếp bi 10 viên `50.000đ/bộ` | Túi bi thép 8mm `10.000đ/bịch`
- **Bảo mật `/admin`:** Tuyệt đối không hardcode hay hiển thị mã PIN ra frontend; chỉ xác thực qua biến môi trường `ADMIN_PIN` trên server.
