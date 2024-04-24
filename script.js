$(document).ready(function() {
    $.getJSON('data.json', function(data) {
        var table = $('#mainTable').DataTable({
            data: data,
            columns: [
                { data: 'qubit' },
                { data: 'T1' },
                { data: 'T2*'}
                { data: 'one_qubit_gate' },
                { data: 'two_qubit_gate' },
                { data: 'One logical qubit generation Rate' },
                { data: 'Year' },
                { data: 'Reference' },
                { data: 'Comment' }
            ],
            columnDefs: [
                {
                    targets: '_all',
                    render: function(data, type, row) {
                        return data || "-";
                    }
                }
            ]
        });
    });
});
