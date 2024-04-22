$(document).ready(function() {
    var data = [
        { "qubit": "superconductor", "T1": 30, "Reference": "[1]" },
        { "qubit": "superconductor", "T1": 25, "Reference": "[2]" },
        { "qubit": "photon", "T1": 35, "Reference": "[3]" }
        // Add more objects as needed
    ];

    var table = $('#myTable').DataTable({
        data: data,
        columns: [
            { data: 'qubit' },
            { data: 'T1' },
            { data: 'Reference' }
        ]
    });
});
