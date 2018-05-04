const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillRect(20, 40, 50, 100);
context.strokeStyle = "rgb(0,0,255)";
context.fillStyle = "rgb(255,0,0)";
context.strokeRect(200, 80, 100, 50);
context.arc(150, 75, 60, Math.PI * 1, Math.PI * 2, true);
context.fill();

($ => {
  $.ajax({
    url: "/upload",
    method: "POST",
    data: {
      image: canvas.toDataURL()
    }
  });
})(jQuery);
