
# Chameleon Framework Documentation

## Introduction

Chameleon Framework is a JSON based web-builder framework for building simple informative websites. Instead of writing HTML files, webmasters only need to specify the content and layout for the web page in the respective JSON files. Navigations are automatically handled by the framework.

## Deployment

### Setup production environment

Setup a Docker container for hosting (Recommended):

- Run the included `setup-docker.sh` script to setup a containerized Apache HTTP Server for hosting
- When the website files are changed, run the `update-site-docker.sh` script to update the server with the newer files. Remember to update the version number in meta.json!

Setup other HTTP servers:

- Copy these files and folders under the website root folder:
- `/css`
- `/file`
- `/img`
- `/site`
- `/index.html`
- `/js/main.bundle.js`
- Remeber to setup routing rules such that URLs (except for those for static files and index.html) are routed to index.html.

### Setup testing environment

It is recommended to setup a simple HTTP server during testing to develop content for the website.

To use the [live-server](https://www.npmjs.com/package/live-server) from npm:

- Run `npm install -g live-server`
- After installation, run `live-server --entry-file=index.html`

To use other HTTP servers:

- Remeber to setup routing rules such that URLs (except for those for static files and index.html) are routed to index.html.

### Setup development environment (optional)

Run `npm install`

Set `mode: 'development'` in `webpack.config.js` (make sure to set `mode: 'production'` for production builds)

Run `npm run build` to build a new `main.bundle.js` after changes are made to any of the js files.

## Webmaster Manual

### Quick start guide

The framework comes with a pre-built sample website. Feel free to explore and experiment with it!

### Files and folders to copy to the hosting server

- `/css`
- `/file`
- `/img`
- `/site`
- `/index.html`
- `/js/main.bundle.js`

### File structure

To use Chameleon to build a website, webmasters only need to interact with the following folders.

#### `/site`
>
> File structure in this folder controls the site structure. Each JSON file (except for meta.json, detailed in the [Meta file](#meta-file) section) represents a web page.
>
> Some examples are shown bellow (Note that URL components are not encoded for demonstration purpose).
> | File| Web page |
> | ----------- | ----------- |
> |`/site/index.json`|`HOSTNAME`|
> |`/site/About.json`|`HOSTNAME/About`|
> |`/site/News & Events.json`|`HOSTNAME/News & Events`|
> |`/site/Project/Alpha.json`|`HOSTNAME/Project/Alpha`|
> |`/site/a/b/c/d.json`|`HOSTNAME/a/b/c/d`|

#### `/img`
>
> Stores images used for web pages.
>

#### `/file`
>
> Stores files that can be downloaded by visitors (e.g. .pdf, .pptx).
>

### Meta file

The meta file stores metadata for the website. The file is located at `/site/meta.json`.

JSON structure:

```json
{
    "title":"",
    "description":"",
    "version":"",
    "nav":{
        "logo":"",
        "links":[]
    },
    "footer":{
        "logo":"",
        "primaryLinks":[],
        "secondaryLinks":[],
        "socialMedia":{
            "Facebook":"",
            "LinkedIn":"",
            "Twitter":"",
            "YouTube":""
        },
        "copyright":""
    },
    "colors": {
        "primary": "",
        "secondary": "",
        "highlight":""
    },
    "font":{
        "title":"",
        "text":"",
        "action":""
    }
}
```

| Value| Type |Role|
| ----------- | --------------| ---|
|`title`|`String`|Sets the HTML document title for the site.|
|`description`|`String`|Sets the HTML document description for the site.|
|`version`|`String`|Used to denote the version of the site content. It is recommended that you update this to a new value everytime changes are made to the site (e.g. set it to the date of last update).|
|`nav.logo`|`String`|Relative path for the logo image (shown in the navbar) in the `/img` folder. For example, a value of `/logo.png` represents `/img/logo.png`. |
|`nav.links`|`Array` of `String`|Links to show in the navbar. It is recommended to have no more than 7 links here. If the screen width cannot display all links horizontally, the navbar will become a dropdown menu. Example: an `"About"` link in this section will link to `HOSTNAME/About`.|
|`footer.logo`|`String`|Relative path for the logo image (shown in the footer) in the `/img` folder. For example, a value of `/logo.png` represents `/img/logo.png`. |
|`footer.primaryLinks`|`Array` of `String`|Links to show in the left section of the footer. Example: an `"About"` link in this section will link to `HOSTNAME/About`.|
|`footer.secondaryLinks`|`Array` of `String`|Links to show in the middle section of the footer. Example: an `"About"` link in this section will link to `HOSTNAME/About`.|
|`footer.socialMedia`|`Object`|Links to social media sites, shown in the right section of the footer. If a value in the key-value pair is set to `""`, that link will be hiden.|
|`footer.copyright`|`String`|Copyright text to show in the bottom section of the footer.|
|`colors`|`Object`|Sets the color theme for the website. `primary` sets the background color of page contents. `secondary` sets navbar and footer backgrounds. `highlight` sets breadcrumb background, nav active link background, and link text color.|
|`font`|`Object`|Sets the font for the website. Fonts are fetched from [Google Fonts](https://fonts.google.com/). Use the corresponding font name from Google Fonts as values. `title` sets the font of headers. `text` sets the font of normal texts. `action` sets the font for links.|

Example:

```json
{
    "title":"City Logistics for the Urban Economy",
    "description":"",
    "version":"20210630",
    "nav":{
        "logo":"/clueFull.svg",
        "links":["Research Themes","Projects","People","Publications","About"]
    },
    "footer":{
        "logo":"/clueFull.svg",
        "primaryLinks":["Research Themes","Projects","People","Publications","About"],
        "secondaryLinks":["Papers","Events","Presentations","Contact us","Legal"],
        "socialMedia":{
            "Facebook":"https://www.facebook.com/",
            "LinkedIn":"https://www.linkedin.com/",
            "Twitter":"https://www.twitter.com/",
            "YouTube":"https://www.youtube.com/"
        },
        "copyright":"Copyright © 2021 City Logistics for the Urban Economy. All rights reserved."
    },
    "colors": {
        "primary": "#ffffff",
        "secondary": "#f2f2f2",
        "highlight":"#002a5c"
    },
    "font":{
        "title":"Montserrat",
        "text":"Noto Sans",
        "action":"Open Sans"
    }
}
```

### Page files

Page files stores content of web pages.

JSON structure:

```json
{
    "title":"",
    "content":[
        {"component":"","props":{...}},
        {"component":"","props":{...}},
        {"component":"","props":{...}},
        ...
    ]
}
```

| Value| Type |Role|
| ----------- | --------------| ---|
|`title`|`String`|If left empty, the HTML document title will be set as the `title` value in `meta.json`; else, this value will be appended to the HTML document title.|
|`content`|`Array` of `Object`|Defines page components from the top to the bottom, excluding navbar and footer.|
|`content.component`|`String`|Name of the component to use.|
|`content.props`|`Object`|Properties of the component. Varies by component. See [Components](#components) for more details.|

Example:

```json
{
    "title":"",
    "content":[
        {
            "component":"Heading",
            "props":{
                "heading":"Projects"
            }
        },
        {
            "component":"ItemSummary",
            "props":{
                "heading":"Urban Informatics for Transportation Operations, Planning and Decision Making",
                "sub":"Led by Prof. Baher Abdullai & Prof. Mark Fox",
                "text":"The Transportation Planning Suite of Ontologies (TPSO) provides a common set of terms for unambiguously storing and accessing data. ",
                "href":"/Research Themes/Urban Informatics",
                "img":"/bg2.png"
            }
        },
        {
            "component": "Stats",
            "props": {
                "stats": [
                    {"number": 10,"name": "Projects","href": "/Projects"},
                    {"number": 57,"name": "Publications","href": "/Projects"}
                ]
            }
        }
    ]
}
```

### URI conventions

Links in components use URIs to identify which page/file to link to. Images also use URIs to identify their sources.

#### `"href"` value conventions

Items with `"href"` values act like links.

- To link to web pages on the same site, use the relative pathname (relative to `/site`) of the page JSON file excluding the file extension.
- To link to external sites, use the full URL.
- To link to files, enclose the relative pathname (relative to `/file`) of the file in `FILE(pathname)`.

**DO NOT encode URI components for href values. Use the as-is pathname. The framework handles encoding automatically.**

Examples:

| URI| JSON file to render | Web page|
|---|---|---|
|`/About`|`/site/About.json`|`HOSTNAME/About`|
|`/Research Theme`|`/site/Research Theme.json`|`HOSTNAME/Research Theme`|
|`/a/b/c/d`|`/site/a/b/c/d.json`|`HOSTNAME/a/b/c/d`|
|`https://www.youtube.com/`||YouTube|
|`FILE(/dummy.json)`||Opens `/file/dummy.json`|
|`FILE(/project/report.pdf)`||Opens `/file/project/report.pdf`|

#### `"img"` value conventions

Relative path for the image in the `/img` folder.

Examples:

| URI| Image to load |
|---|---|
|`/bg.png`|`/img/bg.png`|
|`/people/leader.jpg`|`/img/people/leader.jpg`|

### Components

This section covers specifications of built-in components.

Refer to the `/site/Components.json` file and `HOSTNAME/Components` web page to see rendered examples of all components.

**Notes:**

- **Not all props are required by components, allowing flexibilities.**

- **All array length are flexible.**

#### `HomeBanner`

A banner that spans the entire width.

```json
{
    "component": "HomeBanner",
    "props": {
        "bg-img": "",
        "heading": "{heading}",
        "text": "{text}",
        "link": {
            "label": "{link.label}",
            "href": ""
        }
    }
}
```

#### `Stats`

Shows stats of multiple items.

```json
{
    "component": "Stats",
    "props": {
        "stats": [
            {
                "number": "{number}",
                "name": "{name}",
                "href": ""
            },
            {
                "number": "{number}",
                "name": "{name}",
                "href": ""
            },
            {
                "number": "{number}",
                "name": "{name}",
                "href": ""
            },
            {
                "number": "{number}",
                "name": "{name}",
                "href": ""
            }
        ]
    }
}
```

#### `Heading`

A simple stand-alone heading.

```json
{
    "component": "Heading",
    "props": {
        "heading": "{heading}"
    }
}
```

#### `ItemSummary`

Shows summary of an item. Includes a link.

```json
{
    "component": "ItemSummary",
    "props": {
        "heading": "{heading}",
        "sub": "{sub}",
        "text": "{text}",
        "href": "",
        "img": ""
    }
}
```

#### `ItemSummaryGroup`

Shows a group of `ItemSummary`. Margins between items are reduced.

```json
{
    "component": "ItemSummaryGroup",
    "props": {
        "items": [
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "text": "{text}",
                "href": "",
                "img": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "text": "{text}",
                "href": "",
                "img": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "text": "{text}",
                "href": "",
                "img": ""
            }
        ]
    }
}
```

#### `TextGroup`

Shows a group of paragraphs.

```json
{
    "component": "TextGroup",
    "props": {
        "heading": "{heading}",
        "sub": "{sub}",
        "intro": "{intro}",
        "texts": [
            "{texts[0]}",
            "{texts[1]}",
            "{texts[2]}",
            "{texts[3]}"
        ]
    }
}
```

#### `TextSection`

Shows a section of text with a link.

```json
{
    "component": "TextSection",
    "props": {
        "heading": "{heading}",
        "sub": "{sub}",
        "text": "{text}",
        "href": "href"
    }
}
```

#### `TextSectionPair`

Shows a pair of `TextSection` side-by-side.

```json
{
    "component": "TextSectionPair",
    "props": {
        "first": {
            "heading": "{first.heading}",
            "sub": "{first.sub}",
            "text": "{first.text}",
            "href": "href"
        },
        "second": {
            "heading": "{second.heading}",
            "sub": "{second.sub}",
            "text": "{second.text}",
            "href": "href"
        }
    }
}
```

#### `TextSectionImg`

Shows a section of text with an image (without a link).

(For components with text, image, and link, see [`ItemSummary`](#itemsummary))

```json
{
    "component": "TextSectionImg",
    "props": {
        "heading": "{heading}",
        "sub": "{sub}",
        "text": "{text}",
        "img": ""
    }
}
```

#### `TextSectionImgGroup`

Shows a group of `TextSectionImg`. Margins between items are reduced.

```json
{
    "component": "TextSectionImgGroup",
    "props": {
        "sections": [
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "text": "{text}",
                "img": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "text": "{text}",
                "img": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "text": "{text}",
                "img": ""
            }
        ]
    }
}
```

#### `ItemGroup`

Shows a group of items. Arranged in two columns.

```json
{
    "component": "ItemGroup",
    "props": {
        "heading": "{heading}",
        "sub": "{sub}",
        "items": [
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            }
        ]
    }
}
```

#### `ItemGroupSummary`

Shows a summary of `itemGroup`.

```json
{
    "component": "ItemGroupSummary",
    "props": {
        "heading": "{heading}",
        "sub": "{sub}",
        "text": "{text}",
        "href":"",
        "items": [
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            },
            {
                "heading": "{heading}",
                "sub": "{sub}",
                "img": "",
                "href": ""
            }
        ]
    }
}
```

#### `PeopleGroup`

For displaying information about people.

```json
{
            "component": "PeopleGroup",
            "props": {
                "heading": "{heading}",
                "sub": "{sub}",
                "people": [
                    {
                        "name": "{name}",
                        "title": "{title}",
                        "bio": "{bio}",
                        "img": ""
                    },
                    {
                        "name": "{name}",
                        "title": "{title}",
                        "bio": "{bio}",
                        "img": ""
                    },
                    {
                        "name": "{name}",
                        "title": "{title}",
                        "bio": "{bio}",
                        "img": ""
                    },
                    {
                        "name": "{name}",
                        "title": "{title}",
                        "bio": "{bio}",
                        "img": ""
                    }
                ]
            }
        }
```

#### `LinkGroup`

Shows a group of links.

```json
{
    "component": "LinkGroup",
    "props": {
        "heading": "{heading}",
        "sub": "{sub}",
        "intro": "{intro}",
        "links": [
            {
                "title": "{title}",
                "sub": "{sub}",
                "href": ""
            },
            {
                "title": "{title}",
                "sub": "{sub}",
                "href": ""
            },
            {
                "title": "{title}",
                "sub": "{sub}",
                "href": ""
            },
            {
                "title": "{title}",
                "sub": "{sub}",
                "href": ""
            },
            {
                "title": "{title}",
                "sub": "{sub}",
                "href": ""
            },
            {
                "title": "{title}",
                "sub": "{sub}",
                "href": ""
            },
            {
                "title": "{title}",
                "sub": "{sub}",
                "href": ""
            }
        ]
    }
}
```
