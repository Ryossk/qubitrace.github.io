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
                { data: 'readout' },
                { data: 'readout_fidelity' },
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
            var selectedQubits = $('#qubitSelect').val();
            var xField = $('#xAxisSelect').val();
            var yField = $('#yAxisSelect').val();
            var yScale = $('#yScaleSelect').val();
            var chartType = $('#chartTypeSelect').val();
        
            // 全件表示の場合
            if (!selectedQubits || (Array.isArray(selectedQubits) && selectedQubits.length === 0) ||
               (Array.isArray(selectedQubits) && selectedQubits.length === 1 && selectedQubits[0] === "")) {
                selectedQubits = [];
                data.forEach(function(item) {
                    if(item.qubit && selectedQubits.indexOf(item.qubit) === -1){
                        selectedQubits.push(item.qubit);
                    }
                });
            }
            
            var colors = [
                'rgba(75, 192, 192, 1)',
                'rgba(192, 75, 75, 1)',
                'rgba(75, 75, 192, 1)',
                'rgba(192, 192, 75, 1)',
                'rgba(75, 192, 75, 1)',
                'rgba(192, 75, 192, 1)'
            ];
            var datasets = [];
            
            // 各 Qubit ごとに x, y の値を {x, y} オブジェクトとして生成
            selectedQubits.forEach(function(q, index) {
                var points = [];
                data.forEach(function(item) {
                    if(item.qubit === q && item[xField] !== undefined && item[yField] !== undefined){
                        // x 軸の値は数値に変換（Year 等の場合）
                        points.push({ x: Number(item[xField]), y: item[yField] });
                    }
                });
                // x の昇順にソート
                points.sort(function(a, b) { return a.x - b.x; });
                if(points.length > 0){
                    datasets.push({
                        label: q,
                        data: points,
                        borderColor: colors[index % colors.length],
                        backgroundColor: colors[index % colors.length],
                        fill: false,
                        tension: 0.0,
                        spanGaps: true,
                        showLine: (chartType === 'line') ? true : false  // line なら線で繋ぎ、scatter なら点のみ
                    });
                }
            });
        
            if(chartInstance) {
                chartInstance.destroy();
            }
            var ctx = document.getElementById('myChart').getContext('2d');
            
            // 共通の xLabels は不要。x軸は各データオブジェクトの x 値を反映
            var config = {
                type: chartType,
                data: {
                    datasets: datasets
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            ticks: {
                                callback: function(value, index, values) {
                                    // X軸に Year を選択した場合、値を文字列にしてコンマ無しで返す
                                    return (xField === 'Year') ? value.toString() : value;
                                }
                            },
                            title: {
                                display: true,
                                text: xField
                            }
                        },
                        y: {
                            type: yScale,
                            beginAtZero: (yScale === 'linear'),
                            ticks: {
                                callback: function(value, index, values) {
                                    // Y軸に Year を選択した場合
                                    return (yField === 'Year') ? value.toString() : value;
                                }
                            },
                            title: {
                                display: true,
                                text: yField
                            }
                        }
                    }
                }
            };
            
            chartInstance = new Chart(ctx, config);
        });
    });
});