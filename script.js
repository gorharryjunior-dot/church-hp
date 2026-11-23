// 1. Automatic Countdown to Next Sunday at 8:30 AM
function getNextSunday() {
  const now = new Date();
  const nextSunday = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7;

  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(8, 30, 0, 0);

  // If it's already past Sunday 8:30 AM, target next week's Sunday
  if (nextSunday <= now) {
    nextSunday.setDate(nextSunday.getDate() + 7);
  }
  return nextSunday.getTime();
}

const targetService = getNextSunday();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetService - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}, 1000);

// 2. Scripture Verse Generator
const verses = [
  {
    text: '"The Lord is my shepherd; I shall not want."',
    ref: "— Psalm 23:1"
  },
  {
    text: '"I can do all things through Christ who strengthens me."',
    ref: "— Philippians 4:13"
  },
  {
    text: '"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."',
    ref: "— Joshua 1:9"
  },
  {
    text: '"Come to me, all you who are weary and burdened, and I will give you rest."',
    ref: "— Matthew 11:28"
  },
  {
    text: '"And now these three remain: faith, hope and love. But the greatest of these is love."',
    ref: "— 1 Corinthians 13:13"
  }
];

let currentVerseIndex = 0;

document.getElementById("new-verse-btn").addEventListener("click", () => {
  currentVerseIndex = (currentVerseIndex + 1) % verses.length;
  document.getElementById("verse-text").innerText = verses[currentVerseIndex].text;
  document.getElementById("verse-ref").innerText = verses[currentVerseIndex].ref;
});

// 3. Prayer Request Form Handler
document.getElementById("prayer-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("sender-name").value.trim() || "Friend";
  const confirmation = document.getElementById("prayer-confirmation");

  confirmation.classList.remove("hidden");
  confirmation.innerText = `Thank you, ${name}. Your prayer request has been received and lifted up in prayer.`;

  this.reset();
});
