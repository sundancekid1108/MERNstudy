import QRCode from 'qrcode'

export const createQR = async (text) => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}
