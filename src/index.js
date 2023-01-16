const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
var students = require('./initialData')
const [validateStudent, validateUpdate] = require('./validator')

var id = students.length

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/student', (req, res) => {

    res.status(200).json(students)

})

app.get('/api/student/:id', (req, res) => {

    const student = students.find((student) => student.id == req.params.id)

    student ?
        res.status(200).json(student) :
        res.status(404).json({ error: 'Student id is not valid!' })

})

app.post('/api/student', (req, res) => {

    const [result, message] = validateStudent(req.body)
    if (result) {
        const { name, currentClass, division } = req.body
        id += 1
        students.push({
            id,
            name,
            currentClass: Number(currentClass),
            division,
        })
        res.status(201).json({
            message,
            id,
        })
    } else {
        res.status(404).json({ error: message })
    }

})

app.put('/api/student/:id', (req, res) => {

    const student = students.findIndex(student => student.id == req.params.id)

    if (student != -1) {
        const [result, message] = validateUpdate(req.body)
        if (result) {
            students.splice(student, 1, { ...students[student], ...req.body })
            res.status(201).json({ message: 'Student record updated successfully' })
        } else {
            res.status(404).json({ error: message })
        }
    } else {
        res.status(404).json({ error: 'Student id is not valid!' })
    }

})

app.delete('/api/student/:id', (req, res) => {

    const student = students.find(student => student.id == req.params.id)

    if (student) {
        students = students.filter(student => student.id != req.params.id)
        res.status(200).json({ message: 'Student record deleted successfully' })
    } else {
        res.status(404).json({ error: 'Student id is not valid!' })
    }
    
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;