async function upvoteClickHandler(event) {
  event.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(id);
  console.log("button clicked");
}

console.log("waiting for a click");

document
  .querySelector(".upvote-btn")
  .addEventListener("click", upvoteClickHandler);
