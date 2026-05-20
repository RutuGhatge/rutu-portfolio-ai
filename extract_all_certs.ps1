try {
    Write-Host "Loading WinRT types..."
    [void][Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
    [void][Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType=WindowsRuntime]
    [void][Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
    [void][Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType=WindowsRuntime]
    [void][System.Reflection.Assembly]::LoadWithPartialName('System.Runtime.WindowsRuntime')

    $asTaskMethods = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' }

    function Await-Operation($operation, $resultType) {
        $asTaskOp = $null
        foreach ($m in $asTaskMethods) {
            if ($m.GetGenericArguments().Count -eq 1) {
                $params = $m.GetParameters()
                if ($params.Count -eq 1 -and $params[0].ParameterType.Name.StartsWith("IAsyncOperation")) {
                    $asTaskOp = $m
                    break
                }
            }
        }
        if ($null -eq $asTaskOp) { throw "Could not find AsTask generic method" }
        $genericMethod = $asTaskOp.MakeGenericMethod($resultType)
        $task = $genericMethod.Invoke($null, @($operation))
        $task.Wait()
        return $task.Result
    }

    function Await-Action($action) {
        $asTaskAction = $null
        foreach ($m in $asTaskMethods) {
            if ($m.GetGenericArguments().Count -eq 0) {
                $params = $m.GetParameters()
                if ($params.Count -eq 1 -and $params[0].ParameterType.Name.StartsWith("IAsyncAction")) {
                    $asTaskAction = $m
                    break
                }
            }
        }
        if ($null -eq $asTaskAction) { throw "Could not find AsTask for IAsyncAction" }
        $task = $asTaskAction.Invoke($null, @($action))
        $task.Wait()
    }

    $certsDir = "C:\Users\Rutu Mahesh Ghatge\OneDrive\Desktop\Projects\rutu-portfolio-ai\public\certs\Infosys Springboard"
    $pdfFiles = Get-ChildItem -Path $certsDir -Filter "*.pdf"
    Write-Host "Found $($pdfFiles.Count) PDF files in $certsDir"

    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    if ($null -eq $engine) {
        throw "Failed to create OCR engine"
    }

    $extractedCerts = @()
    $count = 0

    foreach ($file in $pdfFiles) {
        $count++
        Write-Host "[$count/$($pdfFiles.Count)] Processing $($file.Name)..."

        try {
            $opFile = [Windows.Storage.StorageFile]::GetFileFromPathAsync($file.FullName)
            $storageFile = Await-Operation $opFile ([Windows.Storage.StorageFile])

            $opPdf = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)
            $pdfDoc = Await-Operation $opPdf ([Windows.Data.Pdf.PdfDocument])

            $page = $pdfDoc.GetPage(0)
            $memStream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
            $opRender = $page.RenderToStreamAsync($memStream)
            Await-Action $opRender

            $opDecoder = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($memStream)
            $bitmapDecoder = Await-Operation $opDecoder ([Windows.Graphics.Imaging.BitmapDecoder])

            $opBitmap = $bitmapDecoder.GetSoftwareBitmapAsync()
            $softwareBitmap = Await-Operation $opBitmap ([Windows.Graphics.Imaging.SoftwareBitmap])

            $opOcr = $engine.RecognizeAsync($softwareBitmap)
            $ocrResult = Await-Operation $opOcr ([Windows.Media.Ocr.OcrResult])

            $lines = $ocrResult.Lines | ForEach-Object { $_.Text }

            # Algorithm to extract the course title
            $title = ""
            $year = "2024" # Default fallback
            
            # Find the line after "for successfully completing"
            for ($i = 0; $i -lt $lines.Count; $i++) {
                $line = $lines[$i]
                
                # Check for year in any line
                if ($line -match "202[345]") {
                    $year = $Matches[0]
                }

                if ($line -like "*successfully completing*" -or $line -like "*completing the course*") {
                    if ($i + 1 -lt $lines.Count) {
                        $candidate = $lines[$i + 1].Trim()
                        # If candidate is something like "on [Month]", it means the title was on the same line or we skipped it.
                        # Usually the title is the line immediately following the "successfully completing" statement.
                        if ($candidate -and -not ($candidate -like "on *")) {
                            $title = $candidate
                        }
                    }
                }
            }

            # Fallback if title extraction failed
            if (-not $title) {
                # Look for lines between "Rutu" and "on [Month] [Day], [Year]" or "Issued on"
                $nameIndex = -1
                $onIndex = -1
                for ($i = 0; $i -lt $lines.Count; $i++) {
                    if ($lines[$i] -match "Rutu" -or $lines[$i] -match "Ghatge") {
                        $nameIndex = $i
                    }
                    if ($lines[$i] -like "on *" -or $lines[$i] -match "Issued on:") {
                        $onIndex = $i
                    }
                }
                
                if ($nameIndex -ne -1 -and $onIndex -ne -1 -and $onIndex -gt $nameIndex + 1) {
                    # Take everything in between as the title
                    $titleParts = @()
                    for ($k = $nameIndex + 1; $k -lt $onIndex; $k++) {
                        $lineVal = $lines[$k].Trim()
                        if ($lineVal -and $lineVal -ne "for successfully completing" -and $lineVal -ne "for successfully completing the course" -and $lineVal -ne "course" -and $lineVal -ne "the course") {
                            $titleParts += $lineVal
                        }
                    }
                    $title = $titleParts -join " "
                }
            }

            # Clean up title
            if ($title) {
                $title = $title -replace "^the course\s+", ""
                $title = $title -replace "\s+on\s*$", ""
                $title = $title.Trim()
            } else {
                $title = "Infosys Springboard Skill Certificate"
            }

            Write-Host "   Extracted Title: $title"
            Write-Host "   Extracted Year: $year"

            # Create cert object
            # Note: served statically, relative url from public/ is /certs/Infosys Springboard/<filename>
            $relUrl = "/certs/Infosys Springboard/$($file.Name)"
            $certObj = [PSCustomObject]@{
                title = $title
                provider = "Infosys"
                year = $year
                badgeUrl = $relUrl
                certImageUrl = $relUrl
            }

            $extractedCerts += $certObj
        } catch {
            Write-Host "   Error processing $($file.Name): $_"
        }
    }

    # Output to JSON
    $jsonPath = "C:\Users\Rutu Mahesh Ghatge\OneDrive\Desktop\Projects\rutu-portfolio-ai\src\data\infosys_certs.json"
    $extractedCerts | ConvertTo-Json -Depth 4 | Out-File -FilePath $jsonPath -Encoding utf8
    Write-Host "Successfully wrote all $($extractedCerts.Count) parsed certificates to $jsonPath"

} catch {
    Write-Host "Error in script: $_"
    Write-Host $_.ScriptStackTrace
}
