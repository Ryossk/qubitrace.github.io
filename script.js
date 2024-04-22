$(document).ready(function() {
    $.getJSON('./data.json', function(data) {
        // JSONデータを取得してテーブルに表示する
        var table = $('#myTable').DataTable({
            data: data,
            columns: [
                { data: 'qubit' },
                { data: 'T1' },
                { data: 'Reference' }
            ]
        });
    });
});
