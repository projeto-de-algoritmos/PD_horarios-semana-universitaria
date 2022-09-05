function getNames(item) {
  if (item === -1) return [];
  else return item[0];
}

function getRank(item) {
  if (item[1] === undefined) return 0;
  else return item[1];
}

function concatValues(spotA, spotB = -1) {
  if (spotB === -1) {
    return spotA;
  } else {
    var names = getNames(spotA);
    var nominhos = getNames(spotB);

    for (var nominho of nominhos) {
      names.push(nominho);
    }

    var ranking = getRank(spotA) + getRank(spotB);
    return [names, ranking];
  }
}

function retrieveRemaining(schedule, i, j, numHoras) {
  var jPos = j - numHoras;

  if (jPos < 0) {
    return -1;
  }

  var iPos = i - 1;
  var names = getNames(schedule[iPos][jPos]);
  var ranking = getRank(schedule[iPos][jPos]);

  if (names.length === 0) {
    return -1;
  }

  return [names, ranking];
}

function getHighestHour(spots) {
  var maxHour = -1;
  for (var spotX of spots) {
    var hour = spotX[1];
    if (hour > maxHour) maxHour = hour;
  }
  return maxHour;
}

function buildTable(spots) {
  var maxHour = getHighestHour(spots);

  var cols = maxHour / 3;
  var rows = spots.length;

  var schedule = [];

  for (var i = 0; i < rows; i++) {
    schedule.push([]);
    for (var j = 0; j < cols; j++) {
      schedule[i].push(-1);
    }
  }

  return schedule;
}

function calcTable(spots, schedule) {
  var rows = schedule.length;
  var cols = schedule[0].length;

  for (var i = 0; i < rows; i++) {
    var spotX = spots[i];

    let name = spotX[0];
    let numHoras = spotX[1] / 3;
    let ranking = spotX[2];

    for (var j = 0; j < cols; j++) {
      if (i === 0) {
        if (numHoras <= j + 1) {
          schedule[i][j] = [[name], ranking];
        }
      } else {
        if (numHoras <= j + 1) {
          var remainingRank = 0;

          if (j > 0) {
            var remain = retrieveRemaining(schedule, i, j, numHoras);
            remainingRank = getRank(remain);
          }

          if (getRank(schedule[i - 1][j]) < remainingRank + ranking) {
            schedule[i][j] = concatValues([[name], ranking], remain);
          } else {
            if (schedule[i - 1][j] !== -1)
              schedule[i][j] = [
                getNames(schedule[i - 1][j]),
                getRank(schedule[i - 1][j]),
              ];
          }
        } else {
          if (schedule[i - 1][j] !== -1)
            schedule[i][j] = [
              getNames(schedule[i - 1][j]),
              getRank(schedule[i - 1][j]),
            ];
        }
      }
    }
  }

  return schedule;
}

export default function gateway(spots) {
  var schedule = buildTable(spots);

  var lastRow = schedule.length - 1;
  var lastCol = schedule[0].length - 1;

  var newSchedule = calcTable(spots, schedule);

  return getNames(newSchedule[lastRow][lastCol]);
}
