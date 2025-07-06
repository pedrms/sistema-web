<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;

// Cria a planilha
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

// Cabeçalhos
$sheet->setCellValue('A1', 'Nome');
$sheet->setCellValue('B1', 'Email');
$sheet->setCellValue('C1', 'Telefone');
$sheet->setCellValue('D1', 'Mensagem');
$sheet->setCellValue('E1', 'Data/Hora');

// Estiliza os cabeçalhos
$styleHeader = [
    'font' => [
        'bold' => true,
        'color' => ['argb' => Color::COLOR_WHITE],
    ],
    'fill' => [
        'fillType' => Fill::FILL_SOLID,
        'startColor' => ['argb' => 'FF4F81BD'],
    ],
    'borders' => [
        'allBorders' => [
            'borderStyle' => Border::BORDER_THIN,
        ],
    ],
];
$sheet->getStyle('A1:E1')->applyFromArray($styleHeader);

// Dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$mensagem = $_POST['mensagem'];
$dataHora = date('d/m/Y H:i:s');

// Insere os dados
$sheet->setCellValue('A2', $nome);
$sheet->setCellValue('B2', $email);
$sheet->setCellValue('C2', $telefone);
$sheet->setCellValue('D2', $mensagem);
$sheet->setCellValue('E2', $dataHora);

// Bordas
$sheet->getStyle('A2:E2')->applyFromArray([
    'borders' => [
        'allBorders' => [
            'borderStyle' => Border::BORDER_THIN,
        ],
    ],
]);

// Ajusta largura
foreach (range('A', 'E') as $coluna) {
    $sheet->getColumnDimension($coluna)->setAutoSize(true);
}

// Envia o arquivo para download
$filename = 'formulario_' . date('Ymd_His') . '.xlsx';
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header("Content-Disposition: attachment; filename=\"$filename\"");
header('Cache-Control: max-age=0');

// Grava e envia
$writer = new Xlsx($spreadsheet);
$writer->save('php://output');
exit;
?>
