(function () {
  // Get lazy load images
  let images = document.querySelectorAll(".lazy-load");

  // Determine if an element is in viewport
  let isInViewport = function (elem) {
    let distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Insert caption into the DOM
  let addCaption = function (img, text) {
    if (!text) return;
    let caption = document.createElement("caption");
    caption.innerHTML = text;
    img.parentNode.insertBefore(caption, img.nextSibling);
  };

  // Load images

  let loadImages = function () {
    // Loop through each lazy load image
    for (let i = 0; i < images.length; i++) {
      if (isInViewport(images[i])) {
        // Make sure the images has a data-image attribute and hasn't already been loaded( if a specified condition occurs it continues with the next iteration in the loop.)
        if (!images[i].hasAttribute("data-image")) continue;

        // Load the image
        images[i].innerHTML =
          '<img src="' + images[i].getAttribute("data-image") + '">';

        // Add a caption
        let img = images[i].querySelector("img");
        let text = images[i].getAttribute("data-caption");
        addCaption(img, text);

        // Remove the [data-image] attribute from the placeholder
        images[i].removeAttribute("data-image");
      }
    }
  };
  // Listen for scroll events
  window.addEventListener("scroll", loadImages, false);

  // Load images on page load
  loadImages();
})();
