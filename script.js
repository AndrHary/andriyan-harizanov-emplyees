window.addEventListener('load', solve)
function solve() {
    let fileInput = document.getElementById('fileInput')
    fileInput.addEventListener('change', () => {
        let files = fileInput.files
        if (fileInput.files.length == 0) return
        let reader = new FileReader()
        reader.onload = (e) => {
            let time = 0
            let tArr = []
            let file = e.target.result
            let lines = file.split(/\r\n|\n/)
            let linesArr = lines.map((x) => x.split(', '))
            let timeArr = lines.map((x) => x.split(', '))
            linesArr.map((x) => {
                if (x[3] == 'NULL') {
                    x[2] = new Date(x[2].split('-').join('/')).getTime()
                    x[3] = new Date().getTime()
                } else {
                    x[2] = new Date(x[2].split('-').join('/')).getTime()
                    x[3] = new Date(x[3].split('-').join('/')).getTime()
                }
            });
            for (let i = 0; i < linesArr.length; i++) {
                for (let j = 0; j < linesArr.length; j++) {
                    if (linesArr[i][1] == linesArr[j][1] && linesArr[i][0] !== linesArr[j][0]) {
                        if (linesArr[i][3] > linesArr[i][2]) {  
                            let begginingDay = Math.max(linesArr[i][2], linesArr[j][2])
                            let endingDay = Math.min(linesArr[i][3], linesArr[j][3])
                            let dayCalculation = 1000 * 60 * 60 * 24
                            let diff = Math.abs(begginingDay - endingDay)
                            let days = (diff / dayCalculation).toFixed(0)
                            console.log(timeArr[i], timeArr[j])
                            if (time <= days) {
                                time =  Math.max(time, days)
                                tArr = [timeArr[i], timeArr[j], days]
                            }
                           console.log(days)
                           console.log(time)
                        } 
                    }
                }
            }
            let grid = new gridjs.Grid({
                columns: ['Employee 1', 'Employee 2', 'ProjectId', 'DaysAsTandem'],
                data: [
                    [timeArr[0][0], timeArr[1][0], timeArr[0][1], time]
                ]
            }).render(document.getElementById('wrapper'))
        }
        reader.readAsText(files[0]) 
    })
}