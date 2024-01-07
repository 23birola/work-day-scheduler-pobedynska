dayjs.extend(window.dayjs_plugin_advancedFormat);
const currentDay = dayjs().format('dddd, MMMM Do');
const currentTime = parseInt(dayjs().format('H'));
$('#currentDay').text(currentDay);

const hoursArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const savedTasks = localStorage;
const taskkeys = Object.keys(savedTasks);

const renderRows = (hours) => {
const container = $('.container.time-block');
  hours.map(hour => {
    const row = $("<div class='row'>");
    const currentHr = dayjs().hour(hour).format('hA');
    const hr = $("<div class='hour col-2'>").text(currentHr);
    row.append(hr);
    const textArea = $("<textarea class='col-8'>");
    handleColor(hour, currentTime, textArea);
    if (taskkeys.includes(currentHr)) {
      textArea.text(savedTasks[currentHr]);
    }
    row.append(textArea);
    const btn = $("<button class='saveBtn col-2'>").text('Save');
    row.append(btn);
    container.append(row);
  })
}

function handleColor (time, current, e) {
  if (time < current) {
    e.addClass('past');
    e.prop('disabled', true);

  } else if (time === current) {
    e.addClass('present');
    e.prop('disabled', false);
  } else {
    e.addClass('future');
    e.prop('disabled', false);
  }
}

const handleSaveBtn = function (e) {
  e.preventDefault();
  const task = $(e.target);
  const description = task.parent().find('textarea').val().trim();
  const taskHr = task.parent().find('.hour').text();
  description && localStorage.setItem(taskHr, description);  
}

renderRows(hoursArr);
$('.time-block').on('click', '.saveBtn', handleSaveBtn);