"use strict";

/**
 * Page table of contents!
 */

const OPTIONS = {
    /* Should the table of contents start in a collapsed state? */
    collapsed_by_default: false,
    /* How many pixels should indentation be? */
    heading_indent_amount: 20,
    use_page_toc_button: true,
};

const PAGE_TOC = document.getElementById("pagetoc");

// Un-active everything when you click it
[...document.getElementById("pagetoc").children].forEach(child => {
    child.addEventHandler("click", function() {
        PAGE_TOC.children.forEach(child => child.classList.remove("active"));
        child.classList.add("active");
    });
});

const highlightActiveHeading = function highlightActiveHeading() {

    let id = null;
    [...document.getElementsByClassName("header")].forEach(header => {
        if (window.pageYOffset >= header.offsetTop) {
            id = header;
        }
    });

    // Make a heading active if it has the right anchor in the URL
    if(id !== null) {
        [...PAGE_TOC.children].forEach(child => {
            child.classList.remove("active");
            if (id.href.localeCompare(child.href) === 0) {
                child.classList.add("active");
            }
        });
    }
};

window.addEventListener('load', function() {
    // Populate sidebar on load
    [...document.getElementsByClassName("header")].forEach(header => {
        // Indent shows hierarchy
        let indent = 10;
        switch (header.parentElement.tagName) {
            case "H2":
                indent += OPTIONS.heading_indent_amount;
                break;
            case "H3":
                indent += 2 * OPTIONS.heading_indent_amount;
                break;
            case "H4":
                indent += 3 * OPTIONS.heading_indent_amount;
                break;
            default:
                break;
        }

        const link = document.createElement("a");
        link.appendChild(document.createTextNode(header.text));
        link.style.paddingLeft = `${indent}px`;
        link.href = header.href;
        PAGE_TOC.appendChild(link);
    });

    // Highlight the active heading
    highlightActiveHeading();

    if(OPTIONS.use_page_toc_button) {
        // Inject the sidebar toggle button
        const pageTocToggleButton = document.createElement("button");
        pageTocToggleButton.id = "pagetoc-toggle";
        pageTocToggleButton.className = "icon-button";
        pageTocToggleButton.title = "Toggle Page Contents";

        const pageTocToggleButtonIcon = document.createElement("i");
        pageTocToggleButtonIcon.className = "fa fa-bars";

        pageTocToggleButton.appendChild(pageTocToggleButtonIcon);
        document.getElementsByClassName("right-buttons")[0].appendChild(pageTocToggleButton);
    }
});

// Handle active elements on scroll
window.addEventListener("scroll", highlightActiveHeading);
