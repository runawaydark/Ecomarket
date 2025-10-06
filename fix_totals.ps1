<#
=============================================================================
SCRIPT DE CORRECCIÓN DE FORMATO DE TOTALES - ECOMARKET
=============================================================================

DESCRIPCIÓN:
Script de PowerShell para corregir el formateo de totales en admin.html
Reemplaza las funciones de formato inconsistentes con una función estándar

AUTOR: Sistema EcoMarket
FECHA: Actualización del proyecto
USO: .\fix_totals.ps1

=============================================================================
#>

# ===== CONFIGURACIÓN DEL SCRIPT =====
$filePath = "c:\xampp\htdocs\Ecomarket\frontend sprint 3\admin.html"

Write-Host "🔧 Iniciando corrección de formato de totales..." -ForegroundColor Yellow
Write-Host "📂 Archivo objetivo: $filePath" -ForegroundColor Cyan

# ===== VERIFICAR QUE EL ARCHIVO EXISTE =====
if (-not (Test-Path $filePath)) {
    Write-Host "❌ ERROR: El archivo no existe en la ruta especificada" -ForegroundColor Red
    Write-Host "📍 Verificar ruta: $filePath" -ForegroundColor Yellow
    exit 1
}

# ===== LEER CONTENIDO DEL ARCHIVO =====
Write-Host "📖 Leyendo contenido del archivo..." -ForegroundColor Green
try {
    $content = Get-Content $filePath -Raw
    Write-Host "✅ Archivo leído correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR al leer el archivo: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# ===== REALIZAR REEMPLAZOS =====
Write-Host "🔄 Aplicando correcciones de formato..." -ForegroundColor Yellow

# Reemplazar el formato de total inconsistente
$originalContent = $content
$content = $content -replace "order\.total\.toLocaleString\(\)", "formatOrderTotal(order.total)"

# Corregir símbolo de peso duplicado
$content = $content -replace "Total: \$' \+ formatOrderTotal\(order\.total\)", "Total: ' + formatOrderTotal(order.total)"

# ===== VERIFICAR SI SE REALIZARON CAMBIOS =====
if ($originalContent -eq $content) {
    Write-Host "ℹ️  No se encontraron patrones para reemplazar" -ForegroundColor Yellow
    Write-Host "✅ El archivo ya está actualizado o no requiere cambios" -ForegroundColor Green
} else {
    # ===== GUARDAR ARCHIVO CORREGIDO =====
    try {
        Set-Content $filePath $content -NoNewline
        Write-Host "✅ Correcciones aplicadas exitosamente" -ForegroundColor Green
        Write-Host "📝 Cambios realizados:" -ForegroundColor Cyan
        Write-Host "   • order.total.toLocaleString() → formatOrderTotal(order.total)" -ForegroundColor White
        Write-Host "   • Corrección de símbolo de peso duplicado" -ForegroundColor White
    } catch {
        Write-Host "❌ ERROR al guardar el archivo: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# ===== FINALIZACIÓN =====
Write-Host "" 
Write-Host "🎉 Script completado exitosamente" -ForegroundColor Green
Write-Host "📊 Archivo corregido: admin.html" -ForegroundColor Cyan
Write-Host "🔗 Puedes verificar los cambios en el panel administrativo" -ForegroundColor Yellow