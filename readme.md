[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)


# Avex Shopify Theme Boilerplate



## Getting started

1. Clone the repo - `git clone https://github.com/avex-designs/avex-theme`

2. Install dependencies - `npm install`

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



## Critical and Common CSS/JS

- Critical assets are __inlined__ inside the `head` tag of every page, they get loaded before any script/stylesheet

- Common assets are __lazyloaded__ in every page, they get loaded after the DOMContentLoaded event is triggered. The files in `vendor` folders are concatenated to `common.js|scss` file. The order of concatenation of vendor files is alphanumeric. This is the reason why our JQuery file starts with `0_` - to make sure it is the first script prepended to `common.js` as other vendors may depend on it.



## Dynamic styles

In `snippets/css-vars.liquid` we declare all the dynamic CSS Variables used in the project. They can be font names, sizes, colors set in the theme editor or anything else that you need to be saved. 

More about CSS Variables - [here](https://dev.to/sarah_chima/an-introduction-to-css-variables-cmj)



## Usage of responsive image and background

Image:
```
/snippets/responsive-image.liquid
   
{% include 'responsive-image' with image: featured_image, image_class: "css-class", wrapper_class: "wrapper-css-cwlass", max_width: 700, max_height: 800 %}
```

Background: 
```
/snippets/responsive-bg-image.liquid
    
<div class="lazyload" data-bgset="{% include 'responsive-bg-image', image: article.image %}"></div>
```



## Enhanced by [Cart.js](https://cartjs.org/)

Cart.js is a very small open source Javascript library that makes the addition of powerful Ajax cart functionality to your Shopify theme a breeze. Data API is enabled to make it even easier to work with Shopify's AJAX Cart API. More info in the [docs](https://cartjs.org/pages/guide).



## Todos

1. Have the possibility to control the loading order of lazyloaded scripts(for example: having a dependency list), because the browser may load the first script that is declared to be lazyloaded later than the second as the latter may be lighter. This may lead to errors if the second script depends on the first.

2. Find out how we can implicitly import scss resource files to all scss files. By this we could avoid importing `scss/utils/index` in all scss files where we need mixins. 


## Demo store

https://avexplustest.myshopify.com/admin/themes?channel=true

Theme Name: Boilerplate - Main
