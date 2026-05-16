const weatherIcons = {0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',71:'🌨',73:'🌨',75:'🌨',77:'🌨',80:'🌦',81:'🌧',82:'🌧',85:'🌨',86:'🌨',95:'⛈',96:'⛈',99:'⛈'};
const weatherDesc = {0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',48:'Icy fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Slight rain',63:'Moderate rain',65:'Heavy rain',71:'Slight snow',73:'Moderate snow',75:'Heavy snow',80:'Rain showers',81:'Moderate showers',82:'Violent showers',95:'Thunderstorm',99:'Heavy thunderstorm'};

async function fetchWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;
  const btn = document.getElementById('weather-btn');
  const result = document.getElementById('weather-result');
  btn.disabled = true; btn.textContent = '⏳';
  result.innerHTML = `<span class="spinner">⚙️</span><span class="weather-empty">Fetching weather…</span>`;
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();
    if (!geoData.results?.length) throw new Error('City not found');
    const { latitude, longitude, name, country } = geoData.results[0];
    const wxRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const wxData = await wxRes.json();
    const cw = wxData.current_weather;
    const icon = weatherIcons[cw.weathercode] || '🌡';
    const desc = weatherDesc[cw.weathercode] || 'Unknown';
    result.innerHTML = `<div class="weather-big">${icon}</div><div class="weather-temp">${Math.round(cw.temperature)}°C</div><div class="weather-desc">${desc}</div><div class="weather-city">📍 ${name}, ${country}</div><div class="weather-meta"><span>💨 ${cw.windspeed} km/h</span><span>🕐 Updated just now</span></div>`;
  } catch(e) {
    result.innerHTML = `<span class="error-msg">⚠ ${e.message || 'Could not fetch weather.'}</span>`;
  } finally { btn.disabled = false; btn.textContent = 'Fetch ⚡'; }
}

document.getElementById('city-input').addEventListener('keydown', e => { if (e.key === 'Enter') fetchWeather(); });

async function fetchJoke() {
  const btn = document.getElementById('joke-btn');
  const result = document.getElementById('joke-result');
  btn.disabled = true; btn.textContent = '⏳ Fetching…';
  result.innerHTML = `<span class="spinner">⚙️</span>`;
  try {
    const res = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist');
    const data = await res.json();
    if (data.type === 'twopart') {
      result.innerHTML = `<div class="joke-emoji">🎭</div><div class="joke-setup">${data.setup}</div><div class="joke-delivery">— ${data.delivery}</div><div class="joke-category">${data.category.toUpperCase()}</div>`;
    } else {
      result.innerHTML = `<div class="joke-emoji">😄</div><div class="joke-single">${data.joke}</div><div class="joke-category">${data.category.toUpperCase()}</div>`;
    }
  } catch(e) {
    result.innerHTML = `<span class="error-msg">⚠ Could not fetch joke. Try again!</span>`;
  } finally { btn.disabled = false; btn.textContent = 'Get Another Joke 😄'; }
}

async function fetchAdvice() {
  const btn = document.getElementById('advice-btn');
  const result = document.getElementById('advice-result');
  btn.disabled = true; btn.textContent = '⏳ Thinking…';
  result.innerHTML = `<span class="spinner">⚙️</span>`;
  try {
    const res = await fetch('https://api.adviceslip.com/advice', { cache:'no-cache' });
    const data = await res.json();
    result.innerHTML = `<div class="advice-emoji">💡</div><div class="advice-text">"${data.slip.advice}"</div><div class="advice-id">Advice #${data.slip.id}</div>`;
  } catch(e) {
    result.innerHTML = `<span class="error-msg">⚠ Could not fetch advice. Try again!</span>`;
  } finally { btn.disabled = false; btn.textContent = 'Get Another 💡'; }
}
