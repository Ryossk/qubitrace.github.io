$(document).ready(function() {
    // JSONファイルからデータを読み込む
    $.getJSON('./data.json', function(data) {
        var table = $('#myTable').DataTable({
            data: data, // JSONデータを指定
            columns: [
                { data: 'qubit' }, // nameフィールドのデータを表示
                { data: 'T1' }, // ageフィールドのデータを表示
                { data: 'Reference' } // countryフィールドのデータを表示
            ]
        });
    });
});
