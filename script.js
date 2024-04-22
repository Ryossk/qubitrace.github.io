$(document).ready(function() {
    // JSONファイルからデータを読み込む
    $.getJSON('./data.json', function(data) {
        var table = $('#myTable').DataTable({
            data: data, // JSONデータを指定
            columns: [
                { data: 'qubit' }, // qubitフィールドのデータを表示
                { data: 'T1' }, // T1フィールドのデータを表示
                { data: 'Reference' } // Referenceフィールドのデータを表示
            ]
        });
    });
});
