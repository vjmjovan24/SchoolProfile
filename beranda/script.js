function toggleNav() {
      document.getElementById('hamburger').classList.toggle('open');
      document.getElementById('navDropdown').classList.toggle('open');
    }

const numbers = document.querySelectorAll('.stat-number');
const grade = document.querySelector('.grade');

/* COUNTER */
const animateCounter = (el) => {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const speed = target / 100;

  const update = () => {
    count += speed;

    if (count < target) {
      el.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      if (el.classList.contains("plus")) {
        el.innerText = target + "+";
      } else {
        el.innerText = target;
      }
    }
  };

  update();
};

/* AKREDITASI */
const animateGrade = () => {
  const grades = ["C", "B", "A"];
  let i = 0;

  const interval = setInterval(() => {
    grade.innerText = grades[i];
    grade.classList.add("pop");

    setTimeout(() => grade.classList.remove("pop"), 200);

    i++;
    if (i === grades.length) clearInterval(interval);
  }, 400);
};

/* SCROLL TRIGGER */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      if (entry.target.classList.contains('grade')) {
        animateGrade();
      } else {
        animateCounter(entry.target);
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

numbers.forEach(el => observer.observe(el));

