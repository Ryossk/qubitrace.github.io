$(document).ready(function() {
    $.getJSON('./data.json', function(data) {
        // JSONデータの取得が完了したら、テーブルを初期化する
        initializeDataTable(data);
    });
});

function initializeDataTable(data) {
    var table = $('#myTable').DataTable({
        data: data,
        columns: [
            { data: 'qubit' },
            { data: 'T1' },
            { data: 'Reference' }
        ]
    });
}