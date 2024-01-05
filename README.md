# mdBook-pagetoc

A page table of contents for mdBook

## What is this?

On 23rd June, I opened an issue for [mdBook](https://github.com/rust-lang/mdBook) to add a table of contents for individual pages [here](https://github.com/rust-lang/mdBook/issues/1263). After some time, I noticed that there had been no response to the issue and decided to do something about it.

I don't know Rust and have very little experience in web development, but could not stand to not have this features any longer.

A sample of it in action can be viewed [here](https://www.jorel.dev/mdBook-pagetoc/).

![](./sample.png)

-----

## How do I use it?

1. Copy these files to the `theme` directory in your mdBook.

    - `theme/pagetoc.js`, which handles the scrolling and clicking for the table of contents

    - `theme/pagetoc.css` which handles the styling

    - `theme/index.hbs`, which updates `<main>`

      ```html
      <main>
          <div class="content-wrap">
              {{{ content }}}
          </div>
          <div class="sidetoc">
              <nav class="pagetoc"></nav>
          </div>
      </main>
      ```

1. Add the following to your `book.toml` file:

  ```toml
  [output.html]
  additional-css = ["theme/pagetoc.css"]
  additional-js = ["theme/pagetoc.js"]
  ```

1. If you're still stuck, don't worry - this entire repository is an example of it working in action!

## Acknowledgements

- This answer on [Stack Overflow](https://stackoverflow.com/a/54994316/4779071) which has code for handling automatic highlighting for sidebar elements
- [You might not need jquery](http://youmightnotneedjquery.com/), which I used to de-jQuery the code from that Stack Overflow answer
