/**
 * Currency and Numeric formatters tailored for Indian Financial Standards
 */

export function formatINR(val: number, includeDecimals = false): string {
  if (isNaN(val) || !isFinite(val)) return '₹0';
  const rounded = includeDecimals ? Math.round(val * 100) / 100 : Math.round(val);
  
  // Format using Indian Numbering System: 12,34,567
  const parts = rounded.toString().split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherNumbers = parts[0].substring(0, parts[0].length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  const formattedDecimal = parts.length > 1 ? '.' + parts[1].padEnd(2, '0').slice(0, 2) : '';

  return `₹${formattedInt}${formattedDecimal}`;
}

export function formatINRCompact(val: number): string {
  if (isNaN(val) || !isFinite(val)) return '₹0';
  const absVal = Math.abs(val);
  
  if (absVal >= 10000000) {
    // Crores
    const cr = val / 10000000;
    return `₹${cr.toFixed(cr >= 10 ? 1 : 2)} Cr`;
  }
  if (absVal >= 100000) {
    // Lakhs
    const lakh = val / 100000;
    return `₹${lakh.toFixed(lakh >= 10 ? 1 : 2)} L`;
  }
  if (absVal >= 1000) {
    // Thousands
    const k = val / 1000;
    return `₹${k.toFixed(1)} K`;
  }
  return formatINR(val);
}

export function formatPercent(val: number): string {
  return `${Number(val.toFixed(2))}%`;
}

export function numberToIndianWords(num: number): string {
  if (!num || isNaN(num) || num <= 0) return '';
  const rounded = Math.floor(num);

  const a = [
    '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ',
    'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n: number): string {
    let str = '';
    if (n > 19) {
      str += b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : ' ');
    } else {
      str += a[n];
    }
    return str;
  }

  const crore = Math.floor(rounded / 10000000);
  const lakh = Math.floor((rounded % 10000000) / 100000);
  const thousand = Math.floor((rounded % 100000) / 1000);
  const hundred = Math.floor((rounded % 1000) / 100);
  const remainder = rounded % 100;

  let result = '';
  if (crore > 0) result += inWords(crore) + 'Crore ';
  if (lakh > 0) result += inWords(lakh) + 'Lakh ';
  if (thousand > 0) result += inWords(thousand) + 'Thousand ';
  if (hundred > 0) result += inWords(hundred) + 'Hundred ';
  if (remainder > 0) result += inWords(remainder);

  return result.trim() ? `${result.trim()} Rupees` : '';
}
