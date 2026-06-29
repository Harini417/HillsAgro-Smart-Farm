const soilList = document.getElementById('soil-list');
const sensorCount = document.getElementById('sensor-count');
const fieldCount = document.getElementById('field-count');
const waterSavings = document.getElementById('water-savings');
const refreshSoilButton = document.getElementById('refresh-soil');
const weatherCondition = document.getElementById('weather-condition');
const weatherLocation = document.getElementById('weather-location');
const weatherTemp = document.getElementById('weather-temp');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherWind = document.getElementById('weather-wind');
const slopeSelect = document.getElementById('slope-select');
const soilSelect = document.getElementById('soil-select');
const cropSelect = document.getElementById('crop-select');
const recommendedCrop = document.getElementById('recommended-crop');
const expectedYield = document.getElementById('expected-yield');
const harvestWindow = document.getElementById('harvest-window');
const fertilizerType = document.getElementById('fertilizer-type');
const fertilizerRate = document.getElementById('fertilizer-rate');
const fertilizerPh = document.getElementById('fertilizer-ph');
const irrigationStatus = document.getElementById('irrigation-status');
const nextCycle = document.getElementById('next-cycle');
const toggleIrrigation = document.getElementById('toggle-irrigation');
const waterUsage = document.getElementById('water-usage');

const soilSensors = [
  { name: 'Terrace 1', moisture: 72, status: 'Healthy' },
  { name: 'Terrace 2', moisture: 60, status: 'Optimal' },
  { name: 'Apple Orchard', moisture: 48, status: 'Dry' },
  { name: 'Cardamom Block', moisture: 53, status: 'Stable' },
  { name: 'Tea Ridge', moisture: 67, status: 'Good' }
];

const weatherSamples = [
  { condition: 'Sunny', icon: '☀️', location: 'Northeastern Hills', temp: '22°C', humidity: '62%', wind: '12 km/h' },
  { condition: 'Light Rain', icon: '🌧️', location: 'Western Valley', temp: '18°C', humidity: '78%', wind: '9 km/h' },
  { condition: 'Cloudy', icon: '⛅', location: 'Eastern Slope', temp: '20°C', humidity: '70%', wind: '10 km/h' }
];

const cropProfiles = {
  cardamom: {
    name: 'Cardamom',
    yield: '1.1 t/ha',
    window: '12-16 months',
    fertilizer: 'NPK 12-32-16',
    rate: '160 kg/ha',
    ph: '6.0 - 6.5'
  },
  potato: {
    name: 'Potato',
    yield: '24 t/ha',
    window: '14-18 weeks',
    fertilizer: 'NPK 18-46-0',
    rate: '220 kg/ha',
    ph: '5.5 - 6.5'
  },
  tea: {
    name: 'Tea',
    yield: '4.2 t/ha',
    window: '18-22 weeks',
    fertilizer: 'NPK 13-13-21',
    rate: '200 kg/ha',
    ph: '4.5 - 5.5'
  },
  apple: {
    name: 'Apple',
    yield: '25 t/ha',
    window: '18-24 months',
    fertilizer: 'NPK 10-10-20',
    rate: '180 kg/ha',
    ph: '6.0 - 7.0'
  }
};

let irrigationOn = false;

function renderSoilCards() {
  soilList.innerHTML = '';
  soilSensors.forEach(sensor => {
    const card = document.createElement('div');
    card.className = 'soil-card';
    card.innerHTML = `
      <div>
        <h3>${sensor.name}</h3>
        <p>Status: ${sensor.status}</p>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${sensor.moisture}%"></div>
      </div>
      <p>${sensor.moisture}% moisture</p>
    `;
    soilList.appendChild(card);
  });
}

function updateDashboardStats() {
  sensorCount.textContent = soilSensors.length;
  fieldCount.textContent = 5;
  const average = Math.round(soilSensors.reduce((sum, sensor) => sum + sensor.moisture, 0) / soilSensors.length);
  const waterUsed = average > 50 ? 22 : 35;
  waterSavings.textContent = `${waterUsed}%`;
}

function refreshSoilData() {
  soilSensors.forEach(sensor => {
    const drift = Math.round((Math.random() - 0.4) * 10);
    sensor.moisture = Math.min(100, Math.max(28, sensor.moisture + drift));
    sensor.status = sensor.moisture < 50 ? 'Needs water' : 'Healthy';
  });
  renderSoilCards();
  updateDashboardStats();
}

function updateWeatherPanel() {
  const sample = weatherSamples[Math.floor(Math.random() * weatherSamples.length)];
  weatherCondition.textContent = sample.condition;
  weatherLocation.textContent = sample.location;
  weatherTemp.textContent = sample.temp;
  weatherHumidity.textContent = sample.humidity;
  weatherWind.textContent = sample.wind;
}

function updateRecommendation() {
  const selectedCrop = cropSelect.value;
  const profile = cropProfiles[selectedCrop];
  recommendedCrop.textContent = profile.name;
  expectedYield.textContent = profile.yield;
  harvestWindow.textContent = profile.window;
  fertilizerType.textContent = profile.fertilizer;
  fertilizerRate.textContent = profile.rate;
  fertilizerPh.textContent = profile.ph;
}

function updateIrrigationState() {
  if (irrigationOn) {
    irrigationStatus.textContent = 'Running';
    toggleIrrigation.textContent = 'Stop Irrigation';
    waterUsage.style.width = '65%';
    nextCycle.textContent = 'In 3 hours';
  } else {
    irrigationStatus.textContent = 'Idle';
    toggleIrrigation.textContent = 'Start Irrigation';
    waterUsage.style.width = '38%';
    nextCycle.textContent = '10:30 AM, Tomorrow';
  }
}

function setupEvents() {
  refreshSoilButton.addEventListener('click', refreshSoilData);
  cropSelect.addEventListener('change', updateRecommendation);
  slopeSelect.addEventListener('change', updateRecommendation);
  soilSelect.addEventListener('change', updateRecommendation);
  toggleIrrigation.addEventListener('click', () => {
    irrigationOn = !irrigationOn;
    updateIrrigationState();
  });
}

function init() {
  renderSoilCards();
  updateDashboardStats();
  updateWeatherPanel();
  updateRecommendation();
  updateIrrigationState();
  setupEvents();
  setInterval(updateWeatherPanel, 18000);
}

init();
