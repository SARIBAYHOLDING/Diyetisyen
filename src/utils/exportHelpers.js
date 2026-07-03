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
 * Generates an automatic downloadable PDF/HTML document file directly without print window
 */
export function exportToPdf(title, contentHtml, subtitle = "") {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '_');
  const fileName = `${sanitizedTitle}_Raporu`;

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
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand-title">🌿 ${BRAND_CONFIG.name}</div>
          <div class="brand-tagline">${BRAND_CONFIG.tagline}</div>
        </div>
        <div style="text-align: right; font-size: 11px; color: #64748b;">
          <div><strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}</div>
          <div><strong>Tel:</strong> ${BRAND_CONFIG.phone}</div>
        </div>
      </div>

      <div class="doc-title">${title}</div>
      ${subtitle ? `<div class="doc-subtitle">${subtitle}</div>` : ''}

      <div class="content">
        ${contentHtml}
      </div>

      <div class="footer">
        <div>© ${new Date().getFullYear()} ${BRAND_CONFIG.name} Klinik ve Beslenme Portalı</div>
        <div class="footprint-badge">⚡ ${BRAND_CONFIG.footprint}</div>
      </div>
    </body>
    </html>
  `;

  // Automatic file download trigger without window.print()
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}_${Date.now()}.pdf.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
