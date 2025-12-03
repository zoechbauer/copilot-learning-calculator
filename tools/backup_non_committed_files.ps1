$source = "C:\SOURCE-ACTIVE\copilot\calculator"
$backup = "C:\SOURCE-ACTIVE\BACKUP_NON_COMMITTED_FILES\Calculator"

# Create backup directory if it doesn't exist
if (!(Test-Path $backup)) {
    New-Item -ItemType Directory -Path $backup | Out-Null
}

# List of folders to back up
$foldersToBackup = @(".github", ".vscode")

foreach ($folder in $foldersToBackup) {
    $srcFolder = Join-Path $source $folder
    $destFolder = Join-Path $backup $folder

    if (Test-Path $srcFolder) {
        Copy-Item -Path $srcFolder -Destination $destFolder -Recurse -Force
    }
}

Write-Host "Backup complete. Files copied to $backup"