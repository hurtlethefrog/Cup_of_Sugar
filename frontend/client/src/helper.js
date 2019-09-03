const moment = require('moment')

export function dateFormatter(datetime) {
  let date = datetime.slice(0,10)

  return moment(date).format("MMM Do") 
}

export function timeAgo(datetime) {

  return moment(datetime).fromNow()
}

export function eventDate(datetime) {
  let date = moment(datetime).format("dddd, MMMM Do YYYY")
  let time = moment(datetime).format("hh:mm a")

  return `${date}, ${time}`;
}