# Script para reemplazar el formateo de totales
$filePath = "c:\xampp\htdocs\Ecomarket\frontend sprint 3\admin.html"
$content = Get-Content $filePath -Raw

# Reemplazar el formato de total
$content = $content -replace "order\.total\.toLocaleString\(\)", "formatOrderTotal(order.total)"

# También necesitamos quitar el símbolo $ ya que formatOrderTotal ya lo incluye  
$content = $content -replace "Total: \$' \+ formatOrderTotal\(order\.total\)", "Total: ' + formatOrderTotal(order.total)"

# Guardar el archivo
Set-Content $filePath $content -NoNewline

Write-Host "Reemplazo completado"