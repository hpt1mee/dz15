import lodash from 'lodash';
import fs from 'fs/promises';
import path from 'path';



async function readFile(err) {
    try {
        const filePath = path.join(process.cwd(), 'student.json');
        const data = await fs.readFile(filePath, 'utf8');
        const students = JSON.parse(data);
        return students
}
catch (err) {
    console.error('Error reading file:', err);
}
}
const students = await readFile()
let result = [
    'Отчёт по успеваемости студентов',
    '='.repeat(30),
    `Общее количество студентов: ${students.length}`,
    'Средние баллы:',

]


const studentsAvgObj = students.map(student => {
    const gradesArray = Object.values(student.grades)
    const avg = lodash.mean(gradesArray)
    return { name: student.name, avg: lodash.round(avg, 2) }
});


const studentsAvgDebug = students.map(student => {
    const gradesArray = Object.values(student.grades)
    const avg = lodash.mean(gradesArray)
    const names = student.name
    return `- ${names} : ${lodash.round(avg, 2)}\n`
})

const goodStudents = lodash.filter(studentsAvgObj, (el) => el.avg >= 4.5).length
const badStudents = lodash.filter(studentsAvgObj, (el) => el.avg <= 3.0).length

result.push(studentsAvgDebug)

result.push(`- хоршоие  ученики : ${goodStudents}`)
result.push(`- плохие  ученики : ${badStudents}\n`)
result.push(`Дата создания ${new Date().toLocaleDateString()}`)

fs.writeFile('info.txt', result.join('\n').split(',').join('') )

console.log(result.join('\n').split(',').join(''))


