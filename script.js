$(document).ready(function() {
    var data = [
        { "qubit": "superconductor", "T1": 30, "Reference": "[1]",  "one qubit gate": "-",  "two qubit gate": "-"},
        { "qubit": "superconductor", "T1": 25, "Reference": "[2]",  "one qubit gate": "-",  "two qubit gate": "-"},
        { "qubit": "photon", "T1": 35, "Reference": "[3]",  "one qubit gate": "-",  "two qubit gate": "-" },
        { "qubit": "semiconductor", "T1": "-", "Reference": "[3]",  "one qubit gate": "-",  "two qubit gate": "-" }
        // Add more objects as needed
    ];

    var table = $('#myTable').DataTable({
        data: data,
        columns: [
            { data: 'qubit' },
            { data: 'T1' },
            { data: 'one qubit gate' },
            { data: 'two qubit gate' },
            { data: 'Reference' }
        ]
    });
});
