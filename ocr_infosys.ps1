$Path = "C:\Users\Rutu Mahesh Ghatge\OneDrive\Desktop\Projects\rutu-portfolio-ai\public\certs\Infosys Springboard\1-0f580a01-5d4d-417c-bb87-8c1369c0c151.pdf"
[void][Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
[void][Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType=WindowsRuntime]
[void][Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
[void][Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType=WindowsRuntime]

$op1 = [Windows.Storage.StorageFile]::GetFileFromPathAsync($Path)
while ($op1.Status -eq 'Started' -or $op1.Status.ToString() -eq 'Started') { Start-Sleep -Milliseconds 10 }
$storageFile = $op1.GetResults()

$op2 = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)
while ($op2.Status -eq 'Started' -or $op2.Status.ToString() -eq 'Started') { Start-Sleep -Milliseconds 10 }
$pdfDoc = $op2.GetResults()

$page = $pdfDoc.GetPage(0)
$memStream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream

$op3 = $page.RenderToStreamAsync($memStream)
while ($op3.Status -eq 'Started' -or $op3.Status.ToString() -eq 'Started') { Start-Sleep -Milliseconds 10 }
$op3.GetResults() | Out-Null

$op4 = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($memStream)
while ($op4.Status -eq 'Started' -or $op4.Status.ToString() -eq 'Started') { Start-Sleep -Milliseconds 10 }
$bitmapDecoder = $op4.GetResults()

$op5 = $bitmapDecoder.GetSoftwareBitmapAsync()
while ($op5.Status -eq 'Started' -or $op5.Status.ToString() -eq 'Started') { Start-Sleep -Milliseconds 10 }
$softwareBitmap = $op5.GetResults()

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
$op6 = $engine.RecognizeAsync($softwareBitmap)
while ($op6.Status -eq 'Started' -or $op6.Status.ToString() -eq 'Started') { Start-Sleep -Milliseconds 10 }
$ocrResult = $op6.GetResults()

$ocrResult.Lines | ForEach-Object { $_.Text }
