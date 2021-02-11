# Avex Shopify Theme Boilerplate


## Getting started

1. Clone the repo - `git clone https://github.com/avex-designs/avex-theme`

2. Install dependencies - `$ npm install`

3. Make sure [Themekit](https://shopify.github.io/themekit) is installed - `theme help`

4. Run npm command `npm run zip` to output `avextheme.zip` and upload it to shopify store.

5. Add `config.yml` (use sample - `sample-config.yml`).

6. Run `npm run watch` to simultaneously watch, build and upload changes to Shopify




## Top Features

1. Upload ready built CSS and JS files to shopify

2. Higher SEO score as as non-critical assets are lazyloaded

3. SCSS/JS files are divided into modular parts based on the page's template and are lazyloaded when template is active

4. Critical JS/CSS are inlined to get higher SEO scores

5. Usage of CSS Variables in `/snippets/css-vars.liquid` to set variables through Shopify's Theme Editor and use them in the SCSS code

6. Fully customizable and extendable

7. Responsive Image and Responsive BG `/snippets/responsive-bg-image.liquid`, `/snippets/responsive-image.liquid`:

    BG: ```<div class="lazyload" data-bgset="{% include 'responsive-bg-image', image: article.image %}"></div>```
    
    IMG: ```{% include 'responsive-image' with image: featured_image, image_class: "css-class", wrapper_class: "wrapper-css-cwlass", max_width: 700, max_height: 800 %}```


## Todos

1. Have the possibility to control the loading order of lazyloaded scripts(for example: having a dependency list), because the browser may load the first script that is declared to be lazyloaded later than the second as the latter may be lighter. This may lead to errors if the second script depends on the first.

2. Find out how we can implicitly import scss resource files to all scss files. By this we could avoid importing `scss/utils/index` in all scss files where we need mixins. 



## DEV STORE

https://nicole-avex-test-store.myshopify.com/admin/themes?channel=true

Theme Name: __Avextheme__
