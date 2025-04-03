async function loadAllScores() {
    const seen = new Set();
    const allScores = [];
    let latestTimeStamp = null;

    const fileListRes = await fetch(`/data-files`)
    const files = await fileListRes.json();
    // For each file, fetch and process
    for (const file of files) {
        try {
            const res = await fetch(`/static/${file}`)
            const data = await res.json();

            data.forEach(([score, timestamp]) => {
                const uniqueKey = `${score}-${timestamp}`;
                if (!seen.has(uniqueKey)) {
                    seen.add(uniqueKey);
                    allScores.push(score);

                    if (!latestTimeStamp || new Date(timestamp) > new Date(latestTimeStamp)) {
                        latestTimeStamp = timestamp;
                    }
                }
            });
        } catch (err) {
            console.error(`Failed to load ${file}:`, err);
        }
    }

    return { allScores, latestTimeStamp };
}

function buildHistogram(scores) {
    const bins = Array(101).fill(0);
    scores.forEach(score => {
        if (score >= 0 && score <= 100) {
            bins[score]++;
        }
    });
    return bins;
}

function calculateStats(scores) {
    if (scores.length === 0) return null;

    const total = scores.length;
    const mean = (scores.reduce((a, b) => a + b) / total).toFixed(2);

    const sorted = [...scores].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0 ?
        ((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2) :
        sorted[Math.floor(sorted.length / 2)];

    return {total, mean, median};
}

function renderStats(stats, latestTimeStamp) {
    const statsContainer = document.createElement("div");
    statsContainer.style.textAlign = "center";
    statsContainer.style.marginTop = "20px";

    const utcDate = latestTimeStamp ? new Date(`${latestTimeStamp}Z`) : null;
    const formattedTime = utcDate
        ? utcDate.toLocaleString(undefined, { timeZoneName: "short" })
        : "Unknown";

    statsContainer.innerHTML = `<p><strong>Total Submissions:</strong> ${stats.total}</p>
    <p><strong>Mean:</strong> ${stats.mean}</p>
    <p><strong>Median:</strong> ${stats.median}</p>
    <p><strong>Last Updated:</strong> ${formattedTime}</p>
`;

    document.querySelector(".container").appendChild(statsContainer);
}


function renderChart(data) {
    const ctx = document.getElementById('scoreChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length : 101}, (_, i) => i),
            datasets: [{
                label: "Number of Users",
                data: data,
                backgroundColor: "rgba(0, 102, 204, 0.6)",
                borderColor: "rgba(0, 102, 204,1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Purity Score"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Number of Users"
                    },
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

//Main
loadAllScores().then(({ allScores, latestTimeStamp }) => {
    const histogram = buildHistogram(allScores);
    const stats = calculateStats(allScores);
    renderChart(histogram);
    if (stats) renderStats(stats, latestTimeStamp);
});
