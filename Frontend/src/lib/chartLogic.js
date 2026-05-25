export function generatePlaceholderChart(seed = 1) {
    const rnd = (i) => ((i * 9301 + 49297) % 233280) / 233280;
    const grid = [];
    for (let r = 0; r < 3; r++) {
        const row = [];
        for (let c = 0; c < 3; c++) {
            seed++;
            row.push(Math.floor(rnd(seed) * 12) + 1);
        }
        grid.push(row);
    }
    return grid;
}
