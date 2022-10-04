"use strict";

// Don't shove everything into global scope
(function pagetoc() {

    const OPTIONS = {
        /* Should the table of contents start in a collapsed state? */
        collapsed_by_default: false,

        /* How many pixels should indentation be? */
        heading_indent_amount: 20,

        page_toc_button: {
            /* If true, adds a page table of contents button in the top right */
            use_page_toc_button: true,

            /* The font-awesome class(es) for the page toc button */
            page_toc_button_icon: "fa fa-bars"
        },

        // In pixels
        pagetoc_left_padding: 20
    };

    // Inject everything into the DOM so we don't have to update index.hbs
    {
        // Mobile page table of contents goes at the end of the menu bar
        const pagetoc_mobile = document.createElement("div");
        pagetoc_mobile.id = "pagetoc-mobile";
        pagetoc_mobile.classList.add("pagetoc");
        document.getElementById("menu-bar").appendChild(pagetoc_mobile);

        // Main table of contents goes at the top of contents
        const pagetoc_desktop = document.createElement("div");
        pagetoc_desktop.id = "pagetoc-desktop";
        pagetoc_desktop.classList.add("pagetoc");
        document.querySelector("main").prepend(pagetoc_desktop);
    }

    const HTML = document.querySelector("html");
    const PAGE_TOCS = document.getElementsByClassName("pagetoc");

    // Displaying page table of contents

    function showPageTableOfContents() {
        HTML.classList.remove('pagetoc-hidden');
        HTML.classList.add('pagetoc-visible');
        // try { localStorage.setItem('mdbook-pagetoc', 'visible'); } catch (e) { }
    }

    function hidePageTableOfContents() {
        HTML.classList.add('pagetoc-hidden');
        HTML.classList.remove('pagetoc-visible');
        // try { localStorage.setItem('mdbook-pagetoc', 'hidden'); } catch (e) { }
    }

    function togglePageToc() {
        if (html.classList.contains("pagetoc-hidden")) {
            var current_width = parseInt(
                document.documentElement.style.getPropertyValue('--sidebar-width'), 10);
            if (current_width < 150) {
                document.documentElement.style.setProperty('--sidebar-width', '150px');
            }
            showPageTableOfContents();
        } else if (html.classList.contains("pagetoc-visible")) {
            hidePageTableOfContents();
        } else {
            if (getComputedStyle(PAGE_TOCS[0])['transform'] === 'none') {
                hidePageTableOfContents();
            } else {
                showPageTableOfContents();
            }
        }
    }

    // Highlighting and clicking page table of contents

    function clickPageTocEntry(event) {
        [...PAGE_TOCS].forEach(pagetoc =>
            [...pagetoc.children].forEach(child =>
                child.classList.remove("active")
            )
        );
        event.currentTarget.classList.add("active");
        hidePageTableOfContents();
    }

    function highlightActiveHeading() {
        let id = null;
        [...document.getElementsByClassName("header")].forEach(header => {
            if (window.pageYOffset >= header.offsetTop) {
                id = header;
            }
        });

        // Make a heading active if it has the right anchor in the URL
        if(id !== null) {
            [...PAGE_TOCS].forEach(pagetoc => 
                [...pagetoc.children].forEach(child => {
                    child.classList.remove("active");
                    if (id.href.localeCompare(child.href) === 0) {
                        child.classList.add("active");
                    }
                })
            );
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
            link.addEventListener("click", clickPageTocEntry);

            [...PAGE_TOCS].forEach(pagetoc =>
                pagetoc.appendChild(link)
            );
        });

        // Highlight the active heading
        highlightActiveHeading();

        if(OPTIONS.page_toc_button.use_page_toc_button) {
            // Inject the sidebar toggle button
            const pageTocToggleButton = document.createElement("button");
            pageTocToggleButton.id = "pagetoc-toggle";
            pageTocToggleButton.className = "icon-button";
            pageTocToggleButton.title = "Toggle Page Contents";
            pageTocToggleButton.addEventListener("click", togglePageToc);

            const pageTocToggleButtonIcon = document.createElement("i");
            pageTocToggleButtonIcon.className = OPTIONS.page_toc_button.page_toc_button_icon;

            pageTocToggleButton.appendChild(pageTocToggleButtonIcon);
            document.getElementsByClassName("right-buttons")[0].appendChild(pageTocToggleButton);
        }
    });

    // Handle active elements on scroll
    window.addEventListener("scroll", highlightActiveHeading);

})();