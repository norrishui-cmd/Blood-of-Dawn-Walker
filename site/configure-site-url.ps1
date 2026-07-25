param(
  [Parameter(Mandatory = $true)]
  [string]$SiteUrl
)

$normalized = $SiteUrl.TrimEnd("/")
$files = @("index.html", "sitemap.xml", "robots.txt")

foreach ($file in $files) {
  $path = Join-Path $PSScriptRoot $file
  (Get-Content -LiteralPath $path -Raw) `
    -replace "https://bloodofdawnwalker.cc", $normalized |
    Set-Content -LiteralPath $path -Encoding UTF8
}

Write-Host "Site URL updated to $normalized"
