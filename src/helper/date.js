export const formatDateString = (str) => {
  const today = new Date()
  const YYYY = today.getFullYear()
  const MM = today.getMonth() + 1
  const DD = today.getDate()
  const res = str.replace('YYYY', YYYY).replace('MM', MM).replace('DD', DD)
  return res
}
