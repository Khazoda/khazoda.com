# Define the output text file
$outputFile = "output.txt"

# Clear the output file if it already exists
if (Test-Path $outputFile) {
    Clear-Content $outputFile
}

# Get all PNG files in the current directory
$pngFiles = Get-ChildItem -Path . -Filter *.png

# Loop through each PNG file
foreach ($file in $pngFiles) {
    # Read the file as a byte array
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Convert the byte array to a Base64 string
    $base64String = [System.Convert]::ToBase64String($bytes)
    
    # Add the data URL prefix
    $base64ImageString = "data:image/png;base64,$base64String"
    
    # Append the filename and Base64 string to the output file
    Add-Content -Path $outputFile -Value "$($file.Name) : '$base64ImageString'"
}

Write-Host "Conversion complete. Base64 strings have been saved to $outputFile."