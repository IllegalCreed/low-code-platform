import axios from 'axios';

export async function loadSvg(src: string) {
  try {
    const response = await axios.get(src);
    return response.data;
  } catch (error) {
    console.error('Error loading SVG:', error);
    return null;
  }
}
