export const COLORS = {
    bg_main: '#234050',
    bg_light: '#2E4E5D',
    primary: '#D79E80',
    secondary: '#000000',
    danger: '#E36565',
    success: '#64A623',
    text_on_bg: '#FFF4E7',
    text_on_primary: '#000000',
    text_on_secondary: '#FFFFFF',
    ocean: '#26A69A',
    orange: '#FAAB1B',
    sky_blue: '#0082FB',
    makeTransparent: (color, percentage) => `rgba(${color.slice(1).match(/.{1,2}/g).map((v) => parseInt(v, 16)).join(', ')},${percentage / 100})`
};

export const METRICS = {
    tiny_spacing: '4px',
    smallest_spacing: '8px',
    small_spacing: '16px',
    medium_spacing: '24px',
    big_spacing: '32px',
    biggest_spacing: '40px',
};
