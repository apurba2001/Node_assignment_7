const updateValidator = ({ name, currentClass, division }) => {

    currentClass = Number(currentClass)

    if (name)
        if (!/^[a-zA-Z ]+$/.test(name)) return [false, 'Name is not valid']

    if (currentClass) {
        if (isNaN(currentClass) || currentClass > 12 || currentClass % 1 || currentClass <= 0)
            return [false, 'Class is not valid']
    }
    if (division)
        if (!/^[A-D]+$/.test(division)) return [false, 'Division is not valid']

    return [true, 'Student data recorded successfully']
}

const studentValidator = ({ name, currentClass, division }) => {

    if (!name)
        return [false, 'Please provide name']

    else if (!currentClass)
        return [false, 'Please provide class']

    else if (!division)
        return [false, 'Please provide division']
        
    else
        return updateValidator({ name, currentClass, division })
}



module.exports = [studentValidator, updateValidator]
