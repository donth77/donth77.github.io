var code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
  key = 0;
audio = new Audio(
  "https://ia801602.us.archive.org/1/items/MACINTOSHPLUS420_201705/MACINTOSH%20PLUS%20-%20%E3%83%AA%E3%82%B5%E3%83%95%E3%83%A9%E3%83%B3%E3%82%AF420%20_%20%E7%8F%BE%E4%BB%A3%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC.mp3"
);
document.onkeydown = function (e) {
  if (code[key++] == e.keyCode) {
    if (key === 10) {
      console.log(
        "%cＡＥＳＴＨＥＴＩＣＳ\n美学",
        "font-weight: bold; font-size:40px;"
      );

      var body = document.getElementsByTagName("body")[0];
      container = document.createElement("div");
      container.className = "vw-container";

      containerb = document.createElement("div");
      containerb.className = "vw-containerb";

      loader = document.createElement("div");
      loader.className = "loader";

      for (let i = 0; i < 27; i++) {
        loader.appendChild(document.createElement("span"));
      }
      container.appendChild(loader);
      body.appendChild(container);
      body.insertBefore(containerb, body.firstChild);
      audio.pause();
      audio.currentTime = 0;
      audio.loop = true;
      audio.play();
      document.onkeypress = null;
      key = 0;
    }
  } else {
    key = 0;
  }
};
