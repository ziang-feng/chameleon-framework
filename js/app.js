import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Nav, Footer, BreadCrumb } from "../components/basic.js";
import { Alert, HomeBanner, Stats, ItemGroupSummary, ItemSummaryGroup, Heading, ItemSummary, TextGroup, TextSection, TextSectionPair, TextSectionImg, TextSectionImgGroup, ItemGroup, PeopleGroup, LinkGroup, TextSectionTabs,TextImgCascade,ImgRow } from "../components/elements.js";
import { invertColor, hasSubnav, getSubnav, getTextWidth } from './function.js';

const componentRef = {
    Alert: Alert,
    HomeBanner: HomeBanner,
    Stats: Stats,
    ItemSummaryGroup: ItemSummaryGroup,
    Heading: Heading,
    ItemSummary: ItemSummary,
    TextGroup: TextGroup,
    TextSection: TextSection,
    TextSectionPair: TextSectionPair,
    TextSectionImg: TextSectionImg,
    TextSectionImgGroup: TextSectionImgGroup,
    ItemGroup: ItemGroup,
    ItemGroupSummary: ItemGroupSummary,
    PeopleGroup: PeopleGroup,
    LinkGroup: LinkGroup,
    TextSectionTabs: TextSectionTabs,
    TextImgCascade:TextImgCascade,
    ImgRow:ImgRow
}

class Chameleon extends React.Component {
    constructor(props) {
        // site metadata is passed in as the siteMeta prop
        super(props);
        this.state = {
            responsive: {
                width: 0,
                rem: 0
            },
            contentPath: [],
            pageJSON: ""
        };
        this.responsiveUpdate = this.responsiveUpdate.bind(this);
        this.navigateHandler = this.navigateHandler.bind(this);
        this.URLUpdateHandler = this.URLUpdateHandler.bind(this);
        this.fetchPage = this.fetchPage.bind(this);
        this.shouldBreadcrumbShow = this.shouldBreadcrumbShow.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.responsiveUpdate);
        window.addEventListener('locationchange', this.URLUpdateHandler);
        this.responsiveUpdate();
        this.URLUpdateHandler();
        this.fetchPage(this.state.contentPath.join("/"));
    }
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.contentPath) != JSON.stringify(this.state.contentPath)) {
            // navigtate to new page, fetch new page
            this.fetchPage(this.state.contentPath.join("/"));
            this.setState({ pageJSON: "" });
        }
    }
    shouldNavHide() {
        // 3rem + logo max width (15rem) + nav link text width + nav link margins
        let texts = "", subs = 0;
        for (let nav of this.props.siteMeta.nav.links) {
            texts += typeof (nav) == "object" ? nav.name : nav;
            if (typeof (nav) == "object") subs += 1;
        }
        let navWidth = getTextWidth(texts, `${this.state.responsive.rem}px "${this.props.siteMeta.font.action}", sans-serif`) / this.state.responsive.rem;
        navWidth += this.props.siteMeta.nav.links.length * 2 + 1.5 * subs;
        let totalWidth = 3 + 15 + navWidth;

        return totalWidth > this.state.responsive.width;
    }
    shouldSubnavHide() {
        // 2rem + nav link text width + nav link margins
        let subs = getSubnav(this.state.contentPath[0], this.props.siteMeta.nav.links);
        if (!subs) return null;
        let subnavWidth = getTextWidth(subs.join(""), `${this.state.responsive.rem}px "${this.props.siteMeta.font.action}", sans-serif`) / this.state.responsive.rem;
        subnavWidth += subs.length * 2;
        let totalWidth = 2 + subnavWidth;

        return totalWidth > this.state.responsive.width || totalWidth > 100;
    }
    shouldBreadcrumbShow() {
        // either on home page or on pages in navbar or nav has sub menu, hide breadcrumb
        let hideFlg = !this.state.contentPath.length || (this.state.contentPath.length == 1 && this.props.siteMeta.nav.links.includes(this.state.contentPath[0])) || (this.state.contentPath.length == 2 && hasSubnav(this.state.contentPath[0], this.props.siteMeta.nav.links) && getSubnav(this.state.contentPath[0], this.props.siteMeta.nav.links).includes(this.state.contentPath[1]));
        // if nav is hidden, show breadcrumb
        if (this.shouldNavHide() && this.state.contentPath.length) return true;
        return !hideFlg;
    }
    parseFilePath(path) {
        if (!path) return "index.json";
        return encodeURI(path) + ".json";
    }
    async fetchPage(orgPath) {
        let result, data;
        try {
            result = await fetch(`/site/${this.parseFilePath(orgPath)}?version=${this.props.siteMeta.version}`);
            data = await result.json();
            if (orgPath == this.state.contentPath.join("/")) this.setState({ pageJSON: data });
        }
        catch (err) {
            console.log(`Cannot load page at /site/${orgPath}`);
            console.error(err.message, err.name);
            data = {
                "content": [
                    {
                        "component": "Alert",
                        "props": {
                            "icon": "error",
                            "heading": "Cannot load page",
                            "text": "Either page does not exist or page format is invalid."
                        }
                    }
                ]
            };
            if (orgPath == this.state.contentPath.join("/")) this.setState({ pageJSON: data });
        }
    }
    responsiveUpdate() {
        let remSize = window.getComputedStyle(document.getElementById('fontRef')).fontSize;
        remSize = parseInt(remSize.slice(0, -2));
        let windowSizeRem = $(window).width() / remSize;
        this.setState({ responsive: { width: windowSizeRem, rem: remSize } });
    }
    navigateHandler(url) {
        // always use this function to handle navigating to another page
        if (url == "") return;
        if (url.substring(0, 4).toLowerCase() == 'http') {
            window.open(url);
            return;
        }
        if (url.substring(0, 4).toLowerCase() == 'file') {
            let regexp = /FILE\((.+)\)/;
            let realPath = url.match(regexp)[1];
            realPath = realPath[0] == "/" ? realPath : "/" + realPath;
            window.open("./file" + realPath);
            return;
        }
        if (url.split("/").length == 2) {
            // rewrite url for nav that has sub nav
            let urlList = url.split("/");
            if (this.props.siteMeta.nav.links.map((x) => { return x.name }).includes(urlList[1])) {
                let subs = getSubnav(urlList[1], this.props.siteMeta.nav.links);
                urlList.push(subs[0]);
            }
            url = urlList.join("/");
        }
        if (window.location.pathname == url) return;
        window.history.pushState(Date.now(), "", url);
    }
    URLUpdateHandler() {
        // update states and change rendered contents after URL changed 
        let pathname = window.location.pathname.substring(1);
        pathname = pathname[pathname.length - 1] == "/" ? pathname.slice(0, -1) : pathname;
        let contentPath = pathname.split("/");
        if (contentPath[0]) document.title = this.props.siteMeta.title + ' - ' + decodeURIComponent(contentPath[contentPath.length - 1]);
        else document.title = this.props.siteMeta.title;
        if (contentPath.length == 1 && hasSubnav(contentPath[0], this.props.siteMeta.nav.links)) {
            this.navigateHandler("/" + pathname);
            return;
        }
        // set new path and reset page json
        this.setState({ contentPath: pathname.split("/")[0] ? pathname.split("/").map(decodeURIComponent) : [] });
        window.scrollTo(0, 0);
    }
    parseHeader() {
        return (
            <header>
                <Nav siteMeta={this.props.siteMeta} responsive={this.state.responsive} contentPath={this.state.contentPath} navigateHandler={this.navigateHandler} shouldBreadcrumbShow={this.shouldBreadcrumbShow()} shouldNavHide={this.shouldNavHide()} shouldSubnavHide={this.shouldSubnavHide()} />
                <BreadCrumb siteMeta={this.props.siteMeta} responsive={this.state.responsive} contentPath={this.state.contentPath} navigateHandler={this.navigateHandler} shouldBreadcrumbShow={this.shouldBreadcrumbShow()} shouldNavHide={this.shouldNavHide()} shouldSubnavHide={this.shouldSubnavHide()} />
            </header>
        );
    }
    parsePageContent() {
        let result = [];
        if (this.state.pageJSON) {
            // load page from pageJSON
            if (this.state.pageJSON.title) document.title = this.props.siteMeta.title + " - " + this.state.pageJSON.title;
            try {
                let TempComponent, counter = 0;
                for (let element of this.state.pageJSON.content) {
                    if (!componentRef.hasOwnProperty(element.component)) throw "Unknown component " + element.component;
                    TempComponent = componentRef[element.component];

                    if (counter == 0 && !element.component.includes("Banner")) result.push(<div className="mb-3" key="top pusher" />); // margin between page top and first element

                    result.push(<TempComponent {...element.props} key={counter} siteMeta={this.props.siteMeta} responsive={this.state.responsive} navigateHandler={this.navigateHandler} />);
                    counter++;
                }
            } catch (err) {
                if (err.message) console.error(err.message, err.name);
                console.log(err);
                result = [<Alert icon="error" heading="Cannot parse page content" text="Check console for more details" key="alert" />];
            }
        }
        else {
            // show loading alert
            result = [<Alert icon="loading" heading="Loading ..." key="alert" />];
        }
        result.push(<div className="mb-auto" key="pusher" />);

        let topPadding = 4; // compute the top padding 
        if (!this.shouldBreadcrumbShow()) topPadding += 0.0625; // no breadcrumb
        else topPadding += 3;

        if (!this.shouldNavHide()) {
            let dir = this.state.contentPath[0];
            let subs = getSubnav(dir, this.props.siteMeta.nav.links);
            if (subs && !this.shouldSubnavHide() && this.state.contentPath.length == 2) {
                if (subs.includes(this.state.contentPath[1])) topPadding += 2.5; // subnav shown
            }
        }

        result.unshift(<div style={{ marginBottom: topPadding + "rem" }} key="fixed narbar padding" />); // padding for the fixed navbar and breadcrumb
        return (
            <ErrorBoundary key={this.state.contentPath.join("/")}>
                {result}
            </ErrorBoundary>
        );
    }
    parsePageFooter() {
        return (<Footer siteMeta={this.props.siteMeta} responsive={this.state.responsive} navigateHandler={this.navigateHandler} />);
    }

    render() {
        let header = this.parseHeader();
        let page = this.parsePageContent();
        let footer = this.parsePageFooter();

        return (
            <div className="app">
                {header}
                {page}
                {footer}
            </div>
        );
    }
}
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return [<Alert icon="error" heading="Cannot parse page content" text="Check console for more details" key="alert" />, <div className="mb-auto" key="pusher" />];
        }
        return this.props.children;
    }
}

function loadCSS(path, version) {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = `${path}?v=${version}`;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(cssLink);
}

function loadFonts(fonts) {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    let queryString = [];
    for (let font of Object.values(fonts)) {
        queryString.push(`family=${font.replaceAll(" ", "+")}:wght@400;700`);
    }
    style.href = `https://fonts.googleapis.com/css2?${queryString.join("&")}&display=swap`;
    document.getElementsByTagName('head')[0].appendChild(style);
}

function setTheme(colors, font) {
    // get colors and generate css
    let style = document.createElement('style');

    style.rel = 'stylesheet';
    style.innerHTML = `
    :root {
        --primary: ${colors.primary} !important;
        --secondary: ${colors.secondary} !important;
        --highlight: ${colors.highlight} !important;
        --primaryR: ${invertColor(colors.primary, true)} !important;
        --secondaryR: ${invertColor(colors.secondary, true)} !important;
        --highlightR: ${invertColor(colors.highlight, true)} !important;
        --titleFont:${font.title}, sans-serif;!important;
        --textFont:${font.text}, sans-serif;!important;
        --actionFont:${font.action}, sans-serif;!important;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
}

async function loadPage() {
    let result = await fetch(`/site/meta.json`, {
        method: 'GET',
        cache: 'no-store'
    });
    let data = await result.json();
    let version = data.version;


    // make sure new css is fetched for every new version
    loadCSS("/css/style.css", version);
    loadCSS("/css/elements.css", version);
    loadFonts(data.font);
    setTheme(data.colors, data.font);

    ReactDOM.render(<Chameleon siteMeta={data} />, document.getElementById('page'));
}
$(function () {
    loadPage();
    // for single page application navigation
    history.pushState = (f => function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.pushState);
    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'))
    });
});
