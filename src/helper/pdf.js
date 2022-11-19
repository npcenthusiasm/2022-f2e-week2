const readBlob = (blob) => {
  console.log('blob: ', blob)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', reject)
    reader.readAsDataURL(blob)
  })
}

// TODO: : 需要再整理
export const getPDFTotalPages = async (pdfData) => {
  console.log('pdfData: ', pdfData)
  const Base64Prefix = 'data:application/pdf;base64,'
  // 將檔案處理成 base64
  pdfData = await readBlob(pdfData)

  // 將 base64 中的前綴刪去，並進行解碼
  const data = atob(pdfData.substring(Base64Prefix.length))
  const pdfDoc = await window.pdfjsLib.getDocument({ data }).promise
  console.log('pdfDoc: ', pdfDoc)
  return pdfDoc.numPages
}

export const pdfToImage = async (pdfData) => {
  // 設定 PDF 轉為圖片時的比例
  const scale = 1 / window.devicePixelRatio

  // 回傳圖片
  return new window.fabric.Image(pdfData, {
    id: 'renderPDF',
    scaleX: scale,
    scaleY: scale
  })
}

export const printMultiPage = async (pdfData) => {
  const Base64Prefix = 'data:application/pdf;base64,'
  console.log('typeof pdfData: ', typeof pdfData)
  // 將檔案處理成 base64
  pdfData = await readBlob(pdfData)

  // 將 base64 中的前綴刪去，並進行解碼
  const data = atob(pdfData.substring(Base64Prefix.length))
  const pdfDoc = await window.pdfjsLib.getDocument({ data }).promise
  const totalPages = pdfDoc.numPages

  const createPageCanvas = async (page) => {
    const pdfPage = await pdfDoc.getPage(page)

    // 設定尺寸及產生 canvas
    const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    // 設定 PDF 所要顯示的寬高及渲染
    canvas.height = viewport.height
    canvas.width = viewport.width
    const renderContext = {
      canvasContext: context,
      viewport
    }
    const renderTask = pdfPage.render(renderContext)

    // 回傳做好的 PDF canvas
    return renderTask.promise.then(() => canvas)
  }

  const pagesCanvas = []
  for (let page = 1; page <= totalPages; page++) {
    const pCanvas = await createPageCanvas(page)
    pagesCanvas.push(pCanvas)
  }

  return pagesCanvas
}
