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
            var selectedQubits = $('#qubitSelect').val(); // 複数選択の場合は配列になる
            var xField = $('#xAxisSelect').val();
            var yField = $('#yAxisSelect').val();
            var yScale = $('#yScaleSelect').val();
        
            // 全件表示の場合（空文字か、選択が全ての場合）
            if (!selectedQubits || (Array.isArray(selectedQubits) && selectedQubits.length === 0) || (selectedQubits.length === 1 && selectedQubits[0] === "")) {
                selectedQubits = []; 
                // 空の場合はすべての Qubit を表示するため、ユニークな値を抽出
                data.forEach(function(item) {
                    if(item.qubit && selectedQubits.indexOf(item.qubit) === -1) {
                        selectedQubits.push(item.qubit);
                    }
                });
            }
        
            // Qubit ごとにデータをまとめ、各シリーズを生成
            var colors = [
                'rgba(75, 192, 192, 1)',
                'rgba(192, 75, 75, 1)',
                'rgba(75, 75, 192, 1)',
                'rgba(192, 192, 75, 1)',
                'rgba(75, 192, 75, 1)',
                'rgba(192, 75, 192, 1)'
            ];
            var datasets = [];
            
            selectedQubits.forEach(function(q, index) {
                // q に該当するデータをフィルタ
                var seriesData = data.filter(function(item) {
                    return item.qubit === q && item[xField] !== undefined && item[yField] !== undefined;
                }).map(function(item) {
                    return { x: item[xField], y: item[yField] };
                });
                // 系列が存在すればデータセットに追加
                if(seriesData.length > 0) {
                    datasets.push({
                        label: q,
                        data: seriesData,
                        borderColor: colors[index % colors.length],
                        backgroundColor: colors[index % colors.length],
                        fill: false,
                        tension: 0.1
                    });
                }
            });
        
            // 既存グラフの破棄
            if(chartInstance) {
                chartInstance.destroy();
            }
            var ctx = document.getElementById('myChart').getContext('2d');
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    // 複数系列の場合は labels プロパティは不要。各 dataset の x 値が使われる。
                    datasets: datasets
                },
                options: {
                    scales: {
                        y: {
                            type: yScale,
                            beginAtZero: (yScale === 'linear'),
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