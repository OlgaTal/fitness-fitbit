const request =require('request');
let intervalID;

function getAllRuns() {
  request.get('http://localhost:9002/api/runs/abc123', (err, res, body) => {
    console.log(body);
  });
}

function startRun() {
  request.post('http://localhost:9002/api/runs/abc123/start', (err, res, body) => {
    console.log(res.statusCode);
    intervalID = setInterval(setPosition, 250);
  });
}

function stopRun() {
  clearInterval(intervalID);

  request.put('http://localhost:9002/api/runs/abc123/stop', (err, res, body) => {
    console.log(res.statusCode);
  });
}

function random (low, high) {
  return Math.random() * (high - low) + low;
}

function setPosition() {
  const position = {
      "latitude" : random(-10, 10),
      "longitude": random(-10, 10),
      "altitude": random(-1, 1),
      "currentTime": new Date()
  };
  var options = {
    url: 'http://localhost:9002/api/positions/abc123',
    json: true,
    body: position,
    method: 'POST'
  };
  request(options, (err, res, body) => {
    if (err) {
      console.error('Error:', err);

      stopRun();

    } else {
      console.log('Success:', res.statusCode);
    }
  });
}

startRun();

setTimeout(function() {
  stopRun();
}, 11000);


// startRun();
// var intervalID = setInterval(setPosition, 1000);

// getAllRuns();
//
// stopRun();
