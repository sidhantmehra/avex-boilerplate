# Avex Shopify Theme Boilerplate :star2:

## Getting started

1. Clone the repo - `git clone https://github.com/avex-designs/avex-theme`

2. Install dependencies - `$ npm install`
   You may see some wired infinite loop npm installation, this happens due to Cartjs dependency. Please just stop the process and try `npm install` again.

3. Make sure [Themekit](https://shopify.github.io/themekit) is installed - `theme help`

4. Run npm command `npm run zip` to output `avextheme.zip` and upload it to shopify store.

5. Add `config.yml` (use sample - `sample-config.yml`).

6. Run `npm run watch` to simultaneously watch, build and upload changes to Shopify

## Top Features

1. Upload ready built CSS and JS files to shopify

2. Higher SEO score as as non-critical assets are lazyloaded

3. SCSS/JS files are divided into modular parts based on the page's template and are lazyloaded when template is active

4. Critical JS/CSS are inlined to get higher SEO scores

5. Fully customizable and extendable

6. Swiper Slider [Docs](https://swiperjs.com/swiper-api). Please use `window.Swiper` object. 

6. Responsive Image and Responsive BG `/snippets/responsive-bg-image.liquid`, `/snippets/responsive-image.liquid`, :
   ``
   BG: `<div class="lazyload" data-bgset="{% include 'responsive-bg-image', image: article.image %}"></div>`
   IMG: `{% include 'responsive-image' with image: featured_image, image_class: "css-class", wrapper_class: "wrapper-css-class", max_width: 700, max_height: 800 %}`
   ``

7. Global SCSS Resource Loader. `src/scss/resources.scss` 
    1. REM mixin `rem(32px)` 
    2. Media queries mixin ` @include media(tablet){ h1{ color: red } }`
    3. Feel free to add more mixins for global usage.

8. All scripts loading from Node modules.
    Install needed npm package and import it to `common.js`. Please assign your libraries to `window` object for global usage (please look to `common.js` for sample).

9. ❌ THIS VERSION DOESN'T HAVE SUPPORT OF JQUERY!❌    Vanilla JS only!✅

## Todos

Any suggessions?
Feel free to PR.

## DEV STORE

https://nicole-avex-test-store.myshopify.com/admin/themes?channel=true

Theme Name: **Avextheme**
