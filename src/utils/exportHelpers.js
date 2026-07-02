import { BRAND_CONFIG } from '../config/brandConfig';

/**
 * Exports data array to a UTF-8 encoded CSV/Excel file with Suda Dynamics footer watermark
 */
export function exportToExcel(data, fileName = "Rapor", title = "Veri Raporu") {
  if (!data || !data.length) {
    alert("Dışa aktarılacak veri bulunamadı.");
    return;
  }

  // Extract keys for header
  const keys = Object.keys(data[0]);
  
  // UTF-8 BOM for Excel Turkish Character support
  let csvContent = "\uFEFF";
  
  // Title Row
  csvContent += `"${BRAND_CONFIG.name} - ${title}"\n`;
  csvContent += `"Tarih: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}"\n\n`;

  // Header Row
  csvContent += keys.map(k => `"${k}"`).join(",") + "\n";

  // Data Rows
  data.forEach(item => {
    const row = keys.map(k => {
      const val = item[k] !== undefined && item[k] !== null ? String(item[k]).replace(/"/g, '""') : '';
      return `"${val}"`;
    }).join(",");
    csvContent += row + "\n";
  });

  // Footer Watermark
  csvContent += `\n"${BRAND_CONFIG.footprint} - ${BRAND_CONFIG.engineVersion}"\n`;

  // Download Blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Opens a branded PDF print window with Suda Dynamics watermark
 */
export function exportToPdf(title, contentHtml, subtitle = "") {
  const printWindow = window.open("", "_blank", "width=900,height=800");
  if (!printWindow) {
    alert("Lütfen tarayıcı açılır pencere (pop-up) engelleyicisini kapatın.");
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <title>${title} - ${BRAND_CONFIG.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          margin: 0;
          padding: 30px;
          background: #ffffff;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #10b981;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }
        .brand-title {
          font-size: 24px;
          font-weight: 800;
          color: #047857;
        }
        .brand-tagline {
          font-size: 11px;
          color: #64748b;
        }
        .doc-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 5px;
        }
        .doc-subtitle {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th {
          background: #f0fdf4;
          color: #047857;
          font-size: 12px;
          font-weight: 800;
          text-align: left;
          padding: 10px;
          border: 1px solid #cbd5e1;
        }
        td {
          font-size: 11px;
          padding: 10px;
          border: 1px solid #e2e8f0;
          color: #334155;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .footer {
          margin-top: 40px;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          color: #64748b;
        }
        .footprint-badge {
          font-weight: 800;
          color: #059669;
          background: #ecfdf5;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid #a7f3d0;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div className="header">
        <div>
          <div className="brand-title">🌿 ${BRAND_CONFIG.name}</div>
          <div className="brand-tagline">${BRAND_CONFIG.tagline}</div>
        </div>
        <div style="text-align: right; font-size: 11px; color: #64748b;">
          <div><strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')}</div>
          <div><strong>Tel:</strong> ${BRAND_CONFIG.phone}</div>
        </div>
      </div>

      <div className="doc-title">${title}</div>
      ${subtitle ? `<div className="doc-subtitle">${subtitle}</div>` : ''}

      <div className="content">
        ${contentHtml}
      </div>

      <div className="footer">
        <div>© ${new Date().getFullYear()} ${BRAND_CONFIG.name} Klinik ve Beslenme Portalı</div>
        <div className="footprint-badge">⚡ ${BRAND_CONFIG.footprint}</div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
