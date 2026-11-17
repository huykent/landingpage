/**
 * GOOGLE APPS SCRIPT — DATABASE ĐƠN HÀNG 2 CHIỀU CHO NALIENTHANH.STORE
 * Hỗ trợ: Đọc danh sách (list), Tạo đơn mới (create), Cập nhật trạng thái & ghi chú (update)
 *
 * HƯỚNG DẪN CÀI ĐẶT NHANH (2 PHÚT):
 * 1. Tạo 1 file Google Sheet mới (VD: "Don Hang nalienthanh.store")
 * 2. Vào menu: Tiện ích mở rộng (Extensions) -> Apps Script
 * 3. Xóa hết code cũ, dán toàn bộ file này vào
 * 4. Đổi SECRET_KEY bên dưới trùng với biến GOOGLE_SHEET_SECRET (hoặc ADMIN_PIN) trên Vercel
 * 5. Bấm Triển khai (Deploy) -> Tùy chọn triển khai mới (New deployment)
 *    - Loại: Ứng dụng web (Web app)
 *    - Thực thi dưới tư cách (Execute as): Tôi (Me)
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 * 6. Bấm Triển khai, cấp quyền truy cập Sheet, rồi copy đường link Web App URL
 *    dán vào biến GOOGLE_SHEET_WEBHOOK_URL trên Vercel.
 */

const SHEET_NAME = 'DonHang';
const SECRET_KEY = 'THAY_BANG_MA_BI_MAT_CUA_BAN';

const HEADERS = [
  'Mã đơn',
  'Thời gian (VN)',
  'Khách hàng',
  'Số điện thoại',
  'Địa chỉ',
  'Sản phẩm chính',
  'Giá SP chính',
  'Phụ kiện mua thêm',
  'Tổng tiền COD',
  'Trạng thái',
  'Ghi chú Sales',
  'createdAt_ISO',
  'mainProduct_Key',
  'addOns_JSON',
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#111827');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    // Định dạng cột Số điện thoại (cột D) dạng Text để không bị mất số 0 ở đầu
    sheet.getRange('D:D').setNumberFormat('@');
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function verifySecret(providedSecret) {
  if (!SECRET_KEY || SECRET_KEY === 'THAY_BANG_MA_BI_MAT_CUA_BAN') {
    return false;
  }
  return String(providedSecret || '') === String(SECRET_KEY);
}

function formatVnTime(isoString) {
  try {
    return Utilities.formatDate(new Date(isoString), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
  } catch (e) {
    return String(isoString || '');
  }
}

function rowToOrder(row) {
  var addOns = [];
  try {
    if (row[13]) {
      addOns = JSON.parse(String(row[13]));
    }
  } catch (e) {
    addOns = [];
  }

  var rawPhone = String(row[3] || '').replace(/^'/, '');

  return {
    id: String(row[0] || ''),
    createdAt: String(row[11] || row[1] || new Date().toISOString()),
    customerName: String(row[2] || ''),
    phone: rawPhone,
    address: String(row[4] || ''),
    mainProduct: row[12] === 'standard' ? 'standard' : 'laser_pro',
    mainProductName: String(row[5] || ''),
    mainPrice: Number(row[6] || 0),
    addOns: Array.isArray(addOns) ? addOns : [],
    shippingFee: 0,
    totalAmount: Number(row[8] || 0),
    status: String(row[9] || 'new'),
    note: String(row[10] || ''),
  };
}

function doGet() {
  return jsonResponse({
    success: true,
    service: 'nalienthanh.store Google Sheets Database',
    status: 'ready',
  });
}

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (!verifySecret(payload.secret)) {
      return jsonResponse({ success: false, message: 'Unauthorized secret key' });
    }

    var action = payload.action || 'create';

    if (action === 'list') {
      var sheet = getOrCreateSheet();
      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) {
        return jsonResponse({ success: true, orders: [] });
      }
      var values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
      var orders = [];
      for (var i = 0; i < values.length; i++) {
        if (values[i][0]) {
          orders.push(rowToOrder(values[i]));
        }
      }
      orders.sort(function (a, b) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      return jsonResponse({ success: true, orders: orders });
    }

    // Dùng LockService khi ghi / sửa để tránh ghi đè khi nhiều khách đặt cùng lúc
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      var writeSheet = getOrCreateSheet();

      if (action === 'create') {
        var order = payload.order;
        if (!order || !order.id) {
          return jsonResponse({ success: false, message: 'Missing order payload' });
        }

        var addOnsList = Array.isArray(order.addOns) ? order.addOns : [];
        var addOnsText =
          addOnsList.length > 0
            ? addOnsList
                .map(function (item) {
                  return item.name + ' (x' + item.quantity + ')';
                })
                .join(', ')
            : 'Không';

        var newRow = [
          order.id,
          formatVnTime(order.createdAt),
          order.customerName || '',
          "'" + String(order.phone || ''),
          order.address || '',
          order.mainProductName || '',
          Number(order.mainPrice || 0),
          addOnsText,
          Number(order.totalAmount || 0),
          order.status || 'new',
          order.note || '',
          order.createdAt || new Date().toISOString(),
          order.mainProduct || 'laser_pro',
          JSON.stringify(addOnsList),
        ];

        writeSheet.appendRow(newRow);
        return jsonResponse({ success: true, order: order });
      }

      if (action === 'update') {
        var targetId = String(payload.id || '');
        var updates = payload.updates || {};
        if (!targetId) {
          return jsonResponse({ success: false, message: 'Missing order id' });
        }

        var totalRows = writeSheet.getLastRow();
        if (totalRows <= 1) {
          return jsonResponse({ success: false, message: 'Order not found' });
        }

        var ids = writeSheet.getRange(2, 1, totalRows - 1, 1).getValues();
        for (var r = 0; r < ids.length; r++) {
          if (String(ids[r][0]) === targetId) {
            var rowIndex = r + 2;
            if (updates.status) {
              writeSheet.getRange(rowIndex, 10).setValue(String(updates.status));
            }
            if (typeof updates.note === 'string') {
              writeSheet.getRange(rowIndex, 11).setValue(updates.note);
            }
            var updatedRow = writeSheet.getRange(rowIndex, 1, 1, HEADERS.length).getValues()[0];
            return jsonResponse({ success: true, order: rowToOrder(updatedRow) });
          }
        }

        return jsonResponse({ success: false, message: 'Order not found' });
      }

      return jsonResponse({ success: false, message: 'Unknown action: ' + action });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return jsonResponse({
      success: false,
      message: err && err.message ? err.message : String(err),
    });
  }
}
