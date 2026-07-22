/**
 * Sanitizes input strings by escaping HTML characters to prevent XSS (script injection).
 */
export function escapeHTML(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Checks if a string contains potential XSS or script injection payloads.
 */
export function hasXSS(val: string): boolean {
  const lower = val.toLowerCase();
  return (
    /<script/i.test(lower) ||
    /javascript:/i.test(lower) ||
    /onload=/i.test(lower) ||
    /onerror=/i.test(lower) ||
    /alert\s*\(/i.test(lower) ||
    /<iframe/i.test(lower)
  );
}

/**
 * Checks if a string contains potential SQL injection payloads.
 * Looks for common SQL commands combined with special operators.
 */
export function hasSQL(val: string): boolean {
  const lower = val.toLowerCase();
  const sqlKeywords = [
    /union\s+select/i,
    /select\s+.*\s+from/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /drop\s+table/i,
    /update\s+.*\s+set/i,
    /--/,
    /\/\*/,
    /\*\//,
    /xp_cmdshell/i,
    /exec\s*\(/i,
  ];

  // Also check for ' OR '1'='1 type of bypass
  const bypassPattern = /'\s*or\s*'\d+'\s*=\s*'\d+/i;
  const bypassPatternNumeric = /\b\d+\s*or\s*\d+\s*=\s*\d+/i;

  if (bypassPattern.test(lower) || bypassPatternNumeric.test(lower)) {
    return true;
  }

  return sqlKeywords.some(pattern => pattern.test(lower));
}

/**
 * Sanitizes textarea input: trims, collapses multiple inline spaces to one, 
 * and collapses 3 or more line breaks to exactly two (preventing layout spam).
 */
export function sanitizeTextarea(val: string): string {
  if (!val) return '';
  return val
    .trim()
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n');
}

/**
 * Parses dates in multiple formats and returns a valid JS Date or null.
 * Rejects invalid dates such as "31 February" or "99/99/9999".
 * Supported formats:
 * - YYYY-MM-DD
 * - DD/MM/YYYY
 * - DD-MM-YYYY
 * - DD MMM YYYY (e.g. 14 Dec 2026)
 * - DD MMMM YYYY (e.g. 14 December 2026)
 */
export function parseFlexibleDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const s = dateStr.trim();

  // Format 1: YYYY-MM-DD (Native picker)
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const d = new Date(s);
    if (!isNaN(d.getTime())) return d;
  }

  // Format 2: DD/MM/YYYY or DD-MM-YYYY
  const slashDashMatch = s.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})$/);
  if (slashDashMatch) {
    const day = parseInt(slashDashMatch[1], 10);
    const month = parseInt(slashDashMatch[2], 10) - 1; // 0-based
    const year = parseInt(slashDashMatch[3], 10);
    const d = new Date(year, month, day);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
      return d;
    }
  }

  // Format 3: DD MMM YYYY or DD MMMM YYYY
  // e.g. 14 Dec 2026, 14 December 2026
  const textMonthMatch = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (textMonthMatch) {
    const day = parseInt(textMonthMatch[1], 10);
    const monthStr = textMonthMatch[2].toLowerCase();
    const year = parseInt(textMonthMatch[3], 10);

    const months: Record<string, number> = {
      jan: 0, january: 0,
      feb: 1, february: 1,
      mar: 2, march: 2,
      apr: 3, april: 3,
      may: 4,
      jun: 5, june: 5,
      jul: 6, july: 6,
      aug: 7, august: 7,
      sep: 8, september: 8,
      oct: 9, october: 9,
      nov: 10, november: 10,
      dec: 11, december: 11
    };

    if (monthStr in months) {
      const month = months[monthStr];
      const d = new Date(year, month, day);
      if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        return d;
      }
    }
  }

  // Fallback default parse
  const parsedTime = Date.parse(s);
  if (!isNaN(parsedTime)) {
    const d = new Date(parsedTime);
    // Basic verification: check if year is reasonable
    if (d.getFullYear() > 1900 && d.getFullYear() < 2100) {
      return d;
    }
  }

  return null;
}
