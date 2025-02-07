$(document).ready(function() {
    $.getJSON('data.json', function(data) {
        // DataTable 初期化
        var table = $('#mainTable').DataTable({
            data: data,
            columns: [
                { data: 'qubit' },
                { data: 'T1' },
                { data: 'T2*'},
                { data: 'T2' },
                { data: 'one_qubit_gate' },
                { data: 'one_qubit_gate_fidelity' },
                { data: 'two_qubit_gate' },
                { data: 'two_qubit_gate_fidelity' },
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

        // Qubit の選択肢を重複なく追加
        var qubits = [];
        data.forEach(function(item) {
            if(item.qubit && qubits.indexOf(item.qubit) === -1) {
                qubits.push(item.qubit);
            }
        });
        qubits.forEach(function(q) {
            $('#qubitSelect').append('<option value="'+q+'">'+q+'</option>');
        });

        var chartInstance = null;

        // 「グラフ描画」ボタン押下時の処理
        $('#drawChartBtn').on('click', function() {
            var selectedQubit = $('#qubitSelect').val();
            var xField = $('#xAxisSelect').val();
            var yField = $('#yAxisSelect').val();

            // 指定した Qubit で絞る（空文字の場合は全て）
            var filteredData = data.filter(function(item) {
                return !selectedQubit || item.qubit === selectedQubit;
            });

            // x, y 軸のデータ抽出
            var xValues = [];
            var yValues = [];
            filteredData.forEach(function(item) {
                // 値が null/undefined でない場合のみ追加
                if(item[xField] !== undefined && item[yField] !== undefined) {
                    xValues.push(item[xField]);
                    yValues.push(item[yField]);
                }
            });

            // キャンバス上のグラフを更新（既存の場合は破棄）
            if(chartInstance) {
                chartInstance.destroy();
            }
            var ctx = document.getElementById('myChart').getContext('2d');
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: yField,
                        data: yValues,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: yField
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: xField
                            }
                        }
                    }
                }
            });
        });
    });
});