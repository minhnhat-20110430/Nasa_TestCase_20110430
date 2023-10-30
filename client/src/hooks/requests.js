async function httpGetPlanets() {
  const response = await fetch('http://localhost:8000/planets');
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await fetch('http://localhost:8000/launches');
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch('http://localhost:8000/launches', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  });
  } catch(err) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch('http://localhost:8000/launches/' + id, {
    method: 'delete',
  });
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};