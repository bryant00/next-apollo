export const resolvers = {
    Query: {
        viewer(_parent, _args, _context, _info) {
            return { id: 1, name: "John Smith", status: "cached" }
        },
        thetime(_parent, _args, _context, _info) {
            var currentDate = new Date()
            var date = currentDate.getDate()
            var month = currentDate.getMonth() //Be careful! January is 0 not 1
            var year = currentDate.getFullYear()
            var hour = currentDate.getHours()
            var minute = currentDate.getMinutes()
            var seconds = currentDate.getSeconds()
            var dateString = date + "-" + (month + 1) + "-" + year

            return {
                date: date,
                month: month,
                year: year,
                dateString: dateString,
            }
        },
    },
}
