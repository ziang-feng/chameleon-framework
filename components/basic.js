import React from 'react';
import $ from 'jquery';
import { getTextWidth, hasSubnav, getSubnav } from '../js/function.js'

export class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navExpand: false,
            subnavExpand: true,
            subnavExpandGroups: []
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleSubnav = this.toggleSubnav.bind(this);
    }
    toggleNav() {
        if (!this.state.navExpand) {
            // if nav is to be shown, expand the nav group that is selected
            for (let nav of this.props.siteMeta.nav.links) {
                if (typeof (nav) == "object" && this.isSelected(nav)) {
                    this.setState({ subnavExpandGroups: [nav.name] });
                    break;
                }
            }
        }
        else this.setState({ subnavExpandGroups: [] });
        this.setState({ navExpand: !this.state.navExpand });
    }
    toggleSubnav(state = null) { this.setState({ subnavExpand: state ? state : !this.state.subnavExpand }) }
    toggleSubnavExpandGroup(group) {
        let org = this.state.subnavExpandGroups;
        if (org.indexOf(group) == -1) org.push(group);
        else org.splice(org.indexOf(group), 1);
        this.setState({ subnavExpandGroups: org });
    }
    isSelected(nav) {
        let selected = this.props.contentPath.length == 1 && this.props.contentPath[0] == nav;
        if (typeof (nav) == "object") {
            if (this.props.contentPath.length == 1) selected = this.props.contentPath[0] == nav.name;
            if (this.props.contentPath.length == 2) selected = this.props.contentPath[0] == nav.name && nav.subs.includes(this.props.contentPath[1]);
        }
        return selected;
    }

    parseNavList() {
        let result = [], subnav = null;

        // get nav hide flag
        let hideNav = this.props.shouldNavHide;

        // generate nav list
        if (!hideNav) {
            for (let nav of this.props.siteMeta.nav.links) {
                let selected = this.isSelected(nav);
                let hasSub = false;
                let navAction = () => {
                    this.props.navigateHandler(`/${encodeURIComponent(nav)}`);
                };

                if (typeof (nav) == "object") {
                    if (selected) {
                        subnav = nav.subs;
                        navAction = () => {
                            if (this.props.shouldSubnavHide) this.toggleSubnav();
                        };
                    }
                    else {
                        navAction = () => {
                            this.props.navigateHandler(`/${encodeURIComponent(nav)}`);
                            this.toggleSubnav(true);
                        };
                    }
                    nav = nav.name;
                    hasSub = true;
                }
                result.push(
                    <button className={`nav-links-btn ${selected ? 'highlight-bg' : ''}`} key={nav} onClick={navAction}>{nav}{hasSub ? <i className={`fas fa-chevron-${this.state.subnavExpand && selected ? "up" : "down"} nav-group-icon`}></i> : null}</button>
                )
            }
        }
        else {
            result = <button className="nav-links-btn" onClick={this.toggleNav}>Menu</button>
        }

        return [result, hideNav, subnav];
    }
    parseSubnav(subnav) {
        let result = [];
        for (let nav of subnav) {
            let selected = this.props.contentPath[1] == nav;
            result.push(
                <button className={`nav-sub-button ${selected ? 'highlight-bg' : ''}`} key={nav} onClick={() => { this.props.navigateHandler(`/${encodeURIComponent(this.props.contentPath[0])}/${encodeURIComponent(nav)}`) }}>{nav}</button>
            )
        }
        return result;
    }
    parseNavExpandList() {
        let result = [];

        for (let nav of this.props.siteMeta.nav.links) {
            let selected = this.isSelected(nav);
            let subs = [];
            let action = () => {
                this.props.navigateHandler(`/${encodeURIComponent(nav)}`);
                this.toggleNav();
            };

            if (typeof (nav) == "object") {
                subs = nav.subs;
                nav = nav.name;
                action = () => {
                    this.toggleSubnavExpandGroup(nav);
                };
            }

            result.push(<button className={`nav-expand-links-btn ${selected ? 'highlight-bg' : ''}`} key={nav} onClick={action}>{nav}{subs.length != 0 ? <i className={`fas fa-chevron-${this.state.subnavExpandGroups.indexOf(nav) != -1 ? "up" : "down"} nav-group-icon`}></i> : null}</button>);

            if (subs.length != 0) {
                let subButtons = [];

                let counter = 0;
                for (let sub of subs) {
                    subButtons.push(<button className={`nav-expand-links-sub-btn ${this.props.contentPath[1] == sub ? 'highlight-bg' : ''}`} key={counter} onClick={() => {
                        this.props.navigateHandler(`/${encodeURIComponent(nav)}/${encodeURIComponent(sub)}`);
                        this.toggleNav();
                    }}>{sub}</button>);
                    counter++;
                }
                let height = 3.5 * subs.length + 0.125;
                let style = this.state.subnavExpandGroups.includes(nav) ? { height: height + "rem", borderTop: "0.0625rem var(--secondary) solid", borderBottom: "0.0625rem var(--secondary) solid" } : { height: 0, borderTop: "0.0625rem var(--primary) solid", borderBottom: "0.0625rem var(--primary) solid" };
                result.push(
                    <div className="d-flex flex-column nav-expand-sub-container" key={nav + "exp"} style={style}>
                        {subButtons}
                    </div>
                );
            }
        }

        let subLength = this.state.subnavExpandGroups.length == 0 ? 0 : this.state.subnavExpandGroups.map((x) => { return getSubnav(x, this.props.siteMeta.nav.links).length }).reduce((a, b) => { return a + b });
        let subsBorder = this.props.siteMeta.nav.links.map((x) => { return (typeof (x) == "object" ? 1 : 0) }).reduce((a, b) => { return a + b }) * 0.125;
        return [result, 3.5 * (this.props.siteMeta.nav.links.length + subLength) + subsBorder];
    }
    parseSubnavExpandList(subnav) {
        let result = [];

        for (let nav of subnav) {
            let selected = this.props.contentPath[1] == nav;

            result.push(<button className={`nav-expand-links-btn ${selected ? 'highlight-bg' : ''}`} key={nav} onClick={() => {
                this.props.navigateHandler(`/${encodeURIComponent(this.props.contentPath[0])}/${encodeURIComponent(nav)}`);
                this.toggleSubnav();
            }}>{nav}</button>);
        }

        // (item height + 2rem margin )* number of nav buttons
        return [result, 3.5 * subnav.length];
    }
    render() {
        let [navbarList, hideNav, subnav] = this.parseNavList();
        let [navExpandList, navExpandHeight] = this.parseNavExpandList();
        let subnavSection = null, subnavExpandList, subnavExpandHeight;
        if (subnav) {
            if (this.props.shouldSubnavHide) {
                [subnavExpandList, subnavExpandHeight] = this.parseSubnavExpandList(subnav);
            }
            else subnavSection =
                <div className="nav-sub">
                    <div className="bounding-box padding-responsive">
                        {this.parseSubnav(subnav)}
                    </div>
                </div>;
        }

        return (
            <nav className="d-flex flex-column w-100">
                <div className="d-flex flex-row w-100 nav-container">
                    <button className="nav-logo" onClick={() => { this.props.navigateHandler("/") }}>
                        <img src={"/img" + this.props.siteMeta.nav.logo} alt="logo" />
                    </button>
                    <div className="nav-links h-100 d-flex">
                        {navbarList}
                    </div>
                </div>
                {subnavSection}
                {
                    <div className="nav-collapse" style={{ height: `${this.state.subnavExpand && this.props.shouldSubnavHide && !this.props.shouldNavHide ? subnavExpandHeight : 0}rem` }}>
                        {this.props.shouldSubnavHide ? subnavExpandList : null}
                    </div>
                }
                {
                    hideNav ?
                        <div className="nav-collapse" style={{ height: `${this.state.navExpand ? navExpandHeight : 0}rem` }}>
                            {navExpandList}
                        </div> : null
                }
            </nav>
        )
    }
}
export class BreadCrumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.parseBreadcrumb = this.parseBreadcrumb.bind(this);
        this.shrinkFlag = this.shrinkFlag.bind(this);
        this.getTrailURL = this.getTrailURL.bind(this);
    }
    shrinkFlag() {
        // 1rem left margin + trail link text width + trail link margins + chervon width
        let trailWidth = getTextWidth(this.props.contentPath.join('') + "Home", `${this.props.responsive.rem}px "${this.props.siteMeta.font.action}", sans-serif`) / this.props.responsive.rem;
        trailWidth += (this.props.contentPath.length + 1) * 2;
        let chervonWidth = this.props.contentPath.length * 0.5;

        let totalWidth = 1 + chervonWidth + trailWidth;
        return totalWidth > this.props.responsive.width;
    }
    getTrailURL(trail) {
        let idx = this.props.contentPath.indexOf(trail);
        if (idx == this.props.contentPath.length - 1) return null;
        let newPath = [...this.props.contentPath];
        newPath = newPath.slice(0, idx + 1);
        return "/" + newPath.map(encodeURIComponent).join("/");
    }
    parseBreadcrumb() {
        let result = [];

        if (this.shrinkFlag()) {
            // screen narrow, only show last level
            let contentPath = [...this.props.contentPath];
            contentPath.unshift("Home");
            let linkURL = '', last = contentPath.slice(-2)[0];
            if (last == "Home") linkURL = "/";
            else linkURL = this.getTrailURL(last);

            let action = () => {
                this.props.navigateHandler(linkURL);
            };

            return (
                <div className="breadcrumb-show-trail-btn d-flex flex-row">
                    <div className="my-auto breadcrumb-show-chevron-container mr-2"><i className="fas fa-caret-left fs-08 my-auto"></i></div>
                    <button className="" onClick={action}>{`Back to ${contentPath.slice(-2)[0]}`}</button>
                </div>
            );
        }
        else {
            result.push(<button className="breadcrumb-show-trail-btn" key="Home" onClick={() => { this.props.navigateHandler("/") }}>Home</button>); // add trail for home page

            for (let trail of this.props.contentPath) {
                let trailURL = this.getTrailURL(trail);
                result.push(<div className="my-auto breadcrumb-show-chevron-container" key={`${trail}_chevron`}><i className="fas fa-chevron-right fs-08 my-auto"></i></div>); // add divider
                result.push(<button className="breadcrumb-show-trail-btn" key={trail} onClick={() => { trailURL ? this.props.navigateHandler(trailURL) : null }}>{trail}</button>); // add trail
            }
            return result;
        }


    }
    render() {
        if (!this.props.shouldBreadcrumbShow) {

            return (
                <div className={!this.props.shouldSubnavHide && (this.props.contentPath.length == 2 && hasSubnav(this.props.contentPath[0], this.props.siteMeta.nav.links)) ? "" : "breadcrumb-hide"} />
            )
        }
        else {
            // show breadcrumb
            return (
                <div className="breadcrumb-show d-flex">
                    {this.parseBreadcrumb()}
                </div>
            )
        }


    }
}
export class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.parseSocialMedia = this.parseSocialMedia.bind(this);
    }
    parseLinkSection(links) {
        let result = [];
        for (let link of links) {
            result.push(<button className='footer-link' key={link} onClick={() => { this.props.navigateHandler(`/${encodeURIComponent(link)}`) }}>{link}</button>);
        }
        return result;
    }
    parseSocialMedia() {
        let result = [];
        const iconRef = {
            Twitter: <i className="fab fa-twitter my-auto mr-2"></i>,
            Facebook: <i className="fab fa-facebook my-auto mr-2"></i>,
            YouTube: <i className="fab fa-youtube my-auto mr-2"></i>,
            LinkedIn: <i className="fab fa-linkedin my-auto mr-2"></i>
        };
        for (let k in this.props.siteMeta.footer.socialMedia) {
            let link = this.props.siteMeta.footer.socialMedia[k];
            if (!link) continue;
            result.push(
                <button className='footer-link-social d-flex flex-row' key={k} onClick={() => { window.open(link) }}>
                    {iconRef[k]}
                    <div className="">{k}</div>
                </button>
            );
        }
        return result;
    }
    render() {
        return (
            <footer className="d-flex">
                <div className="footer-container flex-grow-1">
                    <div className="footer-row">
                        <img className="footer-logo mr-auto" src={"/img" + this.props.siteMeta.footer.logo} alt="logo" />
                    </div>
                    <div className="footer-row">
                        <div className="footer-row-section d-flex flex-column">
                            {this.parseLinkSection(this.props.siteMeta.footer.primaryLinks)}
                        </div>
                        <div className="footer-row-section d-flex flex-column">
                            {this.parseLinkSection(this.props.siteMeta.footer.secondaryLinks)}
                        </div>
                        <div className="footer-row-section d-flex flex-column">
                            {this.parseSocialMedia()}
                        </div>
                    </div>
                    <div className="footer-row footer-cr">
                        {this.props.siteMeta.footer.copyright}
                    </div>
                </div>
            </footer>
        );
    }
}
