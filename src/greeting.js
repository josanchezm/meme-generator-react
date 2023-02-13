const greeting = (name) => {
    let timeOfDay
    const time = new Date().getHours()
    if(time < 12) {
        timeOfDay = 'Morning'
    } else if (time >= 12 && time < 18) {
        timeOfDay = 'Afternoon'
    } else {
        timeOfDay = 'Night'
    }
    return `Good ${timeOfDay}, ${name}!`
}

console.log(greeting('Jaime'))