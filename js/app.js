console.log("app is running...")

$(".ev-contacts").click(shiftLeft);
$(".ev-recent").click(shiftRight);

function shiftRight() {
  console.log("shifting right");
  $(".calls").removeClass("shift-left");
  $(".contacts").removeClass("shift-center");
  $(".contacts").addClass("shift-right");
  $(".calls").addClass("shift-center");
};

function shiftLeft() {
  console.log("shifting left");
  $(".calls").addClass("shift-left");
  $(".calls").removeClass("shift-center");
  $(".contacts").addClass("shift-center");
  $(".contacts").removeClass("shift-right");
}
