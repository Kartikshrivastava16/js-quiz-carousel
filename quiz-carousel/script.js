function switchTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

const questions = [
  { q:"What does CSS stand for?", opts:["Cascading Style Sheets","Computer Style Sheets","Creative Style System","Colorful Style Sheets"], ans:0 },
  { q:"Which HTML tag is used to link an external JavaScript file?", opts:["<js>","<javascript>","<script>","<link>"], ans:2 },
  { q:"Which CSS property makes elements flex?", opts:["display: grid","display: flex","display: block","display: inline-flex"], ans:1 },
  { q:"What does API stand for?", opts:["Application Programming Interface","Automated Programming Index","Advanced Page Integration","App Protocol Interface"], ans:0 },
  { q:"Which keyword is used to declare a variable in modern JavaScript?", opts:["var","define","let / const","variable"], ans:2 }
];

let current = 0, score = 0, answered = false;

function renderQuestion() {
  const q = questions[current];
  document.getElementById('q-counter').textContent = `Question ${current+1} of ${questions.length}`;
  const progressFill = document.getElementById('progress-fill');
  progressFill.style.width = `${((current + 1) / questions.length) * 100}%`;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('next-btn').classList.add('is-hidden');
  document.getElementById('submit-btn').classList.add('is-hidden');
  answered = false;
  const letters = ['A','B','C','D'];
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    const letter = document.createElement('span');
    letter.className = 'opt-letter';
    letter.textContent = letters[i];
    const text = document.createElement('span');
    text.className = 'opt-text';
    text.textContent = opt;
    btn.append(letter, text);
    btn.onclick = () => selectAnswer(i, btn);
    container.appendChild(btn);
  });
}

function selectAnswer(idx, btn) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const allBtns = document.querySelectorAll('.opt-btn');
  allBtns.forEach(b => b.disabled = true);
  const fb = document.getElementById('quiz-feedback');
  if (idx === q.ans) {
    btn.classList.add('correct');
    fb.textContent = '✓ Correct!';
    fb.className = 'quiz-feedback correct';
    score++;
    document.getElementById('score-display').textContent = `Score: ${score} / ${questions.length}`;
  } else {
    btn.classList.add('wrong');
    allBtns[q.ans].classList.add('correct');
    fb.textContent = '✗ Wrong — the correct answer is highlighted.';
    fb.className = 'quiz-feedback wrong';
  }
  
  if (current < questions.length - 1) {
    document.getElementById('next-btn').classList.remove('is-hidden');
  } else {
    document.getElementById('submit-btn').classList.remove('is-hidden');
  }
}

function nextQuestion() {
  current++;
  if (current < questions.length) renderQuestion();
}

function submitQuiz() {
  showScore();
}

function showScore() {
  document.getElementById('quiz-content').classList.add('is-hidden');
  document.getElementById('score-screen').classList.remove('is-hidden');
  const pct = score / questions.length;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= .6 ? '🎉' : '📚';
  document.getElementById('final-score').textContent = `${score} / ${questions.length}`;
  
  let message = '';
  if (pct === 1) message = 'Perfect score! You nailed it!';
  else if (pct >= .8) message = 'Excellent! You really know your stuff!';
  else if (pct >= .6) message = 'Great job! Keep practising!';
  else if (pct >= .4) message = 'Good effort! Review the topics and try again!';
  else message = "Keep learning — you'll get there!";
  
  document.getElementById('final-msg').textContent = message;
  
  const details = document.getElementById('score-details');
  details.innerHTML = `
    <h4>📊 Quiz Summary</h4>
    <p>Correct Answers: ${score} out of ${questions.length}</p>
    <p>Accuracy: ${Math.round(pct * 100)}%</p>
  `;
}

function restartQuiz() {
  current = 0; 
  score = 0;
  document.getElementById('score-display').textContent = 'Score: 0 / 5';
  document.getElementById('score-screen').classList.add('is-hidden');
  document.getElementById('quiz-content').classList.remove('is-hidden');
  renderQuestion();
}

renderQuestion();

let slideIndex = 0;
const total = 5;
const track = document.getElementById('carousel-track');
const dotsContainer = document.getElementById('carousel-dots');
for (let i = 0; i < total; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goToSlide(i);
  dotsContainer.appendChild(d);
}

function updateCarousel() {
  track.className = `carousel-track s${slideIndex}`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === slideIndex));
}
function moveSlide(dir) { slideIndex = (slideIndex + dir + total) % total; updateCarousel(); }
function goToSlide(i) { slideIndex = i; updateCarousel(); }
setInterval(() => moveSlide(1), 4000);
