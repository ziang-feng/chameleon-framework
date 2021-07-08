import React from 'react';
import $ from 'jquery';
import { getTextWidth } from '../js/function.js'

export class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navExpand: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }
    toggleNav() { this.setState({ navExpand: !this.state.navExpand }) }

    parseNavList() {
        let result = [];

        // get nav hide flag
        let hideNav = this.navHideFlag();

        // generate nav list
        if (!hideNav) {
            for (let nav of this.props.siteMeta.nav.links) {
                let selected = this.props.contentPath.length == 1 && this.props.contentPath[0] == nav;

                result.push(
                    <button className={`nav-links-btn ${selected ? 'highlight-bg' : ''}`} key={nav} onClick={() => { this.props.navigateHandler(`/${encodeURIComponent(nav)}`) }}>{nav}</button>
                )
            }
        }
        else {
            result = <button className="nav-links-btn" onClick={this.toggleNav}>Menu</button>
        }

        return [result, hideNav];
    }
    parseNavExpandList() {
        let result = [];

        for (let nav of this.props.siteMeta.nav.links) {
            let selected = this.props.contentPath.length == 1 && this.props.contentPath[0] == nav;

            result.push(<button className={`nav-expand-links-btn ${selected ? 'highlight-bg' : ''}`} key={nav} onClick={() => {
                this.props.navigateHandler(`/${encodeURIComponent(nav)}`);
                this.toggleNav();
            }}>{nav}</button>);
        }

        // (item height + 2rem margin )* number of nav buttons
        return [result, 3.5 * this.props.siteMeta.nav.links.length];
    }
    navHideFlag() {
        // 3rem + logo max width (15rem) + nav link text width + nav link margins
        let navWidth = getTextWidth(this.props.siteMeta.nav.links.join(''), `${this.props.responsive.rem}px "Open Sans", sans-serif`) / this.props.responsive.rem;
        navWidth += this.props.siteMeta.nav.links.length * 2;
        let totalWidth = 3 + 15 + navWidth;

        return totalWidth > this.props.responsive.width;
    }
    render() {
        let [navbarList, hideNav] = this.parseNavList();
        let [navExpandList, navExpandHeight] = this.parseNavExpandList();

        return (
            <nav className="d-flex flex-column w-100">
                <div className="d-flex flex-row w-100 nav-container">
                    <button className="nav-logo" onClick={() => { this.props.navigateHandler("/") }}>
                        <img src={"/img"+this.props.siteMeta.nav.logo} alt="logo" />
                    </button>
                    <div className="nav-links h-100 d-flex">
                        {navbarList}
                    </div>
                </div>
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
        let trailWidth = getTextWidth(this.props.contentPath.join('') + "Home", `${this.props.responsive.rem}px "Open Sans", sans-serif`) / this.props.responsive.rem;
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
            let linkURL = '';
            if (contentPath.slice(-2)[0] == "Home") linkURL = "/";
            else linkURL = `/${encodeURIComponent(contentPath.slice(-2)[0])}`;
            return (
                <div className="breadcrumb-show-trail-btn d-flex flex-row">
                    <div className="my-auto breadcrumb-show-chevron-container mr-2"><i className="fas fa-caret-left fs-08 my-auto"></i></div>
                    <button className="" onClick={() => { this.props.navigateHandler(linkURL) }}>{`Back to ${contentPath.slice(-2)[0]}`}</button>
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
        if (!this.props.contentPath.length || (this.props.contentPath.length == 1 && this.props.siteMeta.nav.links.includes(this.props.contentPath[0]))) {
            // either on home page or on pages in navbar, hide breadcrumb
            return (
                <div className="breadcrumb-hide" />
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
                        <img className="footer-logo mr-auto" src={"/img"+this.props.siteMeta.footer.logo} alt="logo" />
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
