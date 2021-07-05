import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import config from "../config";

export function NewsPaperPage({ page }) {
  const [snippetContainerStyles, setSnippetContainerStyles] = useState({});
  const [snippetImageStyles, setSnippetImageStyles] = useState({});
  const [modalShown, setModalShown] = useState(false);
  if (!page) return null;

  const { img, links } = page;

  const showSnippetModal = (link) => {
    let transform = `scale(1)`;
    let width, height;
    let docWidth = 0.9 * document.querySelector("body").offsetWidth;

    if (docWidth > 900) docWidth = 900;
    if (docWidth < 700) transform = `scale(${docWidth / (docWidth * link.style.width * 0.01)})`;
    height = `calc((${docWidth}px * ${link.style.width * 0.01}) * 1.5757 * (${link.style.height} / ${link.style.width}))`;
    width = `calc(${docWidth}px * ${link.style.width * 0.01})`;

    const containerStyles = {
      height,
      width,
      transform,
    };
    const imageStyles = {
      marginTop: `calc(-${link.style.x * 0.01} * (${docWidth}px * 1.5757))`,
      marginLeft: `calc(-${link.style.y * 0.01} * ${docWidth}px)`,
      width: `${docWidth}px`,
      height: `calc(${docWidth}px * 1.5757)`,
    };
    setSnippetImageStyles(imageStyles);
    setSnippetContainerStyles(containerStyles);
    setModalShown(true);
  };

  return (
    <div className="newspaper-page">
      <div className={`newspaper-snippet-modal ${modalShown}`}>
        <div className="content">
          <div className="close-btn" onClick={() => setModalShown(false)}>
            <ion-icon name="close" />
          </div>
          <div className="newspaper-snippet-image" style={snippetContainerStyles}>
            <img src={img} alt="newspaper page" style={snippetImageStyles} />
          </div>
        </div>
      </div>
      <div className="newspaper-img">{img && <img src={img} alt="newspaper page" />}</div>
      <div className="newspaper-clickable-area">
        {links &&
          links.map((link, i) => (
            <div
              key={i}
              className="newspaper-clickable"
              onClick={() => showSnippetModal(link)}
              style={{
                top: link.style.x + "%",
                left: link.style.y + "%",
                height: link.style.height + "%",
                width: link.style.width + "%",
              }}
            />
          ))}
      </div>
    </div>
  );
}

function NewsPaper({ data, page }) {
  const { pages, date, pdfDownload } = data;
  const [index, setIndex] = useState(page);
  const [copied, setCopied] = useState("Share link");

  const onClickShare = () => {
    const str = `${window.location.origin || ""}/share/${date}/${index}`;
    if (process.browser) {
      if (navigator.share) {
        navigator.share({ title: str, url: str });
      } else {
        const el = document.createElement("textarea");
        el.value = str;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied("Copied!");
        setInterval(() => setCopied("Copy link"), 5000);
      }
    }
  };

  return (
    <div className="newspaper">
      <div className="newspaper-top">
        <h3 className="newspaper-date">Date: {date}</h3>
        {pdfDownload && (
          <a className="btn sm" href={pdfDownload}>
            Download PDF
          </a>
        )}
        <button className="btn sm" onClick={onClickShare}>
          {copied}
        </button>
      </div>
      <div className="newspaper-pages">
        {pages.map((page, i) => (
          <CSSTransition key={i} in={index === i} timeout={300} classNames="newspaper-page" unmountOnExit>
            <NewsPaperPage key={i} page={page} />
          </CSSTransition>
        ))}
      </div>
      <div className="newspaper-pagination">
        {pages.map((page, i) => (
          <div className={`newspaper-pagination-btn${i === index ? " active" : ""}`} onClick={() => setIndex(i)} key={i}>
            <img src={page.img} alt="newspaper page preview" />
            <span>
              {i + 1}: {page.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

NewsPaper.defaultProps = {
  page: 0,
  data: {
    pages: [
      {
        img: "http://elokasha.com/uploads/small/lokasha-s-1.jpg?i=37183109052020",
        title: "Front",
        links: [
          { style: { x: 13.5, y: 1, width: 98, height: 27.5 } },
          { style: { x: 41, y: 2, width: 53, height: 17 } },
          { style: { x: 41, y: 55, width: 43, height: 17 } },
        ],
      },
      {
        img: "http://elokasha.com/uploads/small/lokasha-s-2.jpg?i=06183209052020",
        title: "Nation",
      },
      {
        img: "http://elokasha.com/uploads/small/lokasha-s-1.jpg?i=37183109052020",
        title: "Nation",
      },
      {
        img: "http://elokasha.com/uploads/small/lokasha-s-2.jpg?i=06183209052020",
        title: "Nation",
      },
      {
        img: "http://elokasha.com/uploads/small/lokasha-s-1.jpg?i=37183109052020",
        title: "Bussiness",
      },
      {
        img: "http://elokasha.com/uploads/small/lokasha-s-2.jpg?i=06183209052020",
        title: "Nation",
      },
    ],
  },
};

export default NewsPaper;
