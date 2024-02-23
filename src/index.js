// Import any necessary dependencies (e.g., jQuery)
import $ from "jquery";
import "./index.css";
import "jquery-ui/ui/widgets/draggable";

class ImageViewer {
  maxZoomLevel;
  fullImageId;
  zoomingLevel = 1;
  image;
  constructor(querySelector, options = {}) {
    this.image = $(querySelector);
    this.maxZoomLevel = options.maxZoomLevel ?? "4";
    this.fullImageId = options.fullImageId ?? "#fullImage";
    this.image.css({cursor:'pointer'});
    this.image.on("click", (event) => this.#showFullScreenImage(event));
  }

  #showFullScreenImage(event) {
    this.zoomingLevel = 1;
    this.#fullImageTransform();
    const fullImageContainer = `<div class="fullImageContainer">
        <div class ="fullImageCloseBtnContainer">
        <svg xmlns="http://www.w3.org/2000/svg"  id="imageViewerCloseIcon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 18L18 6M18 18L6 6" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        </div>
        <div class="fullImageDiv">
          <img id="${this.fullImageId.replace("#", "")}" src="${event.target.getAttribute('src')}">
        </div>
      </div>`;
    $("body").append(fullImageContainer);
    $(this.fullImageId).fadeIn().draggable();
    $(".fullImageDiv").on("wheel", (event) => this.#wheelZoom(event));
    $(".fullImageCloseBtnContainer").on("click", () => {
      $(".fullImageContainer").remove();
      $(".fullImageDiv").off("wheel");
      $(".fullImageCloseBtnContainer").off("click");
    });
  }

  #wheelZoom(event) {
    event = event.originalEvent; // Ensure browser compatibility
    if (event.deltaY < 0 && this.zoomingLevel < this.maxZoomLevel) {
      this.zoomingLevel += 0.1;
      this.#fullImageTransform();
    } else if (event.deltaY > 0 && this.zoomingLevel > 0.2) {
      this.zoomingLevel -= 0.1;
      this.#fullImageTransform();
    }
  }

  #fullImageTransform = () => {
    $(this.fullImageId).css({ transform: `scale(${this.zoomingLevel})` });
  };
}

window.ImageViewer = ImageViewer;
