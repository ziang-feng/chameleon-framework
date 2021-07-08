
# Chameleon Framework Documentation

## Introduction

Chameleon Framework is a JSON based web-builder framework for building simple informative websites. Instead of writing HTML files, webmasters only need to specify the content and layout for the web page in the respective JSON files. Navigations are automatically handled by the framework.

## Webmaster Manual

### Quick start guide

Copy the following to `/site/meta.json`.

TODO

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