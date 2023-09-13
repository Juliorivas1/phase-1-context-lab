function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });

    return employeeRecord;
}


function hoursWorkedOnDate(employee, date) {
    let inEvent = employee.timeInEvents.find((e) => e.date === date)
    let outEvent = employee.timeOutEvents.find((e) => e.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    let wages = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return wages
}

function allWagesFor2(employee) {
    let eligibleDates = employee.timeInEvents.map((e) => e.date)
    let payable = eligibleDates.reduce((memo, date) => memo + wagesEarnedOnDate(employee, date), 0)
    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((rec) => rec.firstName === firstName)
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0)
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

