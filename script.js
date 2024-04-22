$(document).ready(function() {
    // JSONファイルからデータを読み込む
    $.getJSON('./data.json', function(data) {
        var table = $('#myTable').DataTable({
            data: data, // JSONデータを指定
            columns: [
                { data: 'name' }, // nameフィールドのデータを表示
                { data: 'age' }, // ageフィールドのデータを表示
                { data: 'country' } // countryフィールドのデータを表示
            ]
        });
    });
});
