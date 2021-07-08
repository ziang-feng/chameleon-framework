import React from 'react';
import { encodeDirtyURL } from '../js/function';
export class Alert extends React.Component {
    render() {
        let icon;
        switch (this.props.icon) {
            case "error":
                icon = <i className="fas fa-exclamation-triangle mb-3"></i>;
                break;
            case "loading":
                icon = <i className="fas fa-circle-notch spin mb-3"></i>;
                break;
            default:
                break;
        }
        return (
            <div className="mt-auto mx-auto d-flex flex-column alert-container">
                {icon}
                <h3>{this.props.heading}</h3>
                <p>{this.props.text}</p>
            </div>
        )
    }
}
export class HomeBanner extends React.Component {
    render() {
        let bg = {}, textBg;
        if (this.props["bg-img"]) bg = { backgroundImage: `url(/img${this.props["bg-img"]})` };
        textBg = { backgroundColor: this.props.siteMeta.colors.primary + "cc" }
        return (
            <div className="homebanner-container mb-component" style={bg}>
                <div className="bounding-box">
                    <div className="homebanner-texts d-flex flex-column" style={textBg}>
                        <h1 className="mb-3">{this.props.heading}</h1>
                        <p className="mb-5">{this.props.text}</p>
                        <button className="homebanner-btn" onClick={() => { this.props.navigateHandler(encodeDirtyURL(this.props.link.href)) }}>
                            {this.props.link.label}
                            <i className="fas fa-chevron-right fs-08 ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export class Stats extends React.Component {
    render() {
        let result = [];
        for (let stat of this.props.stats) {
            result.push(
                <div className="stat-item d-flex flex-column" key={stat.name + stat.number}>
                    <h2 className="">{stat.number}</h2>
                    <h4 className="">{stat.name}</h4>
                    <button className="" onClick={() => { this.props.navigateHandler(encodeDirtyURL(stat.href)) }}>{`See all ${stat.name}`}<i className="fas fa-chevron-right fs-08 ml-2"></i></button>
                </div>
            );
        }
        return (
            <div className="bounding-box mb-component">
                <div className="stat-container margin-responsive">
                    {result}
                </div>

            </div>
        )
    }
}
export class ItemSummary extends React.Component {
    render() {
        let backgroundImage = this.props.img ? `url(/img${this.props.img})` : "";
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive summary-container">
                    <div className="summary-text">
                        {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                        {this.props.sub ? <h5 className="mb-3">{this.props.sub}</h5> : null}
                        {this.props.text ? <p className="mb-3">{this.props.text}</p> : null}
                        <button className="" onClick={() => { this.props.navigateHandler(encodeDirtyURL(this.props.href)) }}>Learn more <i className="fas fa-chevron-right fs-08 ml-2"></i></button>
                    </div>
                    <div className="summary-items">
                        <div className="summary-img-span" style={{ backgroundImage: backgroundImage }}></div>
                    </div>
                </div>
            </div>
        )
    }
}
export class ItemSummaryGroup extends React.Component {
    render() {
        let items = [], counter = 0;
        for (let item of this.props.items) {
            let backgroundImage = item.img ? `url(/img${item.img})` : "";
            items.push(
                <div className="margin-responsive summary-container" key={counter} style={counter != 0 ? { borderTop: "none" } : {}}>
                    <div className="summary-text">
                        {item.heading ? <h3 className="mb-3">{item.heading}</h3> : null}
                        {item.sub ? <h5 className="mb-3">{item.sub}</h5> : null}
                        {item.text ? <p className="mb-3">{item.text}</p> : null}
                        <button className="" onClick={() => { item.navigateHandler(encodeDirtyURL(item.href)) }}>Learn more <i className="fas fa-chevron-right fs-08 ml-2"></i></button>
                    </div>
                    <div className="summary-items">
                        <div className="summary-img-span" style={{ backgroundImage: backgroundImage }}></div>
                    </div>
                </div>
            );
            counter++;
        }

        return (
            <div className="bounding-box mb-component">
                {items}
            </div>
        )
    }
}
export class TextGroup extends React.Component {
    render() {
        let texts = [], counter = 0;
        for (let text of this.props.texts) {
            texts.push(<p key={counter}>{text}</p>);
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive textGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4">{this.props.sub}</h5> : null}
                    {this.props.intro ? <p className="mb-3">{this.props.intro}</p> : null}
                    <div className="textGroup-group">
                        {texts}
                    </div>
                </div>
            </div>
        )
    }
}
export class TextSection extends React.Component {
    render() {
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive textSection-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4">{this.props.sub}</h5> : null}
                    {this.props.text ? <p className="mb-3">{this.props.text}</p> : null}
                    {this.props.href ? <button className="" onClick={() => { this.props.navigateHandler(encodeDirtyURL(this.props.href)) }}>Learn more <i className="fas fa-chevron-right fs-08 ml-2"></i></button> : null}
                </div>
            </div>
        )
    }
}
export class TextSectionPair extends React.Component {
    render() {
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive textSection-container padding-responsive textSectionPair-container">
                    <div className="mr-3 d-flex flex-column">
                        {this.props.first.heading ? <h3 className="mb-3">{this.props.first.heading}</h3> : null}
                        {this.props.first.sub ? <h5 className="mb-4">{this.props.first.sub}</h5> : null}
                        {this.props.first.text ? <p className="mb-3">{this.props.first.text}</p> : null}
                        {this.props.first.href ? <button className="mt-auto" onClick={() => { this.props.navigateHandler(encodeDirtyURL(this.props.first.href)) }}>Learn more <i className="fas fa-chevron-right fs-08 ml-2"></i></button> : null}
                    </div>
                    <div className="mb-0 d-flex flex-column">
                        {this.props.second.heading ? <h3 className="mb-3">{this.props.second.heading}</h3> : null}
                        {this.props.second.sub ? <h5 className="mb-4">{this.props.second.sub}</h5> : null}
                        {this.props.second.text ? <p className="mb-3">{this.props.second.text}</p> : null}
                        {this.props.second.href ? <button className="mt-auto" onClick={() => { this.props.navigateHandler(encodeDirtyURL(this.props.second.href)) }}>Learn more <i className="fas fa-chevron-right fs-08 ml-2"></i></button> : null}
                    </div>
                </div>
            </div>
        )
    }
}
export class TextSectionImg extends React.Component {
    render() {
        let backgroundImage = this.props.img ? `url(/img${this.props.img})` : "";
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive textSectionImg-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4">{this.props.sub}</h5> : null}
                    <div className="textSectionImg-section">
                        {this.props.text ? <p className="">{this.props.text}</p> : null}
                        <div className="textSectionImg-img-span" style={{ backgroundImage: backgroundImage }}></div>
                    </div>
                </div>
            </div>
        )
    }
}
export class TextSectionImgGroup extends React.Component {
    render() {
        let sections = [], counter = 0;
        for (let section of this.props.sections) {
            let backgroundImage = section.img ? `url(/img${section.img})` : "";
            sections.push(
                <div className="margin-responsive textSectionImg-container padding-responsive" key={counter} style={counter != 0 ? { borderTop: "none" } : {}}>
                    {section.heading ? <h3 className="mb-3">{section.heading}</h3> : null}
                    {section.sub ? <h5 className="mb-4">{section.sub}</h5> : null}
                    <div className="textSectionImg-section">
                        {section.text ? <p className="">{section.text}</p> : null}
                        <div className="textSectionImg-img-span" style={{ backgroundImage: backgroundImage }}></div>
                    </div>
                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                {sections}
            </div>
        )
    }
}
export class ItemGroup extends React.Component {
    render() {
        let items = [], counter = 0;
        for (let item of this.props.items) {
            let backgroundImage = item.img ? `url(/img${item.img})` : "";
            items.push(
                <div className="itemGroup-item d-flex flex-row" key={counter}>
                    <div className="summary-item-img" style={{ backgroundColor: "black", backgroundImage: backgroundImage }}></div>
                    <div className="py-2 d-flex flex-column">
                        <h6 className="mb-2">{item.heading}</h6>
                        {item.sub ? <p className="mb-3 op-05 fs-09">{item.sub}</p> : null}
                        <button className="mt-auto summary-item-button" onClick={() => { this.props.navigateHandler(encodeDirtyURL(item.href)) }}>View Details <i className="fas fa-chevron-right fs-08 ml-2"></i></button>
                    </div>

                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive itemGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4 op-05">{this.props.sub}</h5> : null}
                    <div className="itemGroup-items">
                        {items}
                    </div>
                </div>
            </div>
        )
    }
}
export class ItemGroupSummary extends React.Component {
    render() {
        let items = [], counter = 0;
        for (let item of this.props.items) {
            let backgroundImage = item.img ? `url(/img${item.img})` : "";
            items.push(
                <div className="summary-item d-flex flex-row" key={counter}>
                    <div className="summary-item-img" style={{ backgroundColor: "black", backgroundImage: backgroundImage }}></div>
                    <div className="py-2 d-flex flex-column">
                        <h6 className="mb-2">{item.heading}</h6>
                        {item.sub ? <p className="mb-3 op-05 fs-09">{item.sub}</p> : null}
                        <button className="mt-auto summary-item-button" onClick={() => { this.props.navigateHandler(encodeDirtyURL(item.href)) }}>View Details <i className="fas fa-chevron-right fs-08 ml-2"></i></button>
                    </div>

                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive summary-container">
                    <div className="summary-text">
                        {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                        {this.props.sub ? <h5 className="mb-3">{this.props.sub}</h5> : null}
                        {this.props.text ? <p className="mb-3">{this.props.text}</p> : null}
                        <button className="" onClick={() => { this.props.navigateHandler(encodeDirtyURL(this.props.href)) }}>Learn more <i className="fas fa-chevron-right fs-08 ml-2"></i></button>
                    </div>
                    <div className="summary-items">
                        {items}
                    </div>
                </div>
            </div>
        )
    }
}
export class PeopleGroup extends React.Component {
    render() {
        let people = [], counter = 0;
        for (let person of this.props.people) {
            let backgroundImage = person.img ? `url(/img${person.img})` : "";
            people.push(
                <div className="peopleGroup-person d-flex flex-column" key={counter}>
                    <div className="d-flex flex-row mb-3">
                        <div className="peopleGroup-img" style={{ backgroundColor: "black", backgroundImage: backgroundImage }}></div>
                        <div className="py-2 my-auto d-flex flex-column">
                            <h4 className="mb-2">{person.name}</h4>
                            {person.title ? <h6 className="mb-3 op-05 ">{person.title}</h6> : null}
                        </div>
                    </div>
                    <p className="mb-0">{person.bio}</p>
                </div>
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive peopleGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                    {this.props.sub ? <h5 className="mb-3 op-05">{this.props.sub}</h5> : null}
                    <div className="peopleGroup-people">
                        {people}
                    </div>
                </div>
            </div>
        )
    }
}
export class LinkGroup extends React.Component {
    render() {
        let links = [], counter = 0;
        for (let link of this.props.links) {
            links.push(
                <div className="linkGroup-item" key={counter}>
                    <h5 className="">{link.title}</h5>
                    <p className="op-05">{link.sub}</p>
                    <button className="mt-auto" onClick={() => { this.props.navigateHandler(encodeDirtyURL(link.href)) }}>Learn more <i className="fas fa-chevron-right fs-08 ml-2"></i></button> 
                </div>
                
            );
            counter++;
        }
        return (
            <div className="bounding-box mb-component">
                <div className="margin-responsive textGroup-container padding-responsive">
                    {this.props.heading ? <h3 className="mb-3">{this.props.heading}</h3> : null}
                    {this.props.sub ? <h5 className="mb-4">{this.props.sub}</h5> : null}
                    {this.props.intro ? <p className="mb-3">{this.props.intro}</p> : null}
                    <div className="linkGroup-group">
                        {links}
                    </div>
                </div>
            </div>
        )
    }
}
export class Heading extends React.Component {
    render() {
        return (
            <div className="bounding-box">
                <h2 className="margin-responsive padding-responsive mb-0 py-3">{this.props.heading}</h2>
            </div>
        )
    }
}
export class Dummy extends React.Component {
    render() {
        return (
            <div className="bounding-box mb-component">
            </div>
        )
    }
}