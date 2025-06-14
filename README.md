# Apostrophe Assembly Hospitality Boilerplate

<!-- TOC is auto generated via VSCode extensions https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one.
Having it installed in your VSCode will ensure that adding/changing heading will be auto-populated here. -->
- [Apostrophe Assembly Hospitality Boilerplate](#apostrophe-assembly-hospitality-boilerplate)
  - [Purpose](#purpose)
  - [First Steps: required before startup](#first-steps-required-before-startup)
    - [Setting your shortname prefix](#setting-your-shortname-prefix)
    - [Configuring your domains](#configuring-your-domains)
    - [Adding a suffix to your subdomains (optional)](#adding-a-suffix-to-your-subdomains-optional)
    - [Changing the locale separator of your subdomains (optional)](#changing-the-locale-separator-of-your-subdomains-optional)
    - [Setting your Dashboard shortname (optional)](#setting-your-dashboard-shortname-optional)
    - [Disabled File Key](#disabled-file-key)
    - [Session Secret](#session-secret)
  - [Requirements For Development On Your Computer](#requirements-for-development-on-your-computer)
    - [Operating System: Mac, Linux, or Virtual Linux](#operating-system-mac-linux-or-virtual-linux)
    - [Software Installation Requirements](#software-installation-requirements)
    - [`/etc/hosts` File Configuration Requirements](#etchosts-file-configuration-requirements)
  - [Starting Up In Development](#starting-up-in-development)
  - [Scheduling tasks with Apostrophe Assembly Hospitality hosting](#scheduling-tasks-with-apostrophe-assembly-hospitality-hosting)
  - [Site Development](#site-development)
    - [Where Does My Apostrophe Project Code Go?](#where-does-my-apostrophe-project-code-go)
    - [Themes](#themes)
      - [Adding a New Theme](#adding-a-new-theme)
      - [Custom Module Configuration for Themes](#custom-module-configuration-for-themes)
      - [Modern Frontend Assets Without A Custom Build Process](#modern-frontend-assets-without-a-custom-build-process)
      - [Frontend Assets With Your Own Build Process](#frontend-assets-with-your-own-build-process)
      - [Developing For IE11](#developing-for-ie11)
      - [Serving Static Files: Fonts and Static Images](#serving-static-files-fonts-and-static-images)
    - [Hospitality Specificities](#hospitality-specificities)
      - [Theming](#theming)
      - [Maps and Geocoding](#maps-and-geocoding)
      - [Apostrophecms module extensions](#apostrophecms-module-extensions)
      - [Themes imported NPM Packages](#themes-imported-npm-packages)
    - [Palette Configuration](#palette-configuration)
  - [Dashboard Development](#dashboard-development)
    - [Allowing dashboard admins to pass configuration to sites](#allowing-dashboard-admins-to-pass-configuration-to-sites)
  - [Accessing the MongoDB utilities for a specific site](#accessing-the-mongodb-utilities-for-a-specific-site)
  - [Deployment and Hosting](#deployment-and-hosting)
    - [Hosting with Us](#hosting-with-us)
    - [Self-hosting](#self-hosting)
  - [Profiling with OpenTelemetry](#profiling-with-opentelemetry)
  - [Apostrophe starter kits](#apostrophe-starter-kits)

## Purpose

This repo is a combination of those two repos:
- `starter-kit-hospitality`
- `starter-kit-assembly-essentials` 

What this means is that this repo serves as a quick start boilerplate for multisite-enabled, cloud-hosted projects based on and hosted via Apostrophe Assembly while also providing hospitality and restaurant-themed widgets and features from the get-go (menus, maps, galleries, pricing, team members etc...). Technically speaking, it serves as a working example of a project built on the `@apostrophecms-pro/multisite` module while retaining the hospitality starter kit's features.

This boilerplate project includes:

* An example of project-level code for your customer-facing sites.
* An example of project-level code for the dashboard site that manages the rest.
* An example of project-level frontend asset generation via a modern webpack build.
* Best practices for easy hostname configuration in dev, staging and prod environments.
* Support for multiple themes.
* 

## First Steps: required before startup

### Setting your shortname prefix

Before you do anything else, set the fallback value for the `shortnamePrefix` option in `app.js` to a unique string for your project, replacing `a3ab-`. This should match your repo name followed by a `-` character. This should be distinct from any other Assembly projects you have, to ensure their MongoDB databases do not conflict in a dev environment.

> MongoDB Atlas note: if you are self-hosting and you plan to use a low-end MongoDB Atlas cluster (below M10), you must use a unique prefix less than 12 characters (before the `-`), even if your repo name is longer. This is not an issue with hosting provided by the Apostrophe Assembly Hospitality team.

### Configuring your domains

After cloning this project, be sure to edit the `domains.js` file in the root of the project and change the list to match your real project's dev, staging and production domains.

If you are doing local development on your own computer, leave the `dev` domain set to `localhost:3000`. For staging and production, the Apostrophe Assembly Hospitality team will typically preconfigure this for you and you won't need to worry about DNS or certificates.

If you are rolling your own hosting, the recommended approach is to create a DNS "wildcard" `A` record for a subdomain of your actual domain name, like `*.staging.example.com`, and configure `staging.example.com` as the `staging` value in `domains.js`. You'll also need a wildcard SSL certificate for each of staging and production.

You will later be able to set a "shortname" for each site and it will automatically work as a subdomain of all three domains. This saves a lot of configuration effort.

> In the case of production, you will of course also be able to add a final production domain name for *each* site via the user interface. But you will need a "pre-production" hostname for early content creation. That is where `baseUrlDomains` comes into play even for production.
>
> You are not restricted to the environment names `dev`, `staging` and `prod`. However, the first environment configured is assumed to be a local debugging environment for programmers (typically `dev`), and the environment named `prod` is the only one that attempts to serve a site under its `prodHostname`. If you are working with the Apostrophe Assembly Hospitality team for hosting, ask us for an additional cloud instance for each environment.

### Adding a suffix to your subdomains (optional)

The `shortNameSuffix` configuration option, which defaults to an empty string, allows you to add additional suffix string to every site short name. For example, for a site with short name `gourmet` and the following configuration:
```js
multisite({
  // ...
  shortNameSuffix: '-assembly',
});
```
The resulting base URL for this site will be `http://gourmet-assembly.localhost:3000`, `https://gourmet-assembly.staging.your-domain.com`, etc.

These options apply only when the hostname is determined in part by the `shortName` field for the site, so if a production hostname is configured, it will be used exactly as given.

> Note that your dashboard will also be affected, the base URL would become `https://dashboard-assembly.staging.your-domain.com`

> **Note:** This option is not currently supported by Apostrophe Assembly Hospitality Hosting, as we apply the naming convention for you when hosting for you. It's there for self-hosted customers with different needs.

### Changing the locale separator of your subdomains (optional)

The `localeSeparator` configuration option, which defaults to `.`, allows you to change how the subdomains for localized sites (if chosen so) will be built. By default a dot separator will be used. For example, if "Separate Host" is enabled for a particular locale, `fr.gourmet.your-domain.com` will be the URL of a site with the short name `gourmet` and the `fr` locale. 
If you apply the following configuration:
```js
multisite({
  // ...
  localeSeparator: '-',
});
```
The hostname above will become `fr-gourmet.your-domain.com`. 

This option applies only when the hostname is determined in part by the `shortName` field for the site, so if a production hostname is configured for the locale it will be used exactly as given.

> **Note:** Your configuration won't be applied immediately on the existing sites. You need to update ("touch") your site records in order to apply the changes. You can do that for all existing sites via the CLI command `node app site:touch --site=dashboard`. If you do not have the `touch` task, update the apostrophe module to the latest 3.x version.

> **Note:** This option is not currently supported by Apostrophe Assembly Hospitality Hosting, as we apply the naming convention for you when hosting for you. It's there for self-hosted customers with different needs. 

### Setting your Dashboard shortname (optional)

By default, your dashboard will be available on a `dashboard` subdomain - `http://dashboard.localhost:3000`, `https://dashboard.staging.your-domain.com`, etc. You can change that with the configuration option `dashboardShortName` in your `app.js`. For example:
```js
multisite({
  // ...
  dashboardShortName: 'admin',
});
```
With the setting above, the Dashboard application will be available at `http://admin.localhost:3000`, `https://admin.staging.your-domain.com`, etc. 

Note that if `shortNameSuffix` is also set, the two options are combined to arrive at the complete dashboard subdomain.

> **Note:** This option is not currently supported by Apostrophe Assembly Hospitality Hosting. Contact us if this is a concern for your project.

### Disabled File Key

In `sites/index.js`, locate `disabledFileKey` and change `CHANGEME` to a random string of your choosing. This is used when disabling access to files in the local backend.

### Session Secret

In `sites/index.js`, locate `secret` and change `CHANGEME` to a random string of your choosing. This is used for login session encryption.

## Requirements For Development On Your Computer

### Operating System: Mac, Linux, or Virtual Linux

**Your local development environment must be either MacOS or Linux.** If your development computer runs Windows, we recommend development on Ubuntu Linux in a full virtual Linux machine. This can be through [WSL2 (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) or via [VirtualBox](https://www.virtualbox.org/).

### Software Installation Requirements

To test-drive the project in development, make sure you have Apostrophe's usual dependencies on your local machine:

* MongoDB (6.0 or better, we recommend 8.0)
* NodeJS (18.x or better, latest long term support release recommended)

For more information see the Apostrophe [Development Setup](https://docs.apostrophecms.org/guide/development-setup.html) and [Windows Development](https://docs.apostrophecms.org/cookbook/windows-development.html) documentation.

### `/etc/hosts` File Configuration Requirements

Because this project serves multiple websites, certain hostnames must point directly to your own computer for local testing.

**If you will only be testing in Chrome at first,** you do not have to edit your hosts file right away. That's because in Chrome, all subdomains of `localhost` resolve to your own computer.

However in other browsers this is not true and you must add the following lines to `/etc/hosts` before proceeding:

```
127.0.0.1 dashboard.localhost company1.localhost
```

**You will need a subdomain for each test site you plan to add to the multisite platform.** See the example below, where a site called `company` is added to the platform via the dashboard. You can always add more of these entries later.

## Starting Up In Development

First, clone the boilerplate project and push it up to your own git repository for ongoing work.

Then type:

```
npm install
```

After installation, add an admin user to the dashboard site, which manages all other sites:

```
node app @apostrophecms/user:add admin admin --site=dashboard
```

Enter a password when prompted.

> When running command line tasks in a multisite environment you must always specify which site you are referring to. For the dashboard, use `--site=dashboard`. For other sites, you can use any of their valid hostnames, or `--all-sites` which runs the task on every site except the dashboard.

Next launch the multisite application:

```
npm run dev
```

When ready, visit:

```
http://dashboard.localhost:3000/login
```

> If you are on a Mac this will work without extra configuration. If you are on Linux you may need to edit `/etc/hosts` and add an entry for `dashboard.localhost`, pointing to 127.0.0.1 just like plain `localhost` does. You'll do this for each site you test locally.

You can now log into the admin account and view the basic dashboard.

To create a site, access "Sites" on the admin bar and add a new site. Notice that sites are Apostrophe "pieces" in the dashboard.

Be sure to give your first site a "shortname" which is distinct from other sites, like `company1`. Also fill out the admin password field for the site.

After you successfully save the site, you can access:

```
http://company1.localhost:3000/login
```

And log in with the admin account you created for the site. Then make some simple edits to the homepage.

Now try creating `company2` and `company3`. Notice that while the code is the same, the databases and content are separate.

> If you access these sites while logged out, you won't see your content edits unless you have used the "Commit" button to make them live.

## Scheduling tasks with Apostrophe Assembly Hospitality hosting

To schedule tasks much like you would with `cron` in a single-server environment, add a new `tasks` option to `app.js` when configuring `@apostrophecms/multisite`. This option is top-level, it's a peer of the `sites` and `dashboard` options.

```javascript
tasks: {
  // These tasks are run for all sites, i.e. like the `--all-sites` option
  'all-sites': {
    hourly: [
      // Run this task hourly but only on the server that
      // happens to grab the lock first
      'products:sync'
    ],
    daily: [ ... also supported, same syntax ]
  },
  // These tasks are run for the dashboard site, i.e. like `--site=dashboard`
  dashboard: {
    hourly: [
      'some-module-name:some-task-name'
    ],
    daily: [ ... also supported, same syntax ]
  }
}
```

Note that the individual tasks are configured as strings. These strings start with the Apostrophe task name, like `product:sync`, and can optionally also include additional parameters to the task exactly as they would if you invoked it directly at the command line. You should **not** include `node app` in these strings.

Then, to test your hourly tasks in a local environment:

```javascript
node app tasks --frequency=daily
```

> ⚠️ VERY IMPORTANT NOTE: this will intentionally **not** run the job more than once in an hour, even if you try to test it twice in an hour. That's normal. This is a guard so that tasks scheduled on more than one of our workers actually run just once as intended.

If you need to skip that check for testing purposes, you can clear the `aposTaskLog` mongodb collection in your dashboard database. If your `shortName` is `companyname`, then your dashboard database name is `companyname-dashboard`.

## Site Development

Right now we have a bare-bones example. Let's look at where to put our code to customize the experience.

### Where Does My Apostrophe Project Code Go?

> If you are not already familiar with single-site Apostrophe development, we strongly recommend that you [read the A3 ApostropheCMS documentation](https://a3.docs.apostrophecms.org/) as a starting point.

In a typical single-site Apostrophe project, modules are configured in `app.js`. In a multisite project, you'll find that `app.js` is instead reserved for top-level configuration that applies to all sites.

The code you're used to seeing in `app.js` can instead be found in `sites/index.js`. And, the code you're used to seeing in `modules` can be found in `sites/modules`.

In all other respects, development is just like normal ApostropheCMS single-site development. Feel free to add page templates and modules. You can `npm install` modules like `@apostrophecms/blog` and configure them in a normal way; just do it in `sites/index.js` rather than `app.js`.

If you have already started a single-site project, you can move your modules directly from `modules` to `sites/modules`, and move the `modules` section of your `app.js` file to the corresponding section of `sites/index.js`. However take note of the existing settings we provide and merge accordingly.

> **If you are hosting your project with us, or using tools provided by us, you should remove any legacy app.js or module code that configures UploadFS cloud storage or mongodb database hosts.** Such settings are handled automatically and the configuration is set behind the scenes by `@apostrophecms-pro/multisite` and the provided logic in the boilerplate project.

### Themes

Apostrophe Assembly Hospitality and the multisite module are designed to accommodate hundreds of websites, or more, running on a single codebase. But, you may need some differences in appearance and behavior that go beyond what the palette editor can provide. For that you can create multiple themes. Each site is set via the dashboard UI to use a single theme and will typically stay with that theme throughout its lifetime.

You might not need more than one theme. If that's the case, just build out the `default` theme to suit your needs, and remove the `demo` theme from `themes.js`. You can also remove the `sites/modules/theme-demo` module and `sites/lib/theme-demo.js`.

#### Adding a New Theme

To configure your list of themes, edit `themes.js`. Right now it looks like:

```javascript
export default  [
  {
    value: 'default',
    label: 'Default'
  },
  {
    value: 'demo',
    label: 'Demo'
  }
];
```

You can add additional themes as needed. Your `value` should be a shortname like `default` or `arts`. The `value` must not be changed later.

#### Custom Module Configuration for Themes

If your theme is named `default`, then you must have a `sites/lib/theme-default.js` file, like this:

```javascript
export default  function(site, config) {
  config.modules = {
    ...config.modules,
    'theme-default': {}
  };
};
```

The `config` object already contains what was configured in `sites/index.js`. Here we can modify the configuration by adding extra modules only for this theme, or changing the configuration of a module specifically for this theme.

In this case we add one custom module, `theme-default`,  when the default theme is active. **It is a best practice to push your theme's frontend assets to Apostrophe in a module like this,** named after the theme. If your themes share any assets, then they should be imported into the appropriate `.js` or `.scss` master file by each theme.

#### Modern Frontend Assets Without A Custom Build Process

Beginning with the 1.1.0 release of `a3-assembly-boilerplate`, there is no need for Webpack for simpler cases. Specifically, you can follow our documentation and place your modern JavaScript code in the `ui/src/index.js` file of any module, or use `import` statements in that file to import it there. As noted in our documentation, it is **important for `ui/src/index.js` to export a function as its default export.** This function will be invoked to initialize your module at a safe time when `apos.http`, `apos.util`, etc. are already available.

You may also place Sass SCSS code in the `ui/src/index.scss` file of any module, and use `import` statements in that file to bring in more Sass SCSS code.

To include theme-specific code, place it in the `ui/src/index.scss` or `ui/src/index.js` file of the appropriate theme module. The provided example theme modules are `theme-default` and `theme-alternate`.

For example:
- The default theme's SASS stylesheet entrypoint is located at `sites/modules/theme-default/ui/src/index.scss`
- The default theme's JavaScript browser-side entry point is located at: `sites/modules/theme-default/ui/src/index.js`

#### Frontend Assets With Your Own Build Process

Beginning with the 1.1.0 release of `a3-assembly-boilerplate`, a sample webpack build is not included as standard equipment, as `ui/src` suffices for most needs. However, if you need to use webpack or another custom build process, the solution is to configure the output of your build process to be a `ui/public/something.js` file in any module in your Apostrophe project. As above you can create a build that is included in only one theme by writing its output to the `ui/src` subdirectory of that theme module.

#### Developing For IE11

With Microsoft ending Internet Explorer 11 support in 2022, we no longer enable IE11 support by default. However you can enable IE11 support by setting the `es5: true` option to the `@apostrophecms/asset` module. This will create a compatibility build of your `ui/src` JavaScript. Please note that editing is never supported in IE11. See the Apostrophe documentation for more information.

#### Serving Static Files: Fonts and Static Images

If you need to serve static files, you can do this much as you would in standalone A3 development.

The folder `sites/public` maps to `/` in the URL space of a site. For instance, `sites/public/fonts/myfile.ttf` maps to `/fonts/myfile.ttf`. For assets like favicons and fonts, you can add `link` tags to the `extraHead` block already present in `sites/modules/@apostrophecms/template/views/outerLayout.html`.

### Hospitality Specificities

As this starter-kit not only includes the entire Assembly features but also the Hospitality Stater Kit, you'll find the following features included in the get-go.

#### Theming

Colors, fonts, and other aesthetic variables are set in `sites/modules/asset/ui/src/scss/_theme.scss`. These can be overridden by making changes directly in the `_theme.scss` file.

The hospitality starter kit uses fonts provided by Google. These are imported into the primary layout file in `views/layout.html:19`

#### Maps and Geocoding
This project comes with a map widget that geocodes addresses to points on the map. Geocoding is provided by [`node-geocoder`](https://www.npmjs.com/package/node-geocoder). You must configure a geocoding service provider and API key in order to use it. [See a list of geocoding service providers](https://github.com/nchaulet/node-geocoder#geocoder-providers-in-alphabetical-order).

To configure your project's geocoding service provider see `sites/modules/content-widget-modules/modules.js`

```js
  'map-widget': {
    options: {
      geocoderSettings: {
        // For a full list of the node-geocoder npm package options please view the modules documentation - https://www.npmjs.com/package/node-geocoder
        // Requred
        provider: 'mapbox',

        // Optional depending on the providers
        apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
        formatter: null, // 'gpx', 'string', ...
        minConfidence: 0.5,
        limit: 1
      }
    }
  },

```

More configuration details for `node-geocoder` [noted here](#node-geocoder-config).

#### Apostrophecms module extensions
The below Apostrophecms extensions have been included within this starter kit's main apostrophecms `sites/index.js` file.

- [ ] **@apostrophecms/form.** Allows editors to create their own forms for gathering and delivering user input.
(View extension - https://apostrophecms.com/extensions/form-builder-2) 
- [ ] **@apostrophecms/open-graph.** Provides a way to edit metadata for Facebook's Open Graph standard.
(View extension - https://apostrophecms.com/extensions/open-graph-tools-3) 
- [ ] **@apostrophecms/seo.** SEO configuration for ApostropheCMS 3.x. Adds useful meta fields to all pages and pieces.
(View extension - https://github.com/apostrophecms/apostrophe-seo)
- [ ] **@apostrophecms/sitemap.** Generates XML and plaintext sitemaps for sites in Apostrophe 3.x.
(View extension - https://apostrophecms.com/extensions/site-maps)

#### Themes imported NPM Packages

- [ ] **rfs (Responsive Font Sizing).** The "rfs" package is a node.js module that provides a simple way to create responsive and fluid typography in CSS. It allows you to define font sizes using a unitless value (usually "rem") and automatically adjust them based on the viewport or container width. 

    Mainly used within `sites/modules/asset/ui/src/_typography.scss` file for consistent rem based font sizing. Usage applied to headings and paragraphs.
    
    E.g ``` @include font-size($h1-font-size)```
    where $h1-font-size is a rem value determined by a base value.
    
    in this theme a default of 16px: ```$h1-font-size: $font-size-base * 3; // 48px```
- [ ] **swiper (Slideshows).** The "swiper" package is a JavaScript library for creating responsive and touch-enabled sliders, carousels, and other interactive content on the web. Its usage within this theme is located at `sites/modules/content-widget-modules/image-gallery-widget`

    You can import it in your JavaScript file using the import statement:
    ```js
    import Swiper from 'swiper/bundle';
    ```
    Then, you can create a new instance of the "swiper" class and pass in a configuration object with your desired options. For example:
    ```js
    const mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And more...
    });
    ```
- [ ] **photoswipe (Lightbox)** "PhotoSwipe Lightbox" is a plugin for the popular JavaScript library "PhotoSwipe" that simplifies the process of creating responsive image galleries with lightbox functionality. It offers an easy-to-use API for adding lightboxes to your images and is highly customizable and flexible.

    Its usage within this theme is located at `sites/modules/content-widget-modules/image-gallery-widget`, and is applied in conjunction with the swiper npm package.
    
    You can import it in your JavaScript file using the import statement:
    
    ```js
    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import PhotoSwipe from 'photoswipe';
    ```
    Then, you can create a new instance of the "Photoswiper lightbox" class and pass in a configuration object with your desired options. For example:
    ```js
    // Photoswiper lightbox and gallery
    const photoSwipeOptions = {
        gallery: '#imageGallery',
        pswpModule: PhotoSwipe,
        // set background opacity
        bgOpacity: 1,
        showHideOpacity: true,
        children: 'a',
        loop: true,
        showHideAnimationType: 'fade', /* options: fade, zoom, none */
        
        /* Click on image moves to the next slide */
        imageClickAction: 'next',
        tapAction: 'next',
        
        /* ## Hiding a specific UI element ## */
        zoom: false,
        close: true,
        counter: true,
        arrowKeys: true
    };
    
    const lightbox = new PhotoSwipeLightbox(photoSwipeOptions);
    
    lightbox.init();
    ```
- [ ] [**Node-geocoder**](#node-geocoder-config) is an npm package that simplifies geocoding and reverse-geocoding in Node.js. It supports various geocoding services, allowing developers to convert addresses to coordinates and vice versa with ease.

    See a basic example of this package below:
    ```js
    import NodeGeocoder from 'node-geocoder';
    ```
    Then, you can create a new instance of the "Map" class and add one or more layers to it. For example:
    ```js
    const options = {
      // For a full list of the node-geocoder npm package options please view the modules documentation - https://www.npmjs.com/package/node-geocoder
      // Requred
      provider: 'mapbox',
    
      // Optional depending on the providers
      apiKey: 'include provider apikey', // for Mapquest, OpenCage, Google Premier
      formatter: null, // 'gpx', 'string', ...
      minConfidence: 0.5,
      limit: 1
    };
    const geocoder = NodeGeocoder(options);
    const geocoderAddress = await geocoder.geocode(data.widget.address);
    ```
- [ ] **ol (Maps)** The "ol" package is a JavaScript library for creating interactive maps on the web. Its usage within this theme is located at `sites/modules/content-widget-modules/map-widget`

    See a basic example of this package below:
    ```js
    import { Map, View } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    ```
    Then, you can create a new instance of the "Map" class and add one or more layers to it. For example:
    ```js
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    ```
- [ ] **AOS (Animations)** Animate On Scroll (AOS) library allows you to animate elements as you scroll down and up. If you scroll back to top, elements will animate to their previous state and are ready to animate again if you scroll down.

    You can import it in your JavaScript file (`sites/modules/asset/ui/src/index.js`) using the import statement:
    
    ```js
    import AOS from 'aos';
    ```
    Then, initialize AOS. For example:
    
    ```js
    AOS.init();
    ```
    
    For usage within this theme, Create an instance of 'aosSchema' in your widget and add it as a field. For example:
    
    ```js
    import aosSchema from '../../../lib/aosSchema.js';
    
    add: {
      ...aosSchema
    }
    ```

### Palette Configuration

The palette allows styles to be edited visually on the site. It is configured in `sites/modules/@apostrophecms-pro/palette/index.js`. There you can specify the selectors, CSS properties, and field types to be used to manipulate color, font size, font family and other aspects of the site as a whole.

For complete information and a sample configuration, see the [@apostrophecms-pro/palette module documentation](https://npmjs.org/package/@apostrophecms-pro/palette). *You will need to be logged into an npm account that has been granted access, such as the one you used to npm install this project.*

> Note that like all other changes, palette changes do not take place for logged-out users until the user clicks "Publish."

## Dashboard Development

**The dashboard site has one job: managing the other sites.** As such you don't need to worry about making this site a pretty experience for the general public, because they won't have access to it. However you may want to dress up this experience and add extra functionality for your own customer admin team (the people who add and remove sites frmo the platform).

The dashboard site can be extended much like the regular sites. Dashboard development is very similar to regular site development, except that modules live in `dashboard/modules`, what normally resides in `app.js` lives in `dashboard/index.js`, and so on.

The most important module is the `site` module. The `site` module is a piece type, with a piece to represent each site that your dashboard admins choose to create.

Also important is the `asset` module, which serves the same function as the theme modules in `site`. You can find the frontend assets in `dashboard/modules/asset/ui/src`.

### Allowing dashboard admins to pass configuration to sites

You can add custom schema fields to `sites` as seen in `dashboard/modules/site/index.js`. Those fields are available on the `site` object passed to `sites/index.js`, and so they can be passed on as part of the configuration of modules.

However, there is one important restriction: you **must not decide to completely enable or disable a module that pushes assets on any basis other than the theme name.** This is because Apostrophe builds only one asset bundle per theme.

**"Should I add a field to the `site` piece in the dashboard, or just add it to `@apostrophecms/global` for sites?"** Good question! Here's a checklist for you:

* **If single-site admins who cannot edit the dashboard should be able to edit it,** you should put it in `sites/modules/@apostrophecms/global`.
* **If only dashboard admins who create and remove sites should be able to make this decision,** it belongs in `dashboard/modules/site/index.js`. You can then pass it on as module configuration in `sites/lib/index.js`.

## Accessing the MongoDB utilities for a specific site

The database name for a site is the prefix, followed by the `_id` of the site piece. However this is awkward to look up on your own, so we have provided utility tasks to access the MongoDB utilities:

```
# Mongo shell for the dashboard site
node app mongo:mongo --site=dashboard
# Mongo shell for an individual site; use its hostname
# in the appropriate environment
node app mongo:mongo --site=test1.localhost
# mongodump
node app mongo:mongodump --site=test1.localhost
# mongorestore, with the --drop option to prevent
# doubled content
node app mongo:mongorestore --site=test1.localhost -- --drop
```

Note the use of `--` by itself as an end marker for the options to Apostrophe, allowing the `--drop` option to be passed on to `mongodump`.

## Deployment and Hosting

### Hosting with Us

If we are hosting Apostrophe Assembly Hospitality for you, then you can deploy updates to your staging cloud by pushing to your `staging` git branch, and deploy updates to your production cloud by pushing to your `production` git branch. You will receive notifications in our shared Slack channel, including links to access the deployment progress logs.

Apostrophe will complete asset builds for each theme, as well as running any necessary new database migrations for each site, before switching to the newly deployed version of the code.

### Self-hosting

See [self-hosting](self-hosting.md) for more information about self-hosting with
the provided `Dockerfile`. There are a number of important details to consider, so be sure to
read the [self-hosting notes](self-hosting.md) before beginning deployment.

## Profiling with OpenTelemetry

ApostropheCMS supports profiling with OpenTelemetry. There is an [article in the documentation](https://v3.docs.apostrophecms.org/cookbook/opentelemetry.html) covering the use of OpenTelemetry in general. Launching Apostrophe Assembly Hospitality with OpenTelemetry support is slightly different. However for your convenience, `app.js` and `telemetry.js` are already set up appropriately in this project.

To launch in your local development environment with OpenTelemetry logging to Jaeger, first [launch Jaeger according to the instructions in our documentation](https://v3.docs.apostrophecms.org/cookbook/opentelemetry.html). Then start your Apostrophe Assembly Hospitality project like this:

```
APOS_OPENTELEMETRY=1 npm run dev
```

This provides a great deal of visibility into where the time is going when Apostrophe responds to a request. Note that separate hosts can be distinguished via the `http.host` tag attached to each request in Jaeger.

Using OpenTelemetry in a staging environment provided by the Apostrophe team is possible. This involves modifying the provided `telemetry.js` file to log to a hosted backend such as [New Relic](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/opentelemetry-introduction/) using an appropriate Open Telemetry exporter module. `process.env.ENV` can be used to distinguish between `dev` or no setting (usually local development), `staging` and `prod` when decidig whether to enable an OpenTelemetry backend.

We do not recommend enabling OpenTelemetry in production, at least not permanently, because of the performance impact of the techniques OpenTelemetry uses to obtain the necessary visibility into async calls.

## Apostrophe starter kits

Interested in publishing an Apostrophe Starter Kit and becoming a featured Apostrophe Partner? [Submit a Starter Kit](https://apostrophecms.com/starter-kits).
