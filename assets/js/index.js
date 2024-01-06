dayjs.extend(window.dayjs_plugin_advancedFormat);
const currentDay = dayjs().format('dddd, MMMM Do');
const currentTime = parseInt(dayjs().format('h'));
$('#currentDay').text(currentDay);

console.log(typeof(currentTime));

const hoursArr = [9, 10, 8, 12, 13, 14, 15, 16, 17];

const renderRows = (hours) => {
  const container = $('.container.time-block');
  hours.map(hour => {
    const row = $("<div class='row'>");
    const hr = $("<div class='hour col-2'>").text(hour.toString());
    row.append(hr);
    const textArea = $("<div class='col-8'>");
    handleColor(hour, currentTime, textArea);
    row.append(textArea);
    const btn = $("<button class='saveBtn col-2'>").text('Save');
    row.append(btn);
    container.append(row);
  })
}

renderRows(hoursArr);
function handleColor (time, current, e) {
  if (time < current) {
    e.addClass('past');
  } else if (time === current) {
    e.addClass('present');
  } else {
    e.addClass('future');
  }
}