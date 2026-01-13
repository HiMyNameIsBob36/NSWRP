 const images = [
    "assets/bg/01.png",
    "assets/bg/02.png",
    "assets/bg/03.png",
    "assets/bg/04.png",
    "assets/bg/05.png"
  ];

  const hero = document.getElementById("hero");
  const randomIndex = Math.floor(Math.random() * images.length);

  hero.style.backgroundImage = `url(${images[randomIndex]})`;
